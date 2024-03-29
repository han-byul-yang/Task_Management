export interface IBoardTaskList {
  [key: string]: ITask[]
}

export interface ITask {
  id: Date
  process: string
  taskTitle: string
  categoryList: string[]
  date: { startDate: Date | null; endDate: Date | null }
  image: { name: string; url: string | ArrayBuffer | null | undefined }
  description: string
}
