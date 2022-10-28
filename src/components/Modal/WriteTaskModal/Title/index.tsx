import { ChangeEvent } from 'react'
import { useRecoilState } from 'recoil'

import { taskAtom } from 'store/atoms'

import styles from './title.module.scss'

interface ITitleProps {
  noTitle: boolean
}

const Title = ({ noTitle }: ITitleProps) => {
  const [task, setTask] = useRecoilState(taskAtom)

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask((prevTask) => ({ ...prevTask, taskTitle: e.currentTarget.value }))
  }

  return (
    <div className={styles.title}>
      <div className={styles.titleHead}>
        <p>Title</p>
        {noTitle && <p className={styles.error}>제목을 입력해주세요</p>}
      </div>
      <input type='text' placeholder='할 일을 입력해주세요' value={task.taskTitle} onChange={handleTaskChange} />
    </div>
  )
}

export default Title
