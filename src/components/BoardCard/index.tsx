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
  processName: string
}

const BoardCard = ({ todo, processName }: IBoardCardProps) => {
  const [todoList, setTodoList] = useRecoilState(todosAtom)
  const searchKey = useRecoilValue(searchKeyAtom)
  const [openModal, setOpenModal] = useState(false)

  const { image, description, date } = todo

  const handleDeleteClick = () => {
    const filterdTodo = todoList[processName].filter((todos) => todos.id !== todo.id)

    setTodoList((prevState) => {
      return {
        ...prevState,
        [processName]: [...filterdTodo],
      }
    })
  }

  const handleEditClick = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const { highlightTask, highlightCategory } = highlightWords(searchKey, todo)

  return (
    <div key={`todo-${todo}`} className={styles.boardCard}>
      <img src={`${image}`} alt='todo-img' className={styles.image} />
      <div className={styles.title}>{parse(highlightTask)}</div>
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
      {highlightCategory.map((item) => {
        return (
          <div key={`category-${item}`} className={styles.category}>
            {parse(item)}
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
      {openModal && (
        <ModalPortal>
          <Modal processName={processName} todo={todo} handleCloseModal={handleCloseModal} />
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
