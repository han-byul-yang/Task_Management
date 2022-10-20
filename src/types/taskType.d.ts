export interface BoardTaskList {
  [key: string]: Task[]
}

export interface Task {
  id: Date
  process: string
  task: string
  category: string[]
  date: (Date | null)[]
  image: any
  description: string
}
