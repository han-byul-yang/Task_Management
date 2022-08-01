import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import { CustomButton } from './CustomButton'

import styles from './schedule.module.scss'

interface IDateProps {
  setDate: Dispatch<SetStateAction<(Date | null)[]>>
}

const Schedule = ({ setDate }: IDateProps) => {
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

  return (
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
  )
}

export default Schedule
