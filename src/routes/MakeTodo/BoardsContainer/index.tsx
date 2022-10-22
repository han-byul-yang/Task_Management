import React, { Dispatch } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { isOpenAddBoardModalAtom, boardProcessAtom, tasksAtom } from 'store/atoms'
import Board from '../Board'

import styles from './boardsContainer.module.scss'

interface IBoardsContainerProps {
  setIsAddTaskModalOpen: Dispatch<React.SetStateAction<boolean>>
  setBoardProcessName: Dispatch<React.SetStateAction<string>>
}

const BoardsContainer = ({ setIsAddTaskModalOpen, setBoardProcessName }: IBoardsContainerProps) => {
  const boardProcessList = useRecoilValue(boardProcessAtom)
  const setBoardsTasks = useSetRecoilState(tasksAtom)
  const setIsOpenAddBoardModal = useSetRecoilState(isOpenAddBoardModalAtom)

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
        <ul className={styles.boards}>
          {boardProcessList.map((process) => {
            const boardKey = `board-${process}`
            return (
              <Board
                key={boardKey}
                process={process}
                setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                setBoardProcessName={setBoardProcessName}
              />
            )
          })}
        </ul>
        <button className={styles.boardAddButton} type='button' onClick={handleOpenAddBoardModalClick}>
          <p>보드 추가</p>
        </button>
      </div>
    </DragDropContext>
  )
}

export default BoardsContainer
