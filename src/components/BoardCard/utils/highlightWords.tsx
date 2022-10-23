import { ITask } from 'types/taskType'

export const highlightWords = (searchKey: string, todo: ITask) => {
  // const { taskTitle, categoryList } = todo
  const categoryList = ['']

  let highlightCategory
  let exp = new RegExp(searchKey, 'gi')

  // const highlightTask = taskTitle.replace(exp, `<mark>${searchKey}</mark>`)
  const highlightTask = `<mark>${''}</mark>`

  if (searchKey.includes('#')) {
    exp = new RegExp(searchKey.substring(1), 'gi')
    highlightCategory = categoryList.map((item) => {
      return item.replace(exp, `<mark>${searchKey.substring(1)}</mark>`)
    })
  } else {
    highlightCategory = categoryList.map((item) => {
      return item.replace(exp, `<mark>${searchKey}</mark>`)
    })
  }

  return {
    highlightTask,
    highlightCategory,
  }
}
