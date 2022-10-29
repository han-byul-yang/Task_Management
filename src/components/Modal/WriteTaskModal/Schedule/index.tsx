import { useRecoilState } from 'recoil'
import ReactDatePicker from 'react-datepicker'

import { taskAtom } from 'store/atoms'
import { CustomDateButton } from './CustomDateButton'

import styles from './schedule.module.scss'

const Schedule = () => {
  const [task, setTask] = useRecoilState(taskAtom)

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setTask((prevTask) => ({ ...prevTask, date: { startDate: start, endDate: end } }))
  }

  return (
    <div className={styles.date}>
      <ReactDatePicker
        selected={task.date.startDate}
        onChange={handleDateChange}
        startDate={task.date.startDate}
        endDate={task.date.endDate}
        selectsRange
        dateFormat='yyyy.MM.dd'
        customInput={<CustomDateButton />}
      />
    </div>
  )
}

export default Schedule
