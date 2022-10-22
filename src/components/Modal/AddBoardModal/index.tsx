import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { boardProcessAtom, isOpenAddBoardModalAtom, tasksAtom } from 'store/atoms'

import styles from './addBoardModal.module.scss'

interface IAddBoardModalProps {
  boardProcessName: string
}

const AddBoardModal = ({ boardProcessName }: IAddBoardModalProps) => {
  const [isOpenAddBoardModal, setIsOpenAddBoardModal] = useRecoilState(isOpenAddBoardModalAtom)
  const setBoardsTasks = useSetRecoilState(tasksAtom)
  const setBoardProcessList = useSetRecoilState(boardProcessAtom)
  const [boardName, setBoardName] = useState(isOpenAddBoardModal.type === 'add' ? '' : boardProcessName)
  const inputRef = useRef(null)

  /* useEffect(() => {
    if (inputRef && inputRef.current) inputRef.current.focus()
  }, []) */

  const handleBoardNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.currentTarget.value)
  }

  const handleAddBoardClick = () => {
    setBoardProcessList((prevProcess) => [...prevProcess, boardName])
    setBoardsTasks((prevTasks) => ({ ...prevTasks, [boardName]: [] }))
    setIsOpenAddBoardModal((prevState) => ({ ...prevState, isOpen: false }))
  }

  const handleEditBoardClick = () => {
    setBoardProcessList((prevProcess) => {
      const tempBoardProcessList = [...prevProcess]
      tempBoardProcessList.splice(tempBoardProcessList.indexOf(boardProcessName), 1, boardName)
      return tempBoardProcessList
    })
    setBoardsTasks((prevTasks) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [boardProcessName]: prevProcessName, ...otherProcessNames } = prevTasks
      return { ...otherProcessNames, [boardName]: [...prevTasks[boardProcessName]] }
    })
    setIsOpenAddBoardModal((prevState) => ({ ...prevState, isOpen: false }))
  }

  const handleCancelClick = () => {
    setIsOpenAddBoardModal((prevState) => ({ ...prevState, isOpen: false }))
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox}>
        <p>
          {isOpenAddBoardModal.type === 'add'
            ? '추가 하려는 보드 이름을 입력하세요'
            : '수정하려는 보드 이름을 입력하세요'}
        </p>
        <input type='text' value={boardName} ref={inputRef} onChange={handleBoardNameChange} />
        <div className={styles.buttonBox}>
          {isOpenAddBoardModal.type === 'add' ? (
            <button type='button' onClick={handleAddBoardClick}>
              추가
            </button>
          ) : (
            <button type='button' onClick={handleEditBoardClick}>
              수정
            </button>
          )}
          <button type='button' onClick={handleCancelClick}>
            취소
          </button>
        </div>
      </div>
    </>
  )
}

export default AddBoardModal
