import { Droppable } from 'react-beautiful-dnd'
import { useRecoilValue } from 'recoil'

import { tasksAtom } from 'store/atoms'
import { Task } from 'types/taskType'
import BoardCard from 'components/BoardCard'

import styles from './board.module.scss'

interface IBoardsProps {
  process: string
  handleAddTodoClick: Function // type 재설정
}

const Board = ({ process, handleAddTodoClick }: IBoardsProps) => {
  const boardsTasks = useRecoilValue(tasksAtom)

  return (
    <li>
      <Droppable droppableId={`${process}`} key={`${process}`}>
        {(handleDrop) => (
          <div className={styles.boardBox} ref={handleDrop.innerRef} {...handleDrop.droppableProps}>
            <div className={styles.boardTop}>
              <div>{process}</div>
              <button type='button' onClick={() => handleAddTodoClick(process)}>
                +
              </button>
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
