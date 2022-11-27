import { useRecoilValue } from 'recoil'

import { isOpenModalAtom } from 'store/atoms'
// import WriteTaskModal from 'components/Modal/WriteTaskModal'
import ModalPortal from 'components/Modal/ModalPortal'
import SearchInput from './SearchInput'
import BoardsContainer from './BoardsContainer'
// import WriteBoardModal from 'components/Modal/WriteBoardModal'
// import NoticeModal from 'components/Modal/NoticeModal'

import styles from './taskDashboard.module.scss'
import { lazy } from 'react'

const WriteTaskModal = lazy(() => import('components/Modal/WriteTaskModal'))
const WriteBoardModal = lazy(() => import('components/Modal/WriteBoardModal'))
const NoticeModal = lazy(() => import('components/Modal/NoticeModal'))

const TaskDashboard = () => {
  const isOpenModal = useRecoilValue(isOpenModalAtom)

  return (
    <div className={styles.taskDashboardPage}>
      <header>
        <SearchInput />
      </header>
      <main>
        <BoardsContainer />
      </main>
      {isOpenModal.writeTaskModal.isOpen && (
        <ModalPortal>
          <WriteTaskModal />
        </ModalPortal>
      )}
      {isOpenModal.writeBoardModal.isOpen && (
        <ModalPortal>
          <WriteBoardModal />
        </ModalPortal>
      )}
      {isOpenModal.noticeModal && (
        <ModalPortal>
          <NoticeModal />
        </ModalPortal>
      )}
    </div>
  )
}

export default TaskDashboard
