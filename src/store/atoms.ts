import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'storeDatas',
  storage: localStorage,
})

export interface Todoform {
  [key: string]: Todo[]
}

export interface Todo {
  id: Date
  process: string
  task: string
  category: string[]
  date: (Date | null)[]
  image: any
  description: string
}

export const tasksAtom = atom<Todoform>({
  key: 'tasks',
  default: {
    TODO: [],
    DOING: [],
    DONE: [],
  },
  // effects_UNSTABLE: [persistAtom],
})

export const searchKeyAtom = atom<string>({
  key: 'searchKey',
  default: '',
})

export const boardProcessAtom = atom<string[]>({
  key: 'boardProcessKey',
  default: ['TODO', 'DOING', 'DONE'],
  // effects_UNSTABLE: [persistAtom],
})

export const isOpenAddBoardModalAtom = atom({
  key: 'isOpenAddBoardModal',
  default: false,
})

/* export const isOpenAddTaskModalAtom = atom({
  key: 'isOpenAddTaskModal',
  default: false,
}) */
