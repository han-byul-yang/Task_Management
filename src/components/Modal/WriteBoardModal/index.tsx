import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import noticeMessage from 'utils/noticeMessage'
import {
  boardProcessAtom,
  isOpenWriteBoardModalAtom,
  isOpenNoticeModalAtom,
  noticeMessageAtom,
  selectedBoardProcessNameAtom,
  tasksAtom,
} from 'store/atoms'

import styles from './writeBoardModal.module.scss'

const WriteBoardModal = () => {
  const [isOpenWriteBoardModal, setIsOpenWriteBoardModal] = useRecoilState(isOpenWriteBoardModalAtom)
  const setIsOpenNoticeModal = useSetRecoilState(isOpenNoticeModalAtom)
  const setBoardsTasks = useSetRecoilState(tasksAtom)
  const [boardProcessList, setBoardProcessList] = useRecoilState(boardProcessAtom)
  const selectedBoardProcessName = useRecoilValue(selectedBoardProcessNameAtom)
  const setNoticeMessage = useSetRecoilState(noticeMessageAtom)
  const [boardName, setBoardName] = useState(isOpenWriteBoardModal.type === 'add' ? '' : selectedBoardProcessName)
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  const clickOutsideHandle = () => {
    setIsOpenWriteBoardModal((prevState) => ({ ...prevState, isOpen: false }))
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleBoardNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.currentTarget.value)
  }

  const sameBoardNameOpenMessage = () => {
    setNoticeMessage({ messageInformation: noticeMessage().board.SAME_NAME_BOARD })
    setIsOpenNoticeModal(true)
  }

  const handleAddBoardClick = () => {
    if (boardProcessList.includes(boardName)) {
      sameBoardNameOpenMessage()
    } else {
      setBoardProcessList((prevProcess) => [...prevProcess, boardName])
      setBoardsTasks((prevTasks) => ({ ...prevTasks, [boardName]: [] }))
      setIsOpenWriteBoardModal((prevState) => ({ ...prevState, isOpen: false }))
    }
  }

  const handleEditBoardClick = () => {
    if (boardProcessList.includes(boardName)) {
      sameBoardNameOpenMessage()
    } else {
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
      setIsOpenWriteBoardModal((prevState) => ({ ...prevState, isOpen: false }))
      navigate(`/${boardName}`)
    }
  }

  const handleCancelClick = () => {
    setIsOpenWriteBoardModal((prevState) => ({ ...prevState, isOpen: false }))
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox} ref={containerRef}>
        <p>
          {isOpenWriteBoardModal.type === 'add'
            ? '추가 하려는 보드 이름을 입력하세요'
            : '수정하려는 보드 이름을 입력하세요'}
        </p>
        <input type='text' value={boardName} ref={inputRef} onChange={handleBoardNameChange} />
        <div className={styles.buttonBox}>
          {isOpenWriteBoardModal.type === 'add' ? (
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

export default WriteBoardModal
