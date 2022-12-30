import { useDeferredValue, useEffect, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import filterContents from 'utils/filterContents'
import { filteringAtom, isOpenModalAtom, selectedBoardProcessNameAtom, tasksAtom, keyInputAtom } from 'store/atoms'
import useResize from 'hooks/useResize'
import { ITask } from 'types/taskType'
import BoardCard from 'routes/TaskDashBoard/BoardsContainer/Board/BoardCard'
import BoardSettingBox from './BoardSettingBox'

import { HamburgerIcon, Plus2Icon } from 'assets/svgs'
import styles from './board.module.scss'

interface IBoardsProps {
  process: string
}

const Board = ({ process }: IBoardsProps) => {
  const [isOpenBoardSettingBox, setIsOpenBoardSettingBox] = useState(false)
  const keyInput = useRecoilValue(keyInputAtom)
  const setSelectedBoardProcessName = useSetRecoilState(selectedBoardProcessNameAtom)
  const boardsTasks = useRecoilValue(tasksAtom)
  const filtering = useRecoilValue(filteringAtom)
  const setIsOpenModal = useSetRecoilState(isOpenModalAtom)
  const deferredKeyword = useDeferredValue(keyInput)
  const { size, isSize: isTablet } = useResize()

  useEffect(() => {
    size.TABLET.RESIZE()
    size.TABLET.SIZEEVENT()
  }, [size.TABLET])

  const handleAddTaskClick = () => {
    setSelectedBoardProcessName(process)
    setIsOpenModal((isOpenState) => ({ ...isOpenState, writeTaskModal: { type: 'add', isOpen: true } }))
  }

  const handleBoardSettingClick = () => {
    setSelectedBoardProcessName(process)
    setIsOpenBoardSettingBox(true)
  }

  const processTasks = filtering.filter
    ? filterContents(filtering.type, deferredKeyword, boardsTasks)[process]
    : boardsTasks[process]

  return (
    <li className={styles.boardBox}>
      {!isTablet && (
        <div className={styles.boardTop}>
          <div>{process}</div>
          <Plus2Icon className={styles.plus2Icon} onClick={handleAddTaskClick} />
          <HamburgerIcon className={styles.hamburgerIcon} onClick={handleBoardSettingClick} />
        </div>
      )}
      {!isTablet && isOpenBoardSettingBox && <BoardSettingBox setIsOpenBoardSettingBox={setIsOpenBoardSettingBox} />}
      <Droppable droppableId={`${process}`} key={`${process}`}>
        {(handleDrop) => (
          <div className={styles.cardList} ref={handleDrop.innerRef} {...handleDrop.droppableProps}>
            {processTasks?.length === 0 ? (
              <p className={styles.noTaskMessage}>할일이 없습니다</p>
            ) : (
              <ul>
                {processTasks?.map((cardTask: ITask, iCard) => {
                  const cardKey = `card=${iCard}`
                  return <BoardCard key={cardKey} cardTask={cardTask} index={iCard} />
                })}
              </ul>
            )}
            {handleDrop.placeholder}
          </div>
        )}
      </Droppable>
      <div className={styles.boardBottom}>
        {isTablet && (
          <>
            {isOpenBoardSettingBox && <BoardSettingBox setIsOpenBoardSettingBox={setIsOpenBoardSettingBox} />}
            <button className={styles.boardSettingButton} type='button' onClick={handleBoardSettingClick}>
              프로젝트 메뉴
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default Board
