import { Dispatch, SetStateAction, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import dayjs from 'dayjs'
import parse from 'html-react-parser'
import { Draggable } from 'react-beautiful-dnd'

import { tasksAtom, searchKeyAtom, isOpenAddTaskModalAtom, taskAtom } from 'store/atoms'
import { ITask } from 'types/taskType'
import { highlightWords } from './utils/highlightWords'
import CardSettingBox from './CardSettingBox'
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
  const [isCardSettingBoxOpen, setIsCardSettingBoxOpen] = useState(false)

  const { id, process, image, description, date } = cardTask

  const handleCardSettingClick = () => {
    setIsCardSettingBoxOpen(true)
    setBoardProcessName(process)
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
            {image.url && <img src={`${image.url}`} alt={image.name} className={styles.image} />}
            <div className={styles.boxHeader}>
              <div className={styles.title}>{parse(highlightTask)}</div>
              <EditIcon className={styles.settingIcon} onClick={handleCardSettingClick} />
              {isCardSettingBoxOpen && (
                <CardSettingBox setIsCardSettingBoxOpen={setIsCardSettingBoxOpen} cardTask={cardTask} />
              )}
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
