import { ChangeEvent, FormEvent, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { processAtom, todosAtom } from 'store/atoms'
import Modal from 'components/Modal'
import ModalPortal from 'components/Modal/ModalPortal'
import SearchInput from './SearchInput'
import Boards from './Boards'

import styles from './makeTodo.module.scss'
import { AddIcon, MinusIcon } from 'assets/svgs'

const MakeTodo = () => {
  const [processName, setProcessName] = useState('')
  const [openModal, setModalOpen] = useState(false)
  const setTodoList = useSetRecoilState(todosAtom)
  const [processList, setProcessList] = useRecoilState(processAtom)
  const [createProcess, setCreateProcess] = useState(false)
  const [addProcessValue, setAddProcessValue] = useState('')

  const handleDragEnd = (info: DropResult) => {
    const { destination, source } = info
    if (!destination) return
    if (destination?.droppableId === source.droppableId) {
      setTodoList((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]
        const taskObj = boardCopy[source.index]
        boardCopy.splice(source.index, 1)
        boardCopy.splice(destination?.index, 0, taskObj)
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        }
      })
    }
    if (destination?.droppableId !== source.droppableId) {
      setTodoList((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]
        const taskObj = sourceBoard[source.index]
        const changeTaskObj = { ...taskObj, process: destination.droppableId }
        const destinationBoard = [...allBoards[destination.droppableId]]
        sourceBoard.splice(source.index, 1)
        destinationBoard.splice(destination?.index, 0, changeTaskObj)
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        }
      })
    }
  }

  const handleAddTodoClick = (process: string) => {
    setProcessName(process)
    setModalOpen(true)
  }

  const handleAddBtnClick = () => {
    setCreateProcess(true)
  }

  const handleAddProcessSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setProcessList((prevProcess) => [...prevProcess, addProcessValue])
    setTodoList((prevTodoList) => {
      return { ...prevTodoList, [addProcessValue]: [] }
    })
  }

  const handleDeleteProcessClick = () => {
    const copyProcessList = [...processList]
    copyProcessList.splice(processList.length - 1, 1)
    setProcessList(copyProcessList)
    setAddProcessValue('')
    setCreateProcess(false)
  }

  const handleProcessInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddProcessValue(e.currentTarget.value)
  }

  const createAddProcess = () => {
    if (createProcess) {
      return (
        <form onSubmit={handleAddProcessSubmit}>
          <input
            className={styles.processInput}
            type='text'
            placeholder='????????? ??????????????? ??????????????????'
            value={addProcessValue}
            onChange={handleProcessInputChange}
          />
        </form>
      )
    }
    return <AddIcon className={styles.addIcon} onClick={handleAddBtnClick} />
  }

  return (
    <div className={styles.page}>
      <SearchInput />
      <DragDropContext onDragEnd={handleDragEnd}>
        <section className={styles.section}>
          <div className={styles.boards}>
            {processList.map((process) => {
              return <Boards key={`process-${process}`} process={process} handleAddTodoClick={handleAddTodoClick} />
            })}
          </div>
          <div className={styles.icons}>
            {processList.length <= 3 ? (
              createAddProcess()
            ) : (
              <MinusIcon className={styles.deleteIcon} onClick={handleDeleteProcessClick} />
            )}
          </div>
        </section>
      </DragDropContext>
      {openModal && (
        <ModalPortal>
          <Modal processName={processName} setModalOpen={setModalOpen} />
        </ModalPortal>
      )}
    </div>
  )
}

export default MakeTodo
