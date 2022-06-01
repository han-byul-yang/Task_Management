import { useState } from 'react'

import Modal from 'components/Modal'
import NavBar from 'components/NavBar'

import styles from './makeTodo.module.scss'

const MakeTodo = () => {
  const processList = ['TODO', 'DOING', 'DONE']
  const [processName, setProcessName] = useState('')

  const handleAddProcessClick = (process: string) => {
    setProcessName(process)
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
                <button type='button' onClick={() => handleAddProcessClick(process)}>
                  +
                </button>
              </div>
            </div>
          )
        })}
      </main>
      <Modal processName={processName} />
    </div>
  )
}

export default MakeTodo
