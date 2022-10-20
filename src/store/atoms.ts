import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { BoardTaskList } from 'types/taskType'

const { persistAtom } = recoilPersist({
  key: 'storeDatas',
  storage: localStorage,
})

export const tasksAtom = atom<BoardTaskList>({
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
