import { atom } from 'recoil'

export interface Todoform {
  [key: string]: Todo[]
}

export interface Todo {
  id: Date
  task: string
  category: string[]
  date: [Date, null]
  image?: string | ArrayBuffer | null
  description: string
}

export const todosAtom = atom<Todoform>({
  key: 'todos',
  default: {
    TODO: [],
    DOING: [],
    DONE: [],
  },
})

export const searchKeyAtom = atom<string>({
  key: 'searchKey',
  default: '',
})

/* export const todoEditAtom = atom<Todo>({
  key: 'todo',
  default: {
    id: new Date(),
    task: '',
    category: [],
    date: [new Date(), null],
    image: null,
    description: '',
  },
})
*/
