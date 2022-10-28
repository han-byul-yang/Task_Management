import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { moveCardInSameBoard, moveCardToDifferentBoard } from 'utils/moveCard'
import { boardProcessAtom, tasksAtom, isOpenModalAtom } from 'store/atoms'
import useResize from 'hooks/useResize'
import Board from '../Board'
import LNB from 'components/LNB'

import styles from './boardsContainer.module.scss'

const BoardsContainer = () => {
  const boardProcessList = useRecoilValue(boardProcessAtom)
  const setBoardsTasks = useSetRecoilState(tasksAtom)
  const setIsOpenModal = useSetRecoilState(isOpenModalAtom)
  const { size, isSize: isTablet } = useResize()

  useEffect(() => {
    size.TABLET.RESIZE()
    size.TABLET.SIZEEVENT()
  }, [size.TABLET])

  const handleDragEnd = (dragInformation: DropResult) => {
    const { destination, source } = dragInformation
    if (!destination) return
    if (destination?.droppableId === source.droppableId) {
      setBoardsTasks((allTaskBoards) =>
        moveCardInSameBoard(allTaskBoards, source.droppableId, source.index, destination.index)
      )
    }
    if (destination?.droppableId !== source.droppableId) {
      setBoardsTasks((allTaskBoards) =>
        moveCardToDifferentBoard(
          allTaskBoards,
          source.droppableId,
          source.index,
          destination.droppableId,
          destination.index
        )
      )
    }
  }

  const handleOpenWriteBoardModalClick = () => {
    setIsOpenModal((isOpenState) => ({ ...isOpenState, writeBoardModal: { type: 'add', isOpen: true } }))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.boardsContainer}>
        {isTablet && <LNB />}
        <ul className={styles.boards}>
          {isTablet ? (
            <Outlet />
          ) : (
            boardProcessList.map((process) => {
              const boardKey = `board-${process}`
              return <Board key={boardKey} process={process} />
            })
          )}
        </ul>
        {!isTablet && (
          <button className={styles.boardAddButton} type='button' onClick={handleOpenWriteBoardModalClick}>
            보드 추가
          </button>
        )}
      </div>
    </DragDropContext>
  )
}

export default BoardsContainer
