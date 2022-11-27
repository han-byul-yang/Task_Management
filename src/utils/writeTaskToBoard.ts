import { IBoardTaskList, ITask } from 'types/taskType'

export const addTaskToBoard = (task: ITask, selectedBoardProcessName: string) => {
  const addBoardTaskList = (prevTasks: IBoardTaskList) => ({
    ...prevTasks,
    [selectedBoardProcessName]: [
      ...prevTasks[selectedBoardProcessName],
      { ...task, id: new Date(), process: selectedBoardProcessName },
    ],
  })

  return addBoardTaskList
}

export const editTaskToBoard = (task: ITask, selectedBoardProcessName: string) => {
  const editBoardTaskList = (prevTasks: IBoardTaskList) => {
    const tempPrevTasks = [...prevTasks[selectedBoardProcessName]]
    const taskIdList = tempPrevTasks.map((prevTask) => prevTask.id)
    tempPrevTasks.splice(taskIdList.indexOf(task.id), 1, task)
    return {
      ...prevTasks,
      [selectedBoardProcessName]: tempPrevTasks,
    }
  }

  return editBoardTaskList
}
