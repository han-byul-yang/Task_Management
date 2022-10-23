export interface IBoardTaskList {
  [key: string]: ITask[]
}

export interface ITask {
  id: Date
  process: string
  taskTitle: string
  category: string[]
  date: (Date | null)[]
  image: any // type 수정
  description: string
}
