import { useRecoilValue } from 'recoil'

import { isOpenWriteBoardModalAtom, isOpenWriteTaskModalAtom, isOpenNoticeModalAtom } from 'store/atoms'
import WriteTaskModal from 'components/Modal/WriteTaskModal'
import ModalPortal from 'components/Modal/ModalPortal'
import SearchInput from './SearchInput'
import BoardsContainer from './BoardsContainer'
import WriteBoardModal from 'components/Modal/WriteBoardModal'
import NoticeModal from 'components/Modal/NoticeModal'

import styles from './taskDashboard.module.scss'

const TaskDashboard = () => {
  const isOpenWriteTaskModal = useRecoilValue(isOpenWriteTaskModalAtom)
  const isOpenWriteBoardModal = useRecoilValue(isOpenWriteBoardModalAtom)
  const isOpenNoticeModal = useRecoilValue(isOpenNoticeModalAtom)

  return (
    <div className={styles.taskDashboardPage}>
      <header>
        <SearchInput />
      </header>
      <main className={styles.main}>
        <BoardsContainer />
      </main>
      {isOpenWriteTaskModal.isOpen && (
        <ModalPortal>
          <WriteTaskModal />
        </ModalPortal>
      )}
      {isOpenWriteBoardModal.isOpen && (
        <ModalPortal>
          <WriteBoardModal />
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
