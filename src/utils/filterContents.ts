import { IBoardTaskList } from 'types/taskType'

const filterContents = (filterType: string, filterKeyword: string, filterTarget: IBoardTaskList) => {
  const filteredTasksObject: IBoardTaskList = {}

  const taskType = {
    제목: 'taskTitle',
    카테고리: 'categoryList',
    내용: 'description',
  }[filterType]

  if (filterType) {
    Object.keys(filterTarget).forEach((key: string) => {
      filteredTasksObject[key] = filterTarget[key].filter((task: any) =>
        task[taskType!].includes(filterKeyword.substring(filterType.length + 2))
      )
    })
  }

  if (!filterType) {
    Object.keys(filterTarget).forEach((key: string) => {
      filteredTasksObject[key] = filterTarget[key].filter(
        (task) =>
          task.taskTitle.includes(filterKeyword) ||
          task.categoryList.includes(filterKeyword) ||
          task.description.includes(filterKeyword)
      )
    })
  }

  return filteredTasksObject
}

export default filterContents
