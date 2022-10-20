import { Task } from 'types/taskType'

export const highlightWords = (searchKey: string, todo: Task) => {
  const { task, category } = todo

  let highlightCategory
  let exp = new RegExp(searchKey, 'gi')

  const highlightTask = task.replace(exp, `<mark>${searchKey}</mark>`)

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
