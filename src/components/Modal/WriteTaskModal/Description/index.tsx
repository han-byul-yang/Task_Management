import { ChangeEvent } from 'react'
import { useRecoilState } from 'recoil'

import { taskAtom } from 'store/atoms'

import { FileIcon } from 'assets/svgs'
import styles from './description.module.scss'

const Description = () => {
  const [task, setTask] = useRecoilState(taskAtom)

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask((prevTask) => ({ ...prevTask, description: e.currentTarget.value }))
  }

  return (
    <div className={styles.description}>
      <FileIcon />
      <input
        type='text'
        placeholder='상세한 내용을 입력하세요'
        value={task.description}
        onChange={handleDescriptionChange}
      />
    </div>
  )
}

export default Description

// task detail title을 어디로 보낼지 생각
