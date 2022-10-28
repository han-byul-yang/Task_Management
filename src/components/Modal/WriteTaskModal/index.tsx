import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import { isOpenModalAtom, selectedBoardProcessNameAtom, taskAtom, tasksAtom } from 'store/atoms'
import Title from './Title'
import Category from './Category'
import Description from './Description'
import Picture from './Picture'
import Schedule from './Schedule'

import { XIcon } from 'assets/svgs'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './writeTaskModal.module.scss'

const WriteTaskModal = () => {
  const [noTitle, setNoTitle] = useState(false)
  const [noCategory, setNoCategory] = useState(false)
  const setBoardsTasks = useSetRecoilState(tasksAtom)
  const [task, setTask] = useRecoilState(taskAtom)
  const selectedBoardProcessName = useRecoilValue(selectedBoardProcessNameAtom)
  const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom)
  const containerRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsOpenModal((isOpenState) => ({
      ...isOpenState,
      writeTaskModal: { type: isOpenState.writeTaskModal.type, isOpen: false },
    }))
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

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
    setIsOpenModal((isOpenState) => ({
      ...isOpenState,
      writeTaskModal: { type: isOpenState.writeTaskModal.type, isOpen: false },
    }))
    resetTask()
  }

  const handleSubmitTaskClick = () => {
    if (!task.taskTitle || !task.categoryList.length) {
      if (!task.taskTitle) setNoTitle(true)
      if (!task.categoryList.length) setNoCategory(true)
    } else {
      if (isOpenModal.writeTaskModal.type === 'add') {
        addTaskToBoard()
      }
      if (isOpenModal.writeTaskModal.type === 'edit') {
        editTaskToBoard()
      }
      resetTask()
      setIsOpenModal((isOpenState) => ({
        ...isOpenState,
        writeTaskModal: { type: isOpenState.writeTaskModal.type, isOpen: false },
      }))
    }
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox} ref={containerRef}>
        <div className={styles.modalHead}>
          <p>{isOpenModal.writeTaskModal.type === 'add' ? 'Create a new task' : 'Edit the Task'}</p>
          <XIcon className={styles.xIcon} onClick={handleCloseModalClick} />
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
          {isOpenModal.writeTaskModal.type === 'add' ? 'Create Task' : 'Edit Task'}
        </button>
      </div>
    </>
  )
}

export default WriteTaskModal
