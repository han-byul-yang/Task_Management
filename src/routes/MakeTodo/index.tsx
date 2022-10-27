import { useRecoilValue } from 'recoil'

import { isOpenAddBoardModalAtom, isOpenAddTaskModalAtom, isOpenNoticeModalAtom } from 'store/atoms'
import AddTaskModal from 'components/Modal/AddTaskModal'
import ModalPortal from 'components/Modal/ModalPortal'
import SearchInput from './SearchInput'
import BoardsContainer from './BoardsContainer'
import AddBoardModal from 'components/Modal/AddBoardModal'
import NoticeModal from 'components/Modal/NoticeModal'

import styles from './taskDashboard.module.scss'

const TaskDashboard = () => {
  const isOpenAddTaskModal = useRecoilValue(isOpenAddTaskModalAtom)
  const isOpenAddBoardModal = useRecoilValue(isOpenAddBoardModalAtom)
  const isOpenNoticeModal = useRecoilValue(isOpenNoticeModalAtom)

  return (
    <div className={styles.taskDashboardPage}>
      <header>
        <SearchInput />
      </header>
      <main className={styles.main}>
        <BoardsContainer />
      </main>
      {isOpenAddTaskModal.isOpen && (
        <ModalPortal>
          <AddTaskModal />
        </ModalPortal>
      )}
      {isOpenAddBoardModal.isOpen && (
        <ModalPortal>
          <AddBoardModal />
        </ModalPortal>
      )}
      {isOpenNoticeModal && (
        <ModalPortal>
          <NoticeModal />
        </ModalPortal>
      )}
    </div>
  )
}

export default TaskDashboard
