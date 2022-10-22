import { Dispatch, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useRecoilValue } from 'recoil'

import { tasksAtom } from 'store/atoms'
import { ITask } from 'types/taskType'
import BoardCard from 'components/BoardCard'
import BoardSettingBox from './BoardSettingBox'

import styles from './board.module.scss'
import { HamburgerIcon, Plus2Icon } from 'assets/svgs'

interface IBoardsProps {
  process: string
  setIsAddTaskModalOpen?: Dispatch<React.SetStateAction<boolean>>
  setBoardProcessName?: Dispatch<React.SetStateAction<string>>
}

const Board = ({ process, setIsAddTaskModalOpen, setBoardProcessName }: IBoardsProps) => {
  const [isBoardSettingBoxOpen, setIsBoardSettingBoxOpen] = useState(false)
  const boardsTasks = useRecoilValue(tasksAtom)

  const handleAddTodoClick = () => {
    setBoardProcessName!(process)
    setIsAddTaskModalOpen!(true)
  }

  const handleBoardSettingClick = () => {
    setBoardProcessName!(process)
    setIsBoardSettingBoxOpen(true)
  }

  return (
    <li>
      <Droppable droppableId={`${process}`} key={`${process}`}>
        {(handleDrop) => (
          <div className={styles.boardBox} ref={handleDrop.innerRef} {...handleDrop.droppableProps}>
            <div className={styles.boardTop}>
              <div>{process}</div>
              <Plus2Icon className={styles.plus2Icon} onClick={handleAddTodoClick} />
              <HamburgerIcon className={styles.hamburgerIcon} onClick={handleBoardSettingClick} />
            </div>
            <div className={styles.cardList}>
              {isBoardSettingBoxOpen && (
                <BoardSettingBox setIsBoardSettingBoxOpen={setIsBoardSettingBoxOpen} process={process} />
              )}
              {boardsTasks[process].length === 0 ? (
                <p className={styles.noTaskMessage}>할일이 없습니다</p>
              ) : (
                <ul>
                  {boardsTasks[process].map((task: ITask, iCard) => {
                    const cardKey = `card=${iCard}`
                    return <BoardCard key={cardKey} task={task} index={iCard} />
                  })}
                </ul>
              )}
            </div>
            {handleDrop.placeholder}
          </div>
        )}
      </Droppable>
    </li>
  )
}

export default Board

// ?와 ! 삭제
// process 이름 네이밍
// setIsOpenAddModal 네이밍
