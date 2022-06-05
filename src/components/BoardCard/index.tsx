import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import dayjs from 'dayjs'
import parse from 'html-react-parser'
import { Draggable } from 'react-beautiful-dnd'

import { Todo, todosAtom, searchKeyAtom } from 'store/atoms'
import { highlightWords } from './utils/highlightWords'
import Modal from 'components/Modal'
import ModalPortal from 'components/Modal/ModalPortal'

import { CalendarIcon, EditIcon } from 'assets/svgs'
import styles from './boardCard.module.scss'

interface IBoardCardProps {
  todo: Todo
  index: number
}

const BoardCard = ({ todo, index }: IBoardCardProps) => {
  const [todoList, setTodoList] = useRecoilState(todosAtom)
  const searchKey = useRecoilValue(searchKeyAtom)
  const [modalOpen, setModalOpen] = useState(false)
  const [settingOpen, setSettingOpen] = useState(false)

  const { id, process, image, description, date } = todo

  const handleSettingBtnClick = () => {
    setSettingOpen((prevState) => !prevState)
  }

  const handleEditClick = () => {
    setModalOpen(true)
  }

  const handleDeleteClick = () => {
    const filterdTodo = todoList[process].filter((todos) => todos.id !== id)

    setTodoList((prevState) => {
      return {
        ...prevState,
        [process]: [...filterdTodo],
      }
    })
  }

  const { highlightTask, highlightCategory } = highlightWords(searchKey, todo)

  return (
    <Draggable draggableId={`drag-${id}`} key={`drag-${id}`} index={index}>
      {(handleDrag) => (
        <div
          className={styles.boardCard}
          ref={handleDrag.innerRef}
          {...handleDrag.draggableProps}
          {...handleDrag.dragHandleProps}
        >
          {image ? <img src={`${image}`} alt='todo-img' className={styles.image} /> : null}
          <div className={styles.titleBox}>
            <div className={styles.title}>{parse(highlightTask)}</div>
            <div className={styles.setting}>
              <EditIcon className={styles.settingIcon} onClick={handleSettingBtnClick} />
              {settingOpen ? (
                <>
                  {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                  <div className={styles.settingBackground} onClick={handleSettingBtnClick} />
                  <div className={styles.settingBox}>
                    <button className={styles.edit} type='button' onClick={handleEditClick}>
                      EDIT
                    </button>
                    <button className={styles.delete} type='button' onClick={handleDeleteClick}>
                      DELETE
                    </button>
                  </div>
                </>
              ) : null}
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
                ? dayjs(date[0]).format('YYYY.MM.DD')
                : `${dayjs(date[0]).format('YYYY.MM.DD')}-${dayjs(date[1]).format('YYYY.MM.DD')}`}
            </div>
          </div>
          {modalOpen && (
            <ModalPortal>
              <Modal processName={process} todo={todo} setModalOpen={setModalOpen} />
            </ModalPortal>
          )}
        </div>
      )}
    </Draggable>
  )
}

export default BoardCard
