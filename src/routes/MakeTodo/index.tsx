import { useState } from 'react'

import Modal from 'components/Modal'
import NavBar from 'components/NavBar'

import styles from './makeTodo.module.scss'
import ModalPortal from 'components/Modal/ModalPortal'

const MakeTodo = () => {
  const [processName, setProcessName] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const processList = ['TODO', 'DOING', 'DONE']

  const handleAddTodoClick = (process: string) => {
    setProcessName(process)
    setOpenModal(true)
  }

  const handleOpenModal = () => {
    setOpenModal(false)
  }

  return (
    <div className={styles.container}>
      <NavBar />
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
            </div>
          )
        })}
      </main>
      {openModal && (
        <ModalPortal>
          <Modal processName={processName} handleOpenModal={handleOpenModal} />
        </ModalPortal>
      )}
    </div>
  )
}

export default MakeTodo
