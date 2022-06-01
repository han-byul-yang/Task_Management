import { atom } from 'recoil'

export interface Todoform {
  [key: string]: Todo[]
}

export interface Todo {
  id: number
  task: string
  category: string[]
  date?: (Date | null)[]
  image?: string
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
