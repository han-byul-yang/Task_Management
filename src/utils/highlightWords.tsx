import { ITask } from 'types/taskType'

export const highlightWords = (keyInput: string, cardTask: ITask) => {
  const { taskTitle, categoryList, description } = cardTask

  const exp = new RegExp(keyInput, 'gi')

  const highlightTitle = taskTitle.replace(exp, `<mark>${keyInput}</mark>`)

  const highlightCategory = categoryList.map((item) => {
    return item.replace(exp, `<mark>${keyInput}</mark>`)
  })

  const highlightDescription = description.replace(exp, `<mark>${keyInput}</mark>`)

  return {
    highlightTitle,
    highlightCategory,
    highlightDescription,
  }
}
