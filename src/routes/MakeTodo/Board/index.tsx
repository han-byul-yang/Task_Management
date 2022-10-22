import { Dispatch } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useRecoilValue } from 'recoil'

import { tasksAtom } from 'store/atoms'
import { Task } from 'types/taskType'
import BoardCard from 'components/BoardCard'

import styles from './board.module.scss'
import { HamburgerIcon, Plus2Icon } from 'assets/svgs'

interface IBoardsProps {
  process: string
  setIsAddTaskModalOpen?: Dispatch<React.SetStateAction<boolean>>
  setAddTaskProcessName?: Dispatch<React.SetStateAction<string>>
}

const Board = ({ process, setIsAddTaskModalOpen, setAddTaskProcessName }: IBoardsProps) => {
  const boardsTasks = useRecoilValue(tasksAtom)

  const handleAddTodoClick = () => {
    setAddTaskProcessName!(process)
    setIsAddTaskModalOpen!(true)
  }

  return (
    <li>
      <Droppable droppableId={`${process}`} key={`${process}`}>
        {(handleDrop) => (
          <div className={styles.boardBox} ref={handleDrop.innerRef} {...handleDrop.droppableProps}>
            <div className={styles.boardTop}>
              <div>{process}</div>
              <Plus2Icon className={styles.plus2Icon} onClick={handleAddTodoClick} />
              <HamburgerIcon className={styles.hamburgerIcon} />
            </div>
            {boardsTasks[process].length === 0 ? (
              <p className={styles.noTaskMessage}>할일이 없습니다</p>
            ) : (
              <ul>
                {boardsTasks[process].map((task: Task, iCard) => {
                  const cardKey = `card=${iCard}`
                  return <BoardCard key={cardKey} task={task} index={iCard} />
                })}
              </ul>
            )}
            {handleDrop.placeholder}
          </div>
        )}
      </Droppable>
    </li>
  )
}

export default Board
