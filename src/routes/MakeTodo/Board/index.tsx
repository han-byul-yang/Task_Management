import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  filteringAtom,
  filterTasksAtom,
  isOpenAddTaskModalAtom,
  selectedBoardProcessNameAtom,
  tasksAtom,
} from 'store/atoms'
import useResize from 'hooks/useResize'
import { ITask } from 'types/taskType'
import BoardCard from 'components/BoardCard'
import BoardSettingBox from './BoardSettingBox'

import styles from './board.module.scss'
import { HamburgerIcon, Plus2Icon } from 'assets/svgs'

interface IBoardsProps {
  process: string
}

const Board = ({ process }: IBoardsProps) => {
  const [isBoardSettingBoxOpen, setIsBoardSettingBoxOpen] = useState(false)
  const setSelectedBoardProcessName = useSetRecoilState(selectedBoardProcessNameAtom)
  const boardsTasks = useRecoilValue(tasksAtom)
  const filterTasks = useRecoilValue(filterTasksAtom)
  const filtering = useRecoilValue(filteringAtom)
  const setIsAddTaskModalOpen = useSetRecoilState(isOpenAddTaskModalAtom)
  const { size, isSize: isTablet } = useResize()

  useEffect(() => {
    size.TABLET.RESIZE()
    size.TABLET.SIZEEVENT()
  }, [size.TABLET])

  const handleAddTodoClick = () => {
    setSelectedBoardProcessName(process)
    setIsAddTaskModalOpen({ type: 'add', isOpen: true })
  }

  const handleBoardSettingClick = () => {
    setSelectedBoardProcessName(process)
    setIsBoardSettingBoxOpen(true)
  }

  const processTasks = filtering.filter ? filterTasks[process] : boardsTasks[process]

  return (
    <li className={styles.boardBox}>
      {!isTablet && (
        <div className={styles.boardTop}>
          <div>{process}</div>
          <Plus2Icon className={styles.plus2Icon} onClick={handleAddTodoClick} />
          <HamburgerIcon className={styles.hamburgerIcon} onClick={handleBoardSettingClick} />
        </div>
      )}
      {!isTablet && isBoardSettingBoxOpen && <BoardSettingBox setIsBoardSettingBoxOpen={setIsBoardSettingBoxOpen} />}
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
            {isBoardSettingBoxOpen && <BoardSettingBox setIsBoardSettingBoxOpen={setIsBoardSettingBoxOpen} />}
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

// ?와 ! 삭제
// process 이름 네이밍
// setIsOpenAddModal 네이밍
// setSelectedBoardProcessName props drilling 2번 이상
