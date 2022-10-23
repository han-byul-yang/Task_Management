import { Dispatch, SetStateAction, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import dayjs from 'dayjs'
import parse from 'html-react-parser'
import { Draggable } from 'react-beautiful-dnd'

import { tasksAtom, searchKeyAtom, isOpenAddTaskModalAtom, taskAtom } from 'store/atoms'
import { ITask } from 'types/taskType'
import { highlightWords } from './utils/highlightWords'
import AddTaskModal from 'components/Modal/AddTaskModal'
import ModalPortal from 'components/Modal/ModalPortal'

import { CalendarIcon, EditIcon } from 'assets/svgs'
import styles from './boardCard.module.scss'

interface IBoardCardProps {
  cardTask: ITask
  index: number
  setBoardProcessName: Dispatch<SetStateAction<string>>
}

const BoardCard = ({ cardTask, index, setBoardProcessName }: IBoardCardProps) => {
  const [boardsTasks, setboardsTasks] = useRecoilState(tasksAtom)
  const searchKey = useRecoilValue(searchKeyAtom)
  // const [modalOpen, setModalOpen] = useState(false)
  const setIsOpenAddTaskModal = useSetRecoilState(isOpenAddTaskModalAtom)
  const setTask = useSetRecoilState(taskAtom)
  const [settingOpen, setSettingOpen] = useState(false)

  const { id, process, image, description, date } = cardTask

  const handleSettingBtnClick = () => {
    setSettingOpen((prevState) => !prevState)
    setBoardProcessName(process)
  }

  const handleEditClick = () => {
    setIsOpenAddTaskModal({ type: 'edit', isOpen: true })
    setTask(cardTask)
  }

  const handleDeleteClick = () => {
    const filterdTodo = boardsTasks[process].filter((todos) => todos.id !== id)

    setboardsTasks((prevState) => {
      return {
        ...prevState,
        [process]: [...filterdTodo],
      }
    })
  }

  const { highlightTask, highlightCategory } = highlightWords(searchKey, cardTask)

  return (
    <li>
      <Draggable draggableId={`drag-${id}`} key={`drag-${id}`} index={index}>
        {(handleDrag) => (
          <div
            className={styles.boardCard}
            ref={handleDrag.innerRef}
            {...handleDrag.draggableProps}
            {...handleDrag.dragHandleProps}
          >
            {image.url ? <img src={`${image.url}`} alt='todo-img' className={styles.image} /> : null}
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
              {highlightCategory.map((item: string) => {
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
          </div>
        )}
      </Draggable>
    </li>
  )
}

export default BoardCard

// useOutsideCLick hook 이용
