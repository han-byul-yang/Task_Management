import { ChangeEvent, FormEvent, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { DragDropContext } from 'react-beautiful-dnd'

import { processAtom, todosAtom } from 'store/atoms'
import Modal from 'components/Modal'
import ModalPortal from 'components/Modal/ModalPortal'
import SearchInput from './SearchInput'

import styles from './makeTodo.module.scss'
import { AddIcon, MinusIcon } from 'assets/svgs'
import Boards from './Boards'

const MakeTodo = () => {
  const [processName, setProcessName] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const setTodoList = useSetRecoilState(todosAtom)
  const [processList, setProcessList] = useRecoilState(processAtom)
  const [createProcess, setCreateProcess] = useState(false)
  const [addProcessValue, setAddProcessValue] = useState('')

  const handleDragEnd = (t: any) => {
    console.log(t)
  }

  const handleAddTodoClick = (process: string) => {
    setProcessName(process)
    setOpenModal(true)
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
  }

  return (
    <div className={styles.page}>
      <SearchInput />
      <DragDropContext onDragEnd={handleDragEnd}>
        <main className={styles.main}>
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
        </main>
      </DragDropContext>
      {openModal && (
        <ModalPortal>
          <Modal processName={processName} setOpenModal={setOpenModal} />
        </ModalPortal>
      )}
    </div>
  )
}

export default MakeTodo

// 나중에는 theme도
// 나중에 key값 index로 주지 않기
