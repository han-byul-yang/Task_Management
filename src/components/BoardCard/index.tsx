import dayjs from 'dayjs'

import { Todo } from 'store/atoms'

import { CalendarIcon, EditIcon } from 'assets/svgs'
import styles from './boardCard.module.scss'

interface IBoardCardProps {
  todo: Todo
}

const BoardCard = ({ todo }: IBoardCardProps) => {
  const { image, task, category, description, date } = todo

  return (
    <div key={`todo-${todo}`} className={styles.boardCard}>
      <img src={`${image}`} alt='todo-img' className={styles.image} />
      <div className={styles.title}>{task}</div>
      <div className={styles.setting}>
        <EditIcon />
        <div className={styles.settingBox}>
          <button className={styles.edit} type='button'>
            EDIT
          </button>
          <button className={styles.delete} type='button'>
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
