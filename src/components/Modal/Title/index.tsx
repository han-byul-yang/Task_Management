import { ChangeEvent, Dispatch, SetStateAction } from 'react'

import styles from '../modal.module.scss'

interface ITitleProps {
  noTask: boolean
  task: string
  setTask: Dispatch<SetStateAction<string>>
}

const Title = ({ noTask, task, setTask }: ITitleProps) => {
  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.currentTarget.value)
  }

  return (
    <div className={styles.title}>
      <div className={styles.titleHead}>
        <div>Title</div>
        {noTask && <div className={styles.error}>제목을 입력해주세요</div>}
      </div>
      <input type='text' placeholder='할 일을 입력해주세요' value={task} onChange={handleTaskChange} />
    </div>
  )
}

export default Title
