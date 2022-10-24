import { Dispatch, SetStateAction, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { filteringAtom, filterTasksAtom, isOpenAddTaskModalAtom, tasksAtom } from 'store/atoms'
import { ITask } from 'types/taskType'
import BoardCard from 'components/BoardCard'
import BoardSettingBox from './BoardSettingBox'

import styles from './board.module.scss'
import { HamburgerIcon, Plus2Icon } from 'assets/svgs'

interface IBoardsProps {
  process: string
  setBoardProcessName: Dispatch<SetStateAction<string>>
}

const Board = ({ process, setBoardProcessName }: IBoardsProps) => {
  const [isBoardSettingBoxOpen, setIsBoardSettingBoxOpen] = useState(false)
  const boardsTasks = useRecoilValue(tasksAtom)
  const filterTasks = useRecoilValue(filterTasksAtom)
  const filtering = useRecoilValue(filteringAtom)
  const setIsAddTaskModalOpen = useSetRecoilState(isOpenAddTaskModalAtom)

  const handleAddTodoClick = () => {
    setBoardProcessName(process)
    setIsAddTaskModalOpen({ type: 'add', isOpen: true })
  }

  const handleBoardSettingClick = () => {
    setBoardProcessName(process)
    setIsBoardSettingBoxOpen(true)
  }

  const processTasks = filtering.filter ? filterTasks[process] : boardsTasks[process]

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
              {processTasks?.length === 0 ? (
                <p className={styles.noTaskMessage}>할일이 없습니다</p>
              ) : (
                <ul>
                  {processTasks?.map((cardTask: ITask, iCard) => {
                    const cardKey = `card=${iCard}`
                    return (
                      <BoardCard
                        key={cardKey}
                        cardTask={cardTask}
                        index={iCard}
                        setBoardProcessName={setBoardProcessName}
                      />
                    )
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
// setBoardProcessName props drilling 2번 이상
