import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { moveCardToDifferentBoard } from 'utils/moveCard'
import useClickOutside from 'hooks/useClickOutside'
import { boardProcessAtom, selectedBoardProcessNameAtom, tasksAtom } from 'store/atoms'

import { XIcon } from 'assets/svgs'
import styles from './moveCardModal.module.scss'

interface IMoveCardModal {
  cardIndex: number
  setIsOpenMoveCardModal: Dispatch<SetStateAction<boolean>>
}

const MoveCardModal = ({ cardIndex, setIsOpenMoveCardModal }: IMoveCardModal) => {
  const boardProcessList = useRecoilValue(boardProcessAtom)
  const setBoardsTasks = useSetRecoilState(tasksAtom)
  const selectedBoardProcessName = useRecoilValue(selectedBoardProcessNameAtom)
  const containerRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsOpenMoveCardModal(false)
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleMoveCardClick = (process: string) => {
    setBoardsTasks((allTaskBoards) =>
      moveCardToDifferentBoard(allTaskBoards, selectedBoardProcessName, cardIndex, process, 0)
    )
    setIsOpenMoveCardModal(false)
  }

  const handleCloseModalClick = () => {
    setIsOpenMoveCardModal(false)
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox} ref={containerRef}>
        <XIcon className={styles.xIcon} onClick={handleCloseModalClick} />
        <p>카드를 옮길 보드를 선택하세요.</p>
        <ul>
          {boardProcessList.map((process) => {
            const boardKey = `board-${process}`
            return (
              <li key={boardKey}>
                <button type='button' onClick={() => handleMoveCardClick(process)}>
                  {process}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default MoveCardModal
