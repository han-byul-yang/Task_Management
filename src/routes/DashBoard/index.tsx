import { useState, ChangeEvent, FormEvent } from 'react'
import ReactDatePicker from 'react-datepicker'

import CustomDateInput from './utils/CustomDateInput'
import TodayTask from './TodayTask'

import { EditIcon } from 'assets/svgs'
import styles from './dashBoard.module.scss'

const DashBoard = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [nickName, setNickName] = useState('')
  const [editNickName, setEditNickName] = useState(true)

  const handleNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.currentTarget.value)
  }

  const handleNickNameSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setNickName(nickName)
    setEditNickName(false)
  }

  const handleNickNameEditClick = () => {
    setEditNickName(true)
  }

  return (
    <header className={styles.header}>
      <div className={styles.nickNameContainer}>
        {editNickName ? (
          <form className={styles.nickNameForm} onSubmit={handleNickNameSubmit}>
            <input value={nickName} onChange={handleNickNameChange} placeholder='Please put your nickname' />
          </form>
        ) : (
          <div className={styles.nickName}>
            Welcome back <strong>{nickName}</strong>!
          </div>
        )}
        <EditIcon className={styles.editIcon} onClick={handleNickNameEditClick} />
      </div>
      <ReactDatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat='eee, dd MMMM yyyy'
        customInput={<CustomDateInput />}
      />
      <TodayTask startDate={startDate} />
    </header>
  )
}

export default DashBoard

// strong 태그 왜 적용 안됨
