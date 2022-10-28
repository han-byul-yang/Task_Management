import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { IBoardTaskList, ITask } from 'types/taskType'
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
    image: { name: '', url: '' },
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

export const selectedBoardProcessNameAtom = atom<string>({
  key: 'selectedBoardProcessName',
  default: '',
})

export const isOpenModalAtom = atom({
  key: 'isOpenModal',
  default: {
    writeBoardModal: { type: 'add', isOpen: false },
    writeTaskModal: { type: 'add', isOpen: false },
    noticeModal: false,
  },
})

export const noticeMessageAtom = atom<INoticeMessage>({
  key: 'noticeMessage',
  default: {
    messageInformation: { kind: '', message: '' },
    noticeMessageOkButtonHandle: () => {},
  },
})
