import { ITask } from 'types/taskType'

export const highlightWords = (searchKey: string, todo: ITask) => {
  const { taskTitle, category } = todo

  let highlightCategory
  let exp = new RegExp(searchKey, 'gi')

  const highlightTask = taskTitle.replace(exp, `<mark>${searchKey}</mark>`)

  if (searchKey.includes('#')) {
    exp = new RegExp(searchKey.substring(1), 'gi')
    highlightCategory = category.map((item) => {
      return item.replace(exp, `<mark>${searchKey.substring(1)}</mark>`)
    })
  } else {
    highlightCategory = category.map((item) => {
      return item.replace(exp, `<mark>${searchKey}</mark>`)
    })
  }

  return {
    highlightTask,
    highlightCategory,
  }
}
