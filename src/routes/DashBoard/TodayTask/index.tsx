import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import dayjs from 'dayjs'

import { Todo, todosAtom } from 'store/atoms'

import styles from './todayTask.module.scss'

interface ITodayTaskProps {
  startDate: Date | null
}

const TodayTask = ({ startDate }: ITodayTaskProps) => {
  const todoList = useRecoilValue(todosAtom)
  const [todayTaskList, setTodayTaskList] = useState<Todo[]>([])
  const [isChecked, setIsChecked] = useState(false)

  const selectedDate = Number(dayjs(startDate).format('YYMMDD'))

  useEffect(() => {
    // 리팩토링
    setTodayTaskList(
      Object.keys(todoList)
        .map((key) => todoList[key])
        .reduce((acc, cur) => [...acc, ...cur], [])
        .filter((todo) => {
          const todoStartDate = Number(dayjs(todo.date[0]).format('YYMMDD'))
          const todoEndDate = Number(dayjs(todo.date[1]).format('YYMMDD'))

          if (!isNaN(todoStartDate) && !isNaN(todoEndDate)) {
            return todoStartDate <= selectedDate && todoEndDate >= selectedDate
          }
          if (!isNaN(todoStartDate) && isNaN(todoEndDate)) {
            return todoStartDate === selectedDate
          }
          return null
        })
    )
  }, [selectedDate, todoList])

  const handleAddTodayTaskClick = () => {
    console.log(todoList)
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
              <input type='checkbox' value={task.task} checked={isChecked} onChange={handleCheckChange} />
              <button type='button'>
                <div>{task.task}</div>
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
