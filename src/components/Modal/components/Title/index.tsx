import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useRecoilState } from 'recoil'

import { taskAtom } from 'store/atoms'

import styles from './title.module.scss'

interface ITitleProps {
  noTask: boolean
}

const Title = ({ noTask }: ITitleProps) => {
  const [taskTitle, setTaskTitle] = useRecoilState(taskAtom)

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle((prevTask) => ({ ...prevTask, taskTitle: e.currentTarget.value }))
  }

  return (
    <div className={styles.title}>
      <div className={styles.titleHead}>
        <div>Title</div>
        {noTask && <div className={styles.error}>제목을 입력해주세요</div>}
      </div>
      <input type='text' placeholder='할 일을 입력해주세요' value={taskTitle.taskTitle} onChange={handleTaskChange} />
    </div>
  )
}

export default Title
