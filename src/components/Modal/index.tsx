import { ChangeEvent, useState } from 'react'

import { XIcon } from 'assets/svgs'
import styles from './modal.module.scss'

const Modal = () => {
  const [task, setTask] = useState('')

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.currentTarget.value)
  }

  return (
    <div className={styles.modalBox}>
      <div className={styles.modalHead}>
        <div>Create a new task</div>
        <XIcon />
      </div>
      <div className={styles.title}>
        <div>title</div>
        <input type='text' placeholder='할 일을 입력해주세요' value={task} onChange={handleTaskChange} />
      </div>
    </div>
  )
}

export default Modal
