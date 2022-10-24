import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import dayjs from 'dayjs'

import { tasksAtom } from 'store/atoms'
import { ITask } from 'types/taskType'

import styles from './todayTask.module.scss'

interface ITodayTaskProps {
  startDate: Date | null
}

const TodayTask = ({ startDate }: ITodayTaskProps) => {
  const boardsTasks = useRecoilValue(tasksAtom)
  const [todayTaskList, setTodayTaskList] = useState<ITask[]>([])
  const [isChecked, setIsChecked] = useState(false)

  const selectedDate = Number(dayjs(startDate).format('YYMMDD'))

  useEffect(() => {
    // 리팩토링
    setTodayTaskList(
      Object.keys(boardsTasks)
        .map((key) => boardsTasks[key])
        .reduce((acc, cur) => [...acc, ...cur], [])
        .filter((todo) => {
          const todoStartDate = Number(dayjs(todo.date.startDate).format('YYMMDD'))
          const todoEndDate = Number(dayjs(todo.date.endDate).format('YYMMDD'))

          if (!isNaN(todoStartDate) && !isNaN(todoEndDate)) {
            return todoStartDate <= selectedDate && todoEndDate >= selectedDate
          }
          if (!isNaN(todoStartDate) && isNaN(todoEndDate)) {
            return todoStartDate === selectedDate
          }
          return null
        })
    )
  }, [selectedDate, boardsTasks])

  const handleAddTodayTaskClick = () => {
    console.log(boardsTasks)
  }

  const handleCheckChange = () => {
    setIsChecked((prev) => !prev)
  }

  return (
    <div className={styles.todayTaskContainer}>
      <div>Today&apos;s Tasks</div>
      <button type='button' onClick={handleAddTodayTaskClick}>
        +
      </button>
      <ul className={styles.taskList}>
        {todayTaskList.map((task) => {
          return (
            <li key={`${task.id}`} className={styles.taskItem}>
              <input type='checkbox' value={task.taskTitle} checked={isChecked} onChange={handleCheckChange} />
              <button type='button'>
                <div>{task.taskTitle}</div>
                <div>{task.process}</div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TodayTask

// task이름 title 로 바꾸기
