import React, { Dispatch } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { isOpenAddBoardModalAtom, boardProcessAtom, tasksAtom } from 'store/atoms'
import Board from '../Board'

import styles from './boardsContainer.module.scss'

interface IBoardsContainerProps {
  setIsAddTaskModalOpen: Dispatch<React.SetStateAction<boolean>>
  setAddTaskProcessName: Dispatch<React.SetStateAction<string>>
}

const BoardsContainer = ({ setIsAddTaskModalOpen, setAddTaskProcessName }: IBoardsContainerProps) => {
  const boardProcessList = useRecoilValue(boardProcessAtom)
  // const [boardProcessList, setBoardProcessList] = useState(['TODO', 'DOING', 'DONE'])
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

  const handleAddTodoClick = (process: string) => {
    setAddTaskProcessName(process)
    setIsAddTaskModalOpen(true)
  }

  const handleOpenAddBoardModalClick = () => {
    setIsOpenAddBoardModal(true)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <section className={styles.section}>
        <ul className={styles.boards}>
          {boardProcessList.map((process) => {
            const boardKey = `board-${process}`
            return <Board key={boardKey} process={process} handleAddTodoClick={handleAddTodoClick} />
          })}
        </ul>
        <button className={styles.boardAddButton} type='button' onClick={handleOpenAddBoardModalClick}>
          보드 추가
        </button>
      </section>
    </DragDropContext>
  )
}

export default BoardsContainer
