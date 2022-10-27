import { Dispatch, SetStateAction } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { boardProcessAtom, selectedBoardProcessNameAtom, tasksAtom } from 'store/atoms'

import styles from './moveCardModal.module.scss'

interface IMoveCardModal {
  cardIndex: number
  setIsOpenMoveCardModal: Dispatch<SetStateAction<boolean>>
}

const MoveCardModal = ({ cardIndex, setIsOpenMoveCardModal }: IMoveCardModal) => {
  const boardProcessList = useRecoilValue(boardProcessAtom)
  const setBoardsTasks = useSetRecoilState(tasksAtom)
  const selectedBoardProcessName = useRecoilValue(selectedBoardProcessNameAtom)

  const handleMoveCardClick = (process: string) => {
    setBoardsTasks((allTaskBoards) => {
      const sourceTaskList = [...allTaskBoards[selectedBoardProcessName]]
      const sourceTask = sourceTaskList[cardIndex]
      const changeTaskInformation = { ...sourceTask, process }
      const destinationTaskList = [...allTaskBoards[process]]
      sourceTaskList.splice(cardIndex, 1)
      destinationTaskList.splice(0, 0, changeTaskInformation)
      return {
        ...allTaskBoards,
        [selectedBoardProcessName]: sourceTaskList,
        [process]: destinationTaskList,
      }
    })
    setIsOpenMoveCardModal(false)
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox}>
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
