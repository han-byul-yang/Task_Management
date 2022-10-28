import { useRecoilValue } from 'recoil'

import { isOpenModalAtom } from 'store/atoms'
import WriteTaskModal from 'components/Modal/WriteTaskModal'
import ModalPortal from 'components/Modal/ModalPortal'
import SearchInput from './SearchInput'
import BoardsContainer from './BoardsContainer'
import WriteBoardModal from 'components/Modal/WriteBoardModal'
import NoticeModal from 'components/Modal/NoticeModal'

import styles from './taskDashboard.module.scss'

const TaskDashboard = () => {
  const isOpenModal = useRecoilValue(isOpenModalAtom)

  return (
    <div className={styles.taskDashboardPage}>
      <header>
        <SearchInput />
      </header>
      <main className={styles.main}>
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
