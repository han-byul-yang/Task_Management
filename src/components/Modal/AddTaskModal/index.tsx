import { useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { isOpenAddTaskModalAtom, selectedBoardProcessNameAtom, taskAtom, tasksAtom } from 'store/atoms'
import Title from '../components/Title'
import Category from '../components/Category'
import Description from '../components/Description'
import Picture from '../components/Picture'
import Schedule from '../components/Schedule'

import { XIcon } from 'assets/svgs'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './addTaskModal.module.scss'

const AddTaskModal = () => {
  const [noTitle, setNoTitle] = useState(false)
  const [noCategory, setNoCategory] = useState(false)
  const setBoardsTasks = useSetRecoilState(tasksAtom)
  const [task, setTask] = useRecoilState(taskAtom)
  const selectedBoardProcessName = useRecoilValue(selectedBoardProcessNameAtom)
  const [isOpenAddTaskModal, setIsOpenAddTaskModal] = useRecoilState(isOpenAddTaskModalAtom)

  const resetTask = () => {
    setTask({
      id: new Date(),
      process: '',
      taskTitle: '',
      categoryList: [],
      date: { startDate: new Date(), endDate: null },
      image: { name: '', url: '' },
      description: '',
    })
  }

  const addTaskToBoard = () => {
    setBoardsTasks((prevTasks) => ({
      ...prevTasks,
      [selectedBoardProcessName]: [
        ...prevTasks[selectedBoardProcessName],
        { ...task, id: new Date(), process: selectedBoardProcessName },
      ],
    }))
  }

  const editTaskToBoard = () => {
    setBoardsTasks((prevTasks) => {
      const tempPrevTasks = [...prevTasks[selectedBoardProcessName]]
      const taskIdList = tempPrevTasks.map((prevTask) => prevTask.id)
      tempPrevTasks.splice(taskIdList.indexOf(task.id), 1, task)
      return {
        ...prevTasks,
        [selectedBoardProcessName]: tempPrevTasks,
      }
    })
  }

  const handleCloseModalClick = () => {
    setIsOpenAddTaskModal((prevState) => ({ ...prevState, isOpen: false }))
    resetTask()
  }

  const handleSubmitTaskClick = () => {
    if (!task.taskTitle || !task.categoryList.length) {
      if (!task.taskTitle) setNoTitle(true)
      if (!task.categoryList.length) setNoCategory(true)
    } else {
      if (isOpenAddTaskModal.type === 'add') {
        addTaskToBoard()
      }
      if (isOpenAddTaskModal.type === 'edit') {
        editTaskToBoard()
      }
      resetTask()
      setIsOpenAddTaskModal((prevState) => ({ ...prevState, isOpen: false }))
    }
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox}>
        <div className={styles.modalHead}>
          <p>{isOpenAddTaskModal.type === 'add' ? 'Create a new task' : 'Edit the Task'}</p>
          <XIcon className={styles.closeButton} onClick={handleCloseModalClick} />
        </div>
        <Title noTitle={noTitle} />
        <Category noCategory={noCategory} />
        <div className={styles.detail}>
          <p>Task Detail</p>
          <Description />
          <Schedule />
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
