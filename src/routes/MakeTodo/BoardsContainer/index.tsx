import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { isOpenAddBoardModalAtom, boardProcessAtom, tasksAtom } from 'store/atoms'
import useResize from 'hooks/useResize'
import Board from '../Board'
import LNB from 'components/LNB'

import styles from './boardsContainer.module.scss'

const BoardsContainer = () => {
  const boardProcessList = useRecoilValue(boardProcessAtom)
  const setBoardsTasks = useSetRecoilState(tasksAtom)
  const setIsOpenAddBoardModal = useSetRecoilState(isOpenAddBoardModalAtom)
  const { size, isSize: isTablet } = useResize()

  useEffect(() => {
    size.TABLET.RESIZE()
    size.TABLET.SIZEEVENT()
  }, [size.TABLET])

  const handleDragEnd = (dragInformation: DropResult) => {
    const { destination, source } = dragInformation
    if (!destination) return
    if (destination?.droppableId === source.droppableId) {
      setBoardsTasks((allTaskBoards) => {
        const sourceTaskList = [...allTaskBoards[source.droppableId]]
        const sourceTask = sourceTaskList[source.index]
        sourceTaskList.splice(source.index, 1)
        sourceTaskList.splice(destination?.index, 0, sourceTask)
        return {
          ...allTaskBoards,
          [source.droppableId]: sourceTaskList,
        }
      })
    }
    if (destination?.droppableId !== source.droppableId) {
      setBoardsTasks((allTaskBoards) => {
        const sourceTaskList = [...allTaskBoards[source.droppableId]]
        const sourceTask = sourceTaskList[source.index]
        const changeTaskInformation = { ...sourceTask, process: destination.droppableId }
        const destinationTaskList = [...allTaskBoards[destination.droppableId]]
        sourceTaskList.splice(source.index, 1)
        destinationTaskList.splice(destination?.index, 0, changeTaskInformation)
        return {
          ...allTaskBoards,
          [source.droppableId]: sourceTaskList,
          [destination.droppableId]: destinationTaskList,
        }
      })
    }
  }

  const handleOpenAddBoardModalClick = () => {
    setIsOpenAddBoardModal({ type: 'add', isOpen: true })
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
        {isTablet ? (
          <div className={styles.containerSettingBox}>
            <button type='button' className={styles.containerSettingButton}>
              프로젝트 메뉴
            </button>
          </div>
        ) : (
          <button className={styles.boardAddButton} type='button' onClick={handleOpenAddBoardModalClick}>
            보드 추가
          </button>
        )}
      </div>
    </DragDropContext>
  )
}

export default BoardsContainer
