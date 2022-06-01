import Modal from 'components/Modal'
import NavBar from 'components/NavBar'

import styles from './makeTodo.module.scss'

const MakeTodo = () => {
  const processList = ['TODO', 'DOING', 'DONE']

  return (
    <div className={styles.container}>
      <NavBar />
      <Modal />
      <main className={styles.boards}>
        {processList.map((process) => {
          return (
            <div key='process-process' className={styles.processBox}>
              <div className={styles.processTop}>
                <div>{process}</div>
                <div>+</div>
              </div>
            </div>
          )
        })}
      </main>
    </div>
  )
}

export default MakeTodo
