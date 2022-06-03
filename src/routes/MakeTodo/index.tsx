import { useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'

import { processAtom, Todo, todosAtom } from 'store/atoms'
import Modal from 'components/Modal'
import ModalPortal from 'components/Modal/ModalPortal'
import BoardCard from 'components/BoardCard'
import SearchInput from './SearchInput'

import styles from './makeTodo.module.scss'
import { AddIcon, MinusIcon } from 'assets/svgs'

const MakeTodo = () => {
  const [processName, setProcessName] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [todoList, setTodoList] = useRecoilState(todosAtom)
  const [processList, setProcessList] = useRecoilState(processAtom)

  const handleAddTodoClick = (process: string) => {
    setProcessName(process)
    setOpenModal(true)
  }

  const handleAddProcess = () => {
    setProcessList((prevProcess) => [...prevProcess, 'go'])
    setTodoList((prevTodoList) => {
      return { ...prevTodoList, go: [] }
    })
  }

  const handleDeleteProcess = () => {
    const copyProcessList = [...processList]
    copyProcessList.splice(processList.length - 1, 1)
    setProcessList(copyProcessList)
    const { go, ...todoProcess } = todoList
    setTodoList(todoProcess)
  }

  return (
    <div className={styles.page}>
      <SearchInput />
      <main className={styles.boards}>
        {processList.map((process) => {
          return (
            <div key={`process-${process}`} className={styles.processBox}>
              <div className={styles.processTop}>
                <div>{process}</div>
                <button type='button' onClick={() => handleAddTodoClick(process)}>
                  +
                </button>
              </div>
              {todoList[process].map((todo: Todo) => {
                return <BoardCard key={`todo-${todo}`} todo={todo} />
              })}
            </div>
          )
        })}
      </main>
      {processList.length <= 3 ? <AddIcon onClick={handleAddProcess} /> : <MinusIcon onClick={handleDeleteProcess} />}
      {openModal && (
        <ModalPortal>
          <Modal processName={processName} setOpenModal={setOpenModal} />
        </ModalPortal>
      )}
    </div>
  )
}

export default MakeTodo
