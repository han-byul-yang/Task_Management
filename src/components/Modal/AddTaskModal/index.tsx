import { Dispatch, SetStateAction, useState } from 'react'
import { useMount } from 'react-use'
import { useRecoilState } from 'recoil'

import { tasksAtom } from 'store/atoms'
import { ITask } from 'types/taskType'
import Title from '../components/Title'
import Category from '../components/Category'
import Description from '../components/Description'
import Picture from '../components/Picture'
import Schedule from '../components/Schedule'

import { XIcon } from 'assets/svgs'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './addTaskModal.module.scss'

interface IDashBoardModalProps {
  boardProcessName: string
  todo?: ITask
  setIsAddTaskModalOpen: Dispatch<SetStateAction<boolean>>
}

const AddTaskModal = ({ boardProcessName, todo, setIsAddTaskModalOpen }: IDashBoardModalProps) => {
  const [task, setTask] = useState('')
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [date, setDate] = useState<(Date | null)[]>([])
  const [image, setImage] = useState<Blob>()
  const [description, setDescription] = useState<string>('')
  const [boardsTasks, setboardsTasks] = useRecoilState(tasksAtom)
  const [noTask, setNoTask] = useState(false)
  const [noCategory, setNoCategory] = useState(false)

  useMount(() => {
    if (!todo) return
    if (todo) {
      setTask(todo.taskTitle)
      setCategoryList(todo.categoryList)
      setDate([new Date(), null])
      setImage(todo?.image)
      setDescription(todo?.description)
    }
  })

  const handleCloseModal = () => {
    setIsAddTaskModalOpen(false)
  }

  const handleCreateTaskClick = () => {
    if (task !== '' && categoryList.length !== 0) {
      if (todo) {
        const todoIdArray = boardsTasks[todo.process].map((todos) => todos.id)
        const todoIdIndex = todoIdArray.indexOf(todo.id)
        const copyArray = [...boardsTasks[todo.process]]
        copyArray.splice(todoIdIndex, 1, {
          id: todo.id,
          process: todo.process,
          taskTitle: task,
          categoryList,
          date,
          image,
          description,
        })
        setboardsTasks((oldTodos) => {
          return {
            ...oldTodos,
            [todo.process]: [...copyArray],
          }
        })
      } else {
        setboardsTasks((oldTodos) => {
          return {
            ...oldTodos,
            [boardProcessName]: [
              ...oldTodos[boardProcessName],
              {
                id: new Date(),
                process: boardProcessName,
                taskTitle: task,
                categoryList,
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
      <div className={styles.modalBox}>
        <div className={styles.modalHead}>
          <div>Create a new task</div>
          <XIcon className={styles.closeButton} onClick={handleCloseModal} />
        </div>
        <Title noTask={noTask} />
        <Category noCategory={noCategory} />
        <div className={styles.detail}>
          <div>Task Detail</div>
          <Description />
          <Schedule setDate={setDate} />
          <Picture setImage={setImage} />
        </div>
        <button className={styles.createButton} type='button' onClick={handleCreateTaskClick}>
          Create Task
        </button>
      </div>
    </>
  )
}

export default AddTaskModal

// todo -> task 로 변경
