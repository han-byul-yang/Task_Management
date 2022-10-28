import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import useResize from 'hooks/useResize'
import noticeMessage from 'utils/noticeMessage'
import {
  boardProcessAtom,
  isOpenAddBoardModalAtom,
  isOpenAddTaskModalAtom,
  isOpenNoticeModalAtom,
  noticeMessageAtom,
  selectedBoardProcessNameAtom,
  tasksAtom,
} from 'store/atoms'

import styles from './boardSettingBox.module.scss'

interface IMenuBoxProps {
  setIsBoardSettingBoxOpen: Dispatch<SetStateAction<boolean>>
}

const BoardSettingBox = ({ setIsBoardSettingBoxOpen }: IMenuBoxProps) => {
  const setIsOpenAddBoardModal = useSetRecoilState(isOpenAddBoardModalAtom)
  const setIsOpenNoticeModal = useSetRecoilState(isOpenNoticeModalAtom)
  const setIsAddTaskModalOpen = useSetRecoilState(isOpenAddTaskModalAtom)
  const [selectedBoardProcessName, setSelectedBoardProcessName] = useRecoilState(selectedBoardProcessNameAtom)
  const setNoticeMessage = useSetRecoilState(noticeMessageAtom)
  const setBoardsTasks = useSetRecoilState(tasksAtom)
  const setBoardProcessList = useSetRecoilState(boardProcessAtom)
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const { size, isSize: isTablet } = useResize()

  const clickOutsideHandle = () => {
    setIsBoardSettingBoxOpen(false)
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  useEffect(() => {
    size.TABLET.RESIZE()
    size.TABLET.SIZEEVENT()
  }, [size.TABLET])

  const handleAddTodoClick = () => {
    setSelectedBoardProcessName(selectedBoardProcessName)
    setIsAddTaskModalOpen({ type: 'add', isOpen: true })
  }

  const handleOpenAddBoardModalClick = () => {
    setIsOpenAddBoardModal({ type: 'add', isOpen: true })
  }

  const handleEditBoardNameClick = () => {
    setIsOpenAddBoardModal({ type: 'edit', isOpen: true })
  }

  const noticeMessageOkButtonHandle = () => {
    setIsOpenNoticeModal(false)
    setBoardProcessList((prevProcess) => prevProcess.filter((process) => process !== selectedBoardProcessName))
    setBoardsTasks((prevTasks) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [selectedBoardProcessName]: prevProcessName, ...otherProcessNames } = prevTasks
      return { ...otherProcessNames }
    })
    if (isTablet) navigate('/')
  }

  const handleDeleteBoardClick = () => {
    setNoticeMessage({ messageInformation: noticeMessage().board.WILL_DELETE, noticeMessageOkButtonHandle })
    setIsOpenNoticeModal(true)
  }

  return (
    <div className={styles.settingBox} ref={containerRef}>
      {isTablet && (
        <>
          <button type='button' onClick={handleAddTodoClick}>
            카드 추가
          </button>
          <button type='button' onClick={handleOpenAddBoardModalClick}>
            보드 생성
          </button>
        </>
      )}
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
