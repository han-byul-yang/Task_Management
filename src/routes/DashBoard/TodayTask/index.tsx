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

          if (todoStartDate !== null && todoEndDate === null) {
            return null
          }
          if (todoStartDate !== null && todoEndDate !== null) {
            return todoStartDate <= selectedDate && todoEndDate >= selectedDate
          }
          return todoStartDate === selectedDate
        })
    )
  }, [selectedDate, todoList])

  const handleAddTodayTaskClick = () => {
    console.log(todoList)
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
            <li key={`${task.id}`}>
              <button type='button'>
                <div>{task.task}</div>
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
