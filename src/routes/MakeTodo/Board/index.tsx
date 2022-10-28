import { useEffect, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  filteringAtom,
  filterTasksAtom,
  isOpenWriteTaskModalAtom,
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
  const [isOpenBoardSettingBox, setIsOpenBoardSettingBox] = useState(false)
  const setSelectedBoardProcessName = useSetRecoilState(selectedBoardProcessNameAtom)
  const boardsTasks = useRecoilValue(tasksAtom)
  const filterTasks = useRecoilValue(filterTasksAtom)
  const filtering = useRecoilValue(filteringAtom)
  const setIsOpenWriteTaskModal = useSetRecoilState(isOpenWriteTaskModalAtom)
  const { size, isSize: isTablet } = useResize()

  useEffect(() => {
    size.TABLET.RESIZE()
    size.TABLET.SIZEEVENT()
  }, [size.TABLET])

  const handleAddTaskClick = () => {
    setSelectedBoardProcessName(process)
    setIsOpenWriteTaskModal({ type: 'add', isOpen: true })
  }

  const handleBoardSettingClick = () => {
    setSelectedBoardProcessName(process)
    setIsOpenBoardSettingBox(true)
  }

  const processTasks = filtering.filter ? filterTasks[process] : boardsTasks[process]

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

// ?와 ! 삭제
// process 이름 네이밍
// setIsOpenWriteModal 네이밍
// setSelectedBoardProcessName props drilling 2번 이상
