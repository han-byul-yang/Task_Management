import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import { isOpenAddTaskModalAtom, isOpenNoticeModalAtom, noticeMessageAtom, taskAtom, tasksAtom } from 'store/atoms'
import { ITask } from 'types/taskType'
import noticeMessage from 'utils/noticeMessage'

import styles from './cardSettingBox.module.scss'

interface ICardSettingBoxProps {
  setIsCardSettingBoxOpen: Dispatch<SetStateAction<boolean>>
  cardTask: ITask
}

const CardSettingBox = ({ setIsCardSettingBoxOpen, cardTask }: ICardSettingBoxProps) => {
  const setIsOpenAddTaskModal = useSetRecoilState(isOpenAddTaskModalAtom)
  const [boardsTasks, setboardsTasks] = useRecoilState(tasksAtom)
  const setTask = useSetRecoilState(taskAtom)
  const setIsOpenNoticeModal = useSetRecoilState(isOpenNoticeModalAtom)
  const setNoticeMessage = useSetRecoilState(noticeMessageAtom)
  const containerRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsCardSettingBoxOpen(false)
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleEditClick = () => {
    setIsOpenAddTaskModal({ type: 'edit', isOpen: true })
    setTask(cardTask)
  }

  const noticeMessageOkButtonHandle = () => {
    const deletedTaskList = boardsTasks[cardTask.process].filter((task) => task.id !== cardTask.id)
    setboardsTasks((prevState) => {
      return {
        ...prevState,
        [cardTask.process]: [...deletedTaskList],
      }
    })
    setIsOpenNoticeModal(false)
  }

  const handleDeleteClick = () => {
    setNoticeMessage({ message: noticeMessage().card.WILL_DELETE, noticeMessageOkButtonHandle })
    setIsOpenNoticeModal(true)
  }

  return (
    <div className={styles.settingBox} ref={containerRef}>
      <button type='button' onClick={handleEditClick}>
        카드 수정
      </button>
      <button type='button' onClick={handleDeleteClick}>
        카드 삭제
      </button>
    </div>
  )
}

export default CardSettingBox
