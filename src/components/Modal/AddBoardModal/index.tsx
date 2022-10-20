import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { boardProcessAtom, isOpenAddBoardModalAtom, tasksAtom } from 'store/atoms'

import styles from './addBoardModal.module.scss'

const AddBoardModal = () => {
  const [addBoardName, setAddBoardName] = useState('')
  const setBoardProcessList = useSetRecoilState(boardProcessAtom)
  const setBoardsTasks = useSetRecoilState(tasksAtom)
  const setIsOpenAddBoardModal = useSetRecoilState(isOpenAddBoardModalAtom)
  const inputRef = useRef(null)

  /* useEffect(() => {
    if (inputRef && inputRef.current) inputRef.current.focus()
  }, []) */

  const handleAddBoardNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddBoardName(e.currentTarget.value)
  }

  const handleAddBoardClick = () => {
    setBoardProcessList((prevProcess) => [...prevProcess, addBoardName])
    setBoardsTasks((prevTasks) => ({ ...prevTasks, addBoardName: [] }))
    setIsOpenAddBoardModal(false)
  }

  const handleCancelClick = () => {
    setIsOpenAddBoardModal(false)
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox}>
        <p>추가 하려는 보드 이름을 입력하세요</p>
        <input type='text' value={addBoardName} ref={inputRef} onChange={handleAddBoardNameChange} />
        <div className={styles.buttonBox}>
          <button type='button' onClick={handleAddBoardClick}>
            추가
          </button>
          <button type='button' onClick={handleCancelClick}>
            취소
          </button>
        </div>
      </div>
    </>
  )
}

export default AddBoardModal
