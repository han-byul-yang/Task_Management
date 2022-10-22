import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import noticeMessage from 'utils/noticeMessage'
import {
  boardProcessAtom,
  isOpenAddBoardModalAtom,
  isOpenNoticeModalAtom,
  noticeMessageAtom,
  tasksAtom,
} from 'store/atoms'

import styles from './boardSettingBox.module.scss'

interface IMenuBoxProps {
  setIsBoardSettingBoxOpen: Dispatch<SetStateAction<boolean>>
  process: string
}

const BoardSettingBox = ({ setIsBoardSettingBoxOpen, process: boardProcessName }: IMenuBoxProps) => {
  const setIsOpenAddBoardModal = useSetRecoilState(isOpenAddBoardModalAtom)
  const setIsOpenNoticeModal = useSetRecoilState(isOpenNoticeModalAtom)
  const setOpenMessageModal = useSetRecoilState(isOpenNoticeModalAtom)
  const setNoticeMessage = useSetRecoilState(noticeMessageAtom)
  const setBoardsTasks = useSetRecoilState(tasksAtom)
  const setBoardProcessList = useSetRecoilState(boardProcessAtom)
  const containerRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsBoardSettingBoxOpen(false)
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleEditBoardNameClick = () => {
    setIsOpenAddBoardModal({ type: 'edit', isOpen: true })
  }

  const noticeMessageOkButtonHandle = () => {
    setOpenMessageModal(false)
    setBoardProcessList((prevProcess) => prevProcess.filter((process) => process !== boardProcessName))
    setBoardsTasks((prevTasks) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [boardProcessName]: prevProcessName, ...otherProcessNames } = prevTasks
      return { ...otherProcessNames }
    })
  }

  const handleDeleteBoardClick = () => {
    setNoticeMessage({ message: noticeMessage().board.WILL_DELETE, noticeMessageOkButtonHandle })
    setIsOpenNoticeModal(true)
  }

  return (
    <div className={styles.menuBox} ref={containerRef}>
      <button type='button' onClick={handleEditBoardNameClick}>
        보드 수정
      </button>
      <button type='button' onClick={handleDeleteBoardClick}>
        보드 삭제
      </button>
    </div>
  )
}

export default BoardSettingBox
