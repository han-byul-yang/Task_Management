import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'storeDatas',
  storage: sessionStorage,
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
  effects_UNSTABLE: [persistAtom],
})

export const titleAtom = atom<string>({
  key: 'taskTitle',
  default: '',
})

export const categoryAtom = atom<string[]>({
  key: 'taskCategory',
  default: [],
})

export const dateAtom = atom<[Date, null]>({
  key: 'taskDate',
  default: [new Date(), null],
})

export const imageAtom = atom<string | ArrayBuffer | null | undefined>({
  key: 'taskImage',
  default: '',
})

export const descriptionAtom = atom<string>({
  key: 'taskDescription',
  default: '',
})

export const searchKeyAtom = atom<string>({
  key: 'searchKey',
  default: '',
})

export const processAtom = atom<string[]>({
  key: 'processKey',
  default: ['TODO', 'DOING', 'DONE'],
  effects_UNSTABLE: [persistAtom],
})
