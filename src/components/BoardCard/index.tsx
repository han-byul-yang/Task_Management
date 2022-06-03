import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import dayjs from 'dayjs'
import parse from 'html-react-parser'

import { Todo, todosAtom, searchKeyAtom } from 'store/atoms'
import { highlightWords } from './utils/highlightWords'
import Modal from 'components/Modal'
import ModalPortal from 'components/Modal/ModalPortal'

import { CalendarIcon, EditIcon } from 'assets/svgs'
import styles from './boardCard.module.scss'

interface IBoardCardProps {
  todo: Todo
}

const BoardCard = ({ todo }: IBoardCardProps) => {
  const [todoList, setTodoList] = useRecoilState(todosAtom)
  const searchKey = useRecoilValue(searchKeyAtom)
  const [openModal, setOpenModal] = useState(false)

  const { id, process, image, description, date } = todo

  const handleDeleteClick = () => {
    const filterdTodo = todoList[process].filter((todos) => todos.id !== id)

    setTodoList((prevState) => {
      return {
        ...prevState,
        [process]: [...filterdTodo],
      }
    })
  }

  const handleEditClick = () => {
    setOpenModal(true)
  }

  const { highlightTask, highlightCategory } = highlightWords(searchKey, todo)

  return (
    <div key={`todo-${todo}`} className={styles.boardCard}>
      {image ? <img src={`${image}`} alt='todo-img' className={styles.image} /> : null}
      <div className={styles.titleBox}>
        <div className={styles.title}>{parse(highlightTask)}</div>
        <div className={styles.setting}>
          <EditIcon className={styles.settingIcon} />
          <div className={styles.settingBox}>
            <button className={styles.edit} type='button' onClick={handleEditClick}>
              EDIT
            </button>
            <button className={styles.delete} type='button' onClick={handleDeleteClick}>
              DELETE
            </button>
          </div>
        </div>
      </div>
      <ul className={styles.category}>
        {highlightCategory.map((item) => {
          return <li key={`category-${item}`}>{parse(item)}</li>
        })}
      </ul>
      <div className={styles.description}>{description}</div>
      <div className={styles.dates}>
        <CalendarIcon className={styles.dateIcon} />
        <div>
          {!date[1]
            ? dayjs(date[0]).format('YYYY-MM-DD')
            : `${dayjs(date[0]).format('YYYY-MM-DD')}-${dayjs(date[1]).format('YYYY-MM-DD')}`}
        </div>
      </div>
      {openModal && (
        <ModalPortal>
          <Modal processName={process} todo={todo} setOpenModal={setOpenModal} />
        </ModalPortal>
      )}
    </div>
  )
}

export default BoardCard

// processname을 리팩토링 할 수 있을 것
// category를 li태그로 나타낼지 고민
// 전체 텍스트 하이라이트도 나중에 해볼 수 있을 것
// 하이라이트 된 카드만 보여줄 수 있을 것
