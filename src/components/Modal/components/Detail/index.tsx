import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import { CustomButton } from '../../utils/CustomButton'

import { FileIcon, ImageIcon } from 'assets/svgs'
import styles from './detail.module.scss'

interface IDetailProps {
  setDate: Dispatch<SetStateAction<(Date | null)[]>>
  setImage: Dispatch<SetStateAction<any>>
  description: string
  setDescription: Dispatch<SetStateAction<string>>
}

const Detail = ({ setDate, setImage, description, setDescription }: IDetailProps) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)

  useEffect(() => {
    setDate([startDate, endDate])
  }, [startDate, endDate, setDate])

  const handleDateChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise(() => {
      reader.onload = () => {
        setImage(reader.result)
      }
    })
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value)
  }

  return (
    <div className={styles.detail}>
      <div>Task Detail</div>
      <div className={styles.date}>
        <ReactDatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          dateFormat='yyyy.MM.dd'
          customInput={<CustomButton />}
        />
      </div>
      <div className={styles.image}>
        <label className={styles.imageLabel} htmlFor='chooseFile'>
          <ImageIcon className={styles.imageBtn} />
          Choose Your Image 👈
        </label>
        <input type='file' id='chooseFile' accept='img/*' onChange={handleImageChange} />
      </div>
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

export default Detail
