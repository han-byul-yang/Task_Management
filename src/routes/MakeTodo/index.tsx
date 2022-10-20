import { ChangeEvent, FormEvent, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { isOpenAddBoardModalAtom } from 'store/atoms'
import AddTaskModal from 'components/Modal/AddTaskModal'
import ModalPortal from 'components/Modal/ModalPortal'
import SearchInput from './SearchInput'
import Boards from './Board'
import BoardsContainer from './BoardsContainer'
import AddBoardModal from 'components/Modal/AddBoardModal'

import styles from './makeTodo.module.scss'
import { AddIcon, MinusIcon } from 'assets/svgs'

const MakeTodo = () => {
  const [addTaskProcessName, setAddTaskProcessName] = useState('')
  const [createProcess, setCreateProcess] = useState(false)
  const [addProcessValue, setAddProcessValue] = useState('')
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const isOpenAddBoardModal = useRecoilValue(isOpenAddBoardModalAtom)

  const handleAddBtnClick = () => {
    setCreateProcess(true)
  }

  /* const handleAddProcessSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setProcessList((prevProcess) => [...prevProcess, addProcessValue])
    setboardsTasks((prevboardsTasks) => {
      return { ...prevboardsTasks, [addProcessValue]: [] }
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
            placeholder='생성할 카테고리를 입력해주세요'
            value={addProcessValue}
            onChange={handleProcessInputChange}
          />
        </form>
      )
    }
    return <AddIcon className={styles.addIcon} onClick={handleAddBtnClick} />
  } */

  return (
    <>
      <header>
        <SearchInput />
      </header>
      <main>
        <BoardsContainer setIsAddTaskModalOpen={setIsAddTaskModalOpen} setAddTaskProcessName={setAddTaskProcessName} />
      </main>
      {isAddTaskModalOpen && (
        <ModalPortal>
          <AddTaskModal addTaskProcessName={addTaskProcessName} setIsAddTaskModalOpen={setIsAddTaskModalOpen} />
        </ModalPortal>
      )}
      {isOpenAddBoardModal && (
        <ModalPortal>
          <AddBoardModal />
        </ModalPortal>
      )}
    </>
  )
}

export default MakeTodo
