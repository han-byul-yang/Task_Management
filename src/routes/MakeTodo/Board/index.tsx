import { Droppable } from 'react-beautiful-dnd'
import { useRecoilValue } from 'recoil'

import { tasksAtom, Todo } from 'store/atoms'
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
          <div className={styles.processBox} ref={handleDrop.innerRef} {...handleDrop.droppableProps}>
            <div className={styles.processTop}>
              <div>{process}</div>
              <button type='button' onClick={() => handleAddTodoClick(process)}>
                +
              </button>
            </div>
            {/* {boardsTasks[process].length === 0 ? (
              <div className={styles.noTaskMessage}>할일이 없습니다</div>
            ) : (
              boardsTasks[process].map((todo: Todo, index) => {
                const key = index
                return <BoardCard key={`todo-${key}`} todo={todo} index={index} />
              })
            )} */}
            {handleDrop.placeholder}
          </div>
        )}
      </Droppable>
    </li>
  )
}

export default Board
