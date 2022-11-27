import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import { addTaskToBoard, editTaskToBoard } from 'utils/writeTaskToBoard'
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
  const task = useRecoilValue(taskAtom)
  const resetTask = useResetRecoilState(taskAtom)
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
        setBoardsTasks(addTaskToBoard(task, selectedBoardProcessName))
      }
      if (isOpenModal.writeTaskModal.type === 'edit') {
        setBoardsTasks(editTaskToBoard(task, selectedBoardProcessName))
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
