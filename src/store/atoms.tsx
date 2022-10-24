import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { IBoardTaskList, ITask } from 'types/taskType'
import Board from 'routes/MakeTodo/Board'
import { INoticeMessage } from 'types/noticeMessageType'

const { persistAtom } = recoilPersist({
  key: 'storeDatas',
  storage: localStorage,
})

export const tasksAtom = atom<IBoardTaskList>({
  key: 'tasks',
  default: {
    TODO: [],
    DOING: [],
    DONE: [],
  },
  effects_UNSTABLE: [persistAtom],
})

export const filterTasksAtom = atom<IBoardTaskList>({
  key: 'filterTasks',
  default: {
    TODO: [],
    DOING: [],
    DONE: [],
  },
})

export const filteringAtom = atom({
  key: 'filtering',
  default: {
    type: '',
    filter: false,
  },
}) // type type 설정

export const taskAtom = atom<ITask>({
  key: 'task',
  default: {
    id: new Date(),
    process: '',
    taskTitle: '',
    categoryList: [],
    date: { startDate: new Date(), endDate: null },
    image: { name: '', url: '' }, // type 수정
    description: '',
  },
})

export const keyInputAtom = atom<string>({
  key: 'keyInput',
  default: '',
})

export const boardProcessAtom = atom<string[]>({
  key: 'boardProcessKey',
  default: ['TODO', 'DOING', 'DONE'],
  effects_UNSTABLE: [persistAtom],
})

export const isOpenAddBoardModalAtom = atom({
  key: 'isOpenAddBoardModal',
  default: {
    type: 'add',
    isOpen: false,
  },
}) // isOpenSettingBoardNameModal name은 어던가, type 설정

export const isOpenAddTaskModalAtom = atom({
  key: 'isOpenAddTaskModal',
  default: {
    type: 'add',
    isOpen: false,
  },
})

export const isOpenNoticeModalAtom = atom<boolean>({
  key: 'isOpenNoticeModal',
  default: false,
})

export const noticeMessageAtom = atom<INoticeMessage>({
  key: 'noticeMessage',
  default: {
    message: '',
    noticeMessageOkButtonHandle: () => {},
  },
})
/*
export const boardsRoutesAtom = atom({
  key: 'boardsRoutes',
  default: [
    {
      path: 'todo',
      element: <Board process='todo' />,
    },
    {
      path: 'doing',
      element: <Board process='doing' />,
    },
    {
      path: 'done',
      element: <Board process='done' />,
    },
  ],
})
*/
