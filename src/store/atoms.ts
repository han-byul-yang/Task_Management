import { atom } from 'recoil'

export interface Todoform {
  [key: string]: Todo[]
}

export interface Todo {
  id: Date
  task: string
  category: string[]
  date: (Date | null)[]
  image?: string | ArrayBuffer | null
  description?: string
}

export const todosAtom = atom<Todoform>({
  key: 'todos',
  default: {
    TODO: [],
    DOING: [],
    DONE: [],
  },
})
