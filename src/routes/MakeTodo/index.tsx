import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { Todo, todosAtom } from 'store/atoms'
import Modal from 'components/Modal'
import ModalPortal from 'components/Modal/ModalPortal'
import BoardCard from 'components/BoardCard'
import SearchInput from './SearchInput'

import styles from './makeTodo.module.scss'

const MakeTodo = () => {
  const [processName, setProcessName] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const todoList = useRecoilValue(todosAtom)

  const processList = ['TODO', 'DOING', 'DONE']

  const handleAddTodoClick = (process: string) => {
    setProcessName(process)
    setOpenModal(true)
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
      {openModal && (
        <ModalPortal>
          <Modal processName={processName} setOpenModal={setOpenModal} />
        </ModalPortal>
      )}
    </div>
  )
}

export default MakeTodo
