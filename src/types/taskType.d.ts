export interface IBoardTaskList {
  [key: string]: Task[]
}

export interface ITask {
  id: Date
  process: string
  task: string
  category: string[]
  date: (Date | null)[]
  image: any
  description: string
}
