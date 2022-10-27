import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import dayjs from 'dayjs'
import parse from 'html-react-parser'
import { Draggable } from 'react-beautiful-dnd'

import { keyInputAtom, filteringAtom, selectedBoardProcessNameAtom } from 'store/atoms'
import { ITask } from 'types/taskType'
import { highlightWords } from '../../utils/highlightWords'
import CardSettingBox from './CardSettingBox'
import ModalPortal from 'components/Modal/ModalPortal'
import MoveCardModal from 'components/Modal/MoveCardModal'

import { CalendarIcon, EditIcon } from 'assets/svgs'
import styles from './boardCard.module.scss'

interface IBoardCardProps {
  cardTask: ITask
  index: number
}

const BoardCard = ({ cardTask, index }: IBoardCardProps) => {
  const [isCardSettingBoxOpen, setIsCardSettingBoxOpen] = useState(false)
  const [isOpenMoveCardModal, setIsOpenMoveCardModal] = useState(false)
  const setSelectedBoardProcessName = useSetRecoilState(selectedBoardProcessNameAtom)
  const keyInput = useRecoilValue(keyInputAtom)
  const filtering = useRecoilValue(filteringAtom)

  const { id, taskTitle, categoryList, process, image, description, date } = cardTask

  const handleCardSettingClick = () => {
    setIsCardSettingBoxOpen(true)
    setSelectedBoardProcessName(process)
  }

  const { highlightTitle, highlightCategory, highlightDescription } = highlightWords(
    filtering.type ? keyInput.substring(filtering.type.length + 2) : keyInput,
    cardTask
  )
  const cardCategoryList =
    filtering.filter && (filtering.type === '카테고리' || !filtering.type) ? highlightCategory : categoryList

  return (
    <>
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
                <p className={styles.title}>
                  {filtering.filter && (filtering.type === '제목' || !filtering.type)
                    ? parse(highlightTitle)
                    : taskTitle}
                </p>
                <EditIcon className={styles.settingIcon} onClick={handleCardSettingClick} />
                {isCardSettingBoxOpen && (
                  <CardSettingBox
                    setIsCardSettingBoxOpen={setIsCardSettingBoxOpen}
                    setIsOpenMoveCardModal={setIsOpenMoveCardModal}
                    cardTask={cardTask}
                  />
                )}
              </div>
              <ul className={styles.category}>
                {cardCategoryList.map((item: string) => {
                  return (
                    <li key={`category-${item}`}>
                      {filtering.filter && (filtering.type === '카테고리' || !filtering.type) ? parse(item) : item}
                    </li>
                  )
                })}
              </ul>
              <p className={styles.description}>
                {filtering.filter && (filtering.type === '내용' || !filtering.type)
                  ? parse(highlightDescription)
                  : description}
              </p>
              <div className={styles.dates}>
                <CalendarIcon className={styles.dateIcon} />
                <div>
                  {!date.endDate
                    ? dayjs(date.startDate).format('YYYY.MM.DD')
                    : `${dayjs(date.startDate).format('YYYY.MM.DD')}-${dayjs(date.endDate).format('YYYY.MM.DD')}`}
                </div>
              </div>
            </div>
          )}
        </Draggable>
      </li>
      {isOpenMoveCardModal && (
        <ModalPortal>
          <MoveCardModal cardIndex={index} setIsOpenMoveCardModal={setIsOpenMoveCardModal} />
        </ModalPortal>
      )}
    </>
  )
}

export default BoardCard
