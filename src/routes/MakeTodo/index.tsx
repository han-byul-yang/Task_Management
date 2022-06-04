import { ChangeEvent, FormEvent, useState } from 'react'
import { useRecoilState } from 'recoil'

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
  const [createProcess, setCreateProcess] = useState(false)
  const [addProcessValue, setAddProcessValue] = useState('')

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

    const { DOGS, ...todoProcess } = todoList
    setTodoList(todoProcess)

    setCreateProcess(false)
    setAddProcessValue('')
  }

  const handleProcessInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddProcessValue(e.currentTarget.value)
  }

  const createAddProcess = () => {
    if (createProcess)
      return (
        <form onSubmit={handleAddProcessSubmit}>
          <input type='text' value={addProcessValue} onChange={handleProcessInputChange} />
        </form>
      )
    return <AddIcon className={styles.addIcon} onClick={handleAddBtnClick} />
  }

  return (
    <div className={styles.page}>
      <SearchInput />
      <main className={styles.main}>
        <div className={styles.boards}>
          {processList.map((process) => {
            return (
              <div key={`process-${process}`} className={styles.processBox}>
                <div className={styles.processTop}>
                  <div>{process}</div>
                  <button type='button' onClick={() => handleAddTodoClick(process)}>
                    +
                  </button>
                </div>
                {todoList[process].length === 0 ? (
                  <div className={styles.noTaskMessage}>할일이 없습니다</div>
                ) : (
                  todoList[process].map((todo: Todo, index) => {
                    const key = index
                    return <BoardCard key={`todo-${key}`} todo={todo} />
                  })
                )}
              </div>
            )
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
