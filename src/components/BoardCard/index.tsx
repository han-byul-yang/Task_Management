import { useRecoilState } from 'recoil'
import dayjs from 'dayjs'

import { Todo, todosAtom } from 'store/atoms'

import { CalendarIcon, EditIcon } from 'assets/svgs'
import styles from './boardCard.module.scss'

interface IBoardCardProps {
  todo: Todo
  processName: string
}

const BoardCard = ({ todo, processName }: IBoardCardProps) => {
  const [todoList, setTodoList] = useRecoilState(todosAtom)

  const { image, task, category, description, date } = todo

  const handleDeleteClick = () => {
    setTodoList((prevState) => {
      const filterdTodo = todoList[processName].filter((todos) => todos.id !== todo.id)

      return {
        ...prevState,
        [processName]: [...filterdTodo],
      }
    })
  }

  const handleEditClick = () => {}

  return (
    <div key={`todo-${todo}`} className={styles.boardCard}>
      <img src={`${image}`} alt='todo-img' className={styles.image} />
      <div className={styles.title}>{task}</div>
      <div className={styles.setting}>
        <EditIcon />
        <div className={styles.settingBox}>
          <button className={styles.edit} type='button' onClick={handleEditClick}>
            EDIT
          </button>
          <button className={styles.delete} type='button' onClick={handleDeleteClick}>
            DELETE
          </button>
        </div>
      </div>
      {category.map((item) => {
        return (
          <div key={`category-${item}`} className={styles.category}>
            {item}
          </div>
        )
      })}
      <div className={styles.description}>{description}</div>
      <div className={styles.dates}>
        <CalendarIcon />
        <div>
          {!date[1]
            ? dayjs(date[0]).format('YYYY-MM-DD')
            : `${dayjs(date[0]).format('YYYY-MM-DD')}-${dayjs(date[1]).format('YYYY-MM-DD')}`}
        </div>
      </div>
    </div>
  )
}

export default BoardCard
