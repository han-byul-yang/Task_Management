import { Dispatch, SetStateAction, useState } from 'react'
import { useMount } from 'react-use'
import { useRecoilState } from 'recoil'

import { Todo, todosAtom } from 'store/atoms'
import Title from '../components/Title'
import Category from '../components/Category'
import Description from '../components/Description'
import Picture from '../components/Picture'
import Schedule from '../components/Schedule'

import { XIcon } from 'assets/svgs'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './dashBoardModal.module.scss'

interface IDashBoardModalProps {
  processName: string
  todo?: Todo
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

const DashBoardModal = ({ processName, todo, setModalOpen }: IDashBoardModalProps) => {
  const [task, setTask] = useState('')
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [date, setDate] = useState<(Date | null)[]>([])
  const [image, setImage] = useState<Blob>()
  const [description, setDescription] = useState<string>('')
  const [todoList, setTodoList] = useRecoilState(todosAtom)
  const [noTask, setNoTask] = useState(false)
  const [noCategory, setNoCategory] = useState(false)

  useMount(() => {
    if (!todo) return
    if (todo) {
      setTask(todo.task)
      setCategoryList(todo.category)
      setDate([new Date(), null])
      setImage(todo?.image)
      setDescription(todo?.description)
    }
  })

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleCreateTaskClick = () => {
    if (task !== '' && categoryList.length !== 0) {
      if (todo) {
        const todoIdArray = todoList[todo.process].map((todos) => todos.id)
        const todoIdIndex = todoIdArray.indexOf(todo.id)
        const copyArray = [...todoList[todo.process]]
        copyArray.splice(todoIdIndex, 1, {
          id: todo.id,
          process: todo.process,
          task,
          category: categoryList,
          date,
          image,
          description,
        })
        setTodoList((oldTodos) => {
          return {
            ...oldTodos,
            [todo.process]: [...copyArray],
          }
        })
      } else {
        setTodoList((oldTodos) => {
          return {
            ...oldTodos,
            [processName]: [
              ...oldTodos[processName],
              {
                id: new Date(),
                process: processName,
                task,
                category: categoryList,
                date,
                image,
                description,
              },
            ],
          }
        })
      }

      handleCloseModal()
    }

    if (task === '') {
      setNoTask(true)
    } else {
      setNoTask(false)
    }
    if (categoryList.length === 0) {
      setNoCategory(true)
    } else {
      setNoCategory(false)
    }
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalContainer}>
        <div className={styles.modalHead}>
          <div>Create a new task</div>
          <XIcon className={styles.xBtn} onClick={handleCloseModal} />
        </div>
        <Title noTask={noTask} task={task} setTask={setTask} />
        <Category noCategory={noCategory} categoryList={categoryList} setCategoryList={setCategoryList} />
        <Description description={description} setDescription={setDescription} />
        <Schedule setDate={setDate} />
        <Picture setImage={setImage} />
        <button className={styles.createBtn} type='button' onClick={handleCreateTaskClick}>
          Create Task
        </button>
      </div>
    </>
  )
}

export default DashBoardModal
