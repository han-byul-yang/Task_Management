import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import { boardProcessAtom, isOpenAddBoardModalAtom, selectedBoardProcessNameAtom, tasksAtom } from 'store/atoms'

import styles from './addBoardModal.module.scss'

const AddBoardModal = () => {
  const [isOpenAddBoardModal, setIsOpenAddBoardModal] = useRecoilState(isOpenAddBoardModalAtom)
  const setBoardsTasks = useSetRecoilState(tasksAtom)
  const setBoardProcessList = useSetRecoilState(boardProcessAtom)
  const selectedBoardProcessName = useRecoilValue(selectedBoardProcessNameAtom)
  const [boardName, setBoardName] = useState(isOpenAddBoardModal.type === 'add' ? '' : selectedBoardProcessName)
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  const clickOutsideHandle = () => {
    setIsOpenAddBoardModal((prevState) => ({ ...prevState, isOpen: false }))
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

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
      tempBoardProcessList.splice(tempBoardProcessList.indexOf(selectedBoardProcessName), 1, boardName)
      return tempBoardProcessList
    })
    setBoardsTasks((prevTasks) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [selectedBoardProcessName]: prevProcessName, ...otherProcessNames } = prevTasks
      return { ...otherProcessNames, [boardName]: [...prevTasks[selectedBoardProcessName]] }
    })
    setIsOpenAddBoardModal((prevState) => ({ ...prevState, isOpen: false }))
    navigate(`/${boardName}`)
  }

  const handleCancelClick = () => {
    setIsOpenAddBoardModal((prevState) => ({ ...prevState, isOpen: false }))
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox} ref={containerRef}>
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
