import { Dispatch, SetStateAction, useState } from 'react'
import Description from '../components/Description'
import Title from '../components/Title'

import { XIcon } from 'assets/svgs'
import styles from './taskManageModal.module.scss'

interface ITaskManageModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

const TaskManageModal = ({ setModalOpen }: ITaskManageModalProps) => {
  const [task, setTask] = useState('')
  const [noTask, setNoTask] = useState(false)
  const [description, setDescription] = useState('')

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleCreateTaskClick = () => {
    console.log('')
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalContainer}>
        <div className={styles.modalHead}>
          <div>Create today&apos;s task</div>
          <XIcon className={styles.xBtn} onClick={handleCloseModal} />
        </div>
        <Title noTitle={noTask} />
        <Description />
        <button className={styles.createBtn} type='button' onClick={handleCreateTaskClick}>
          Create Today&apos;s Task
        </button>
      </div>
    </>
  )
}

export default TaskManageModal
