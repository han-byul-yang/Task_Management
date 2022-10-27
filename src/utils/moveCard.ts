import { IBoardTaskList } from 'types/taskType'

export const moveCardInSameBoard = (
  allTaskBoards: IBoardTaskList,
  sourceBoard: string,
  sourceIndex: number,
  destinationIndex: number
) => {
  const sourceTaskList = [...allTaskBoards[sourceBoard]]
  const sourceTask = sourceTaskList[sourceIndex]
  sourceTaskList.splice(sourceIndex, 1)
  sourceTaskList.splice(destinationIndex, 0, sourceTask)
  return {
    ...allTaskBoards,
    [sourceBoard]: sourceTaskList,
  }
}

export const moveCardToDifferentBoard = (
  allTaskBoards: IBoardTaskList,
  sourceBoard: string,
  sourceIndex: number,
  destinationBoard: string,
  destinationIndex: number
) => {
  const sourceTaskList = [...allTaskBoards[sourceBoard]]
  const sourceTask = sourceTaskList[sourceIndex]
  const changeTaskInformation = { ...sourceTask, process: destinationBoard }
  const destinationTaskList = [...allTaskBoards[destinationBoard]]
  sourceTaskList.splice(sourceIndex, 1)
  destinationTaskList.splice(destinationIndex, 0, changeTaskInformation)
  return {
    ...allTaskBoards,
    [sourceBoard]: sourceTaskList,
    [destinationBoard]: destinationTaskList,
  }
}
