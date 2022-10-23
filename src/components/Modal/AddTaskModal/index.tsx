import { Dispatch, SetStateAction, useState } from 'react'
import { useMount } from 'react-use'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { isOpenAddTaskModalAtom, taskAtom, tasksAtom } from 'store/atoms'
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
}

const AddTaskModal = ({ boardProcessName, todo }: IDashBoardModalProps) => {
  const [taskTitle, setTaskTitle] = useState('')
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [date, setDate] = useState<(Date | null)[]>([])
  const [image, setImage] = useState<string | ArrayBuffer | null | undefined>()
  const [description, setDescription] = useState<string>('')
  const [noTitle, setNoTitle] = useState(false)
  const [noCategory, setNoCategory] = useState(false)
  const [boardsTasks, setBoardsTasks] = useRecoilState(tasksAtom)
  const [task, setTask] = useRecoilState(taskAtom)
  const [isOpenAddTaskModal, setIsOpenAddTaskModal] = useRecoilState(isOpenAddTaskModalAtom)

  /*  useMount(() => {
    if (!todo) return
    if (todo) {
      setTaskTitle(todo.taskTitle)
      setCategoryList(todo.categoryList)
      setDate([new Date(), null])
      setImage(todo?.image.url)
      setDescription(todo?.description)
    }
  })
*/
  const handleCloseModal = () => {
    setIsOpenAddTaskModal((prevState) => ({ ...prevState, isOpen: false }))
  }

  /* const handleCreateTaskClick = () => {
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
          image: { url: image, name: '' },
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
                image: { url: image, name: '' },
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
  } */
  const handleSubmitTaskClick = () => {
    if (!task.taskTitle || !task.categoryList.length) {
      if (!task.taskTitle) setNoTitle(true)
      if (!task.categoryList.length) setNoCategory(true)
    } else {
      if (isOpenAddTaskModal.type === 'add') {
        setBoardsTasks((prevTasks) => ({
          ...prevTasks,
          [boardProcessName]: [...prevTasks[boardProcessName], { ...task, id: new Date(), process: boardProcessName }],
        }))
      }
      if (isOpenAddTaskModal.type === 'edit') {
        setBoardsTasks((prevTasks) => {
          const tempPrevTasks = [...prevTasks[boardProcessName]]
          const taskIdList = tempPrevTasks.map((prevTask) => prevTask.id)
          tempPrevTasks.splice(taskIdList.indexOf(task.id), 1, task)
          return {
            ...prevTasks,
            [boardProcessName]: tempPrevTasks,
          }
        })
      }
      setTask({
        id: new Date(),
        process: '',
        taskTitle: '',
        categoryList: [],
        date: [],
        image: { name: '', url: '' },
        description: '',
      })
      setIsOpenAddTaskModal((prevState) => ({ ...prevState, isOpen: false }))
    }
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox}>
        <div className={styles.modalHead}>
          <p>{isOpenAddTaskModal.type === 'add' ? 'Create a new task' : 'Edit the Task'}</p>
          <XIcon className={styles.closeButton} onClick={handleCloseModal} />
        </div>
        <Title noTitle={noTitle} />
        <Category noCategory={noCategory} />
        <div className={styles.detail}>
          <p>Task Detail</p>
          <Description />
          <Schedule setDate={setDate} />
          <Picture />
        </div>
        <button className={styles.submitButton} type='button' onClick={handleSubmitTaskClick}>
          {isOpenAddTaskModal.type === 'add' ? 'Create Task' : 'Edit Task'}
        </button>
      </div>
    </>
  )
}

export default AddTaskModal

// todo -> task 로 변경
