import { ChangeEvent, Dispatch, SetStateAction } from 'react'

import { FileIcon } from 'assets/svgs'
import styles from './detail.module.scss'

interface IDetailProps {
  description: string
  setDescription: Dispatch<SetStateAction<string>>
}

const Description = ({ description, setDescription }: IDetailProps) => {
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value)
  }

  return (
    <div className={styles.detail}>
      <div>Task Detail</div>

      <div className={styles.description}>
        <FileIcon />
        <input
          type='text'
          placeholder='상세한 내용을 입력하세요'
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  )
}

export default Description
