import { Droppable } from 'react-beautiful-dnd'
import { useRecoilValue } from 'recoil'

import { todosAtom, Todo } from 'store/atoms'
import BoardCard from 'components/BoardCard'

import styles from '../makeTodo.module.scss'

interface IBoardsProps {
  process: string
  handleAddTodoClick: Function
}

const Boards = ({ process, handleAddTodoClick }: IBoardsProps) => {
  const todoList = useRecoilValue(todosAtom)

  return (
    <Droppable droppableId={`drop-${process}`} key={`drop-${process}`}>
      {(handleDrop) => (
        <div className={styles.processBox} ref={handleDrop.innerRef} {...handleDrop.droppableProps}>
          <div className={styles.processTop}>
            <div>{process}</div>
            <button type='button' onClick={() => handleAddTodoClick(process)}>
              +
            </button>
          </div>
          {todoList[process].length === 0 ? (
            <div className={styles.noTaskMessage}>할일이 없습니다</div>
          ) : (
            todoList[process].map((todo: Todo, index) => {
              const key = index
              return <BoardCard key={`todo-${key}`} todo={todo} index={index} />
            })
          )}
          {handleDrop.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Boards
