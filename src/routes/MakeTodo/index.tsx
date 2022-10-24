import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { isOpenAddBoardModalAtom, isOpenAddTaskModalAtom, isOpenNoticeModalAtom } from 'store/atoms'
import AddTaskModal from 'components/Modal/AddTaskModal'
import ModalPortal from 'components/Modal/ModalPortal'
import SearchInput from './SearchInput'
import BoardsContainer from './BoardsContainer'
import AddBoardModal from 'components/Modal/AddBoardModal'
import NoticeModal from 'components/Modal/NoticeModal'

import styles from './makeTodo.module.scss'

const MakeTodo = () => {
  const [boardProcessName, setBoardProcessName] = useState('')
  const isOpenAddTaskModal = useRecoilValue(isOpenAddTaskModalAtom)
  const isOpenAddBoardModal = useRecoilValue(isOpenAddBoardModalAtom)
  const isOpenNoticeModal = useRecoilValue(isOpenNoticeModalAtom)

  return (
    <>
      <header>
        <SearchInput />
      </header>
      <main className={styles.main}>
        <BoardsContainer setBoardProcessName={setBoardProcessName} />
      </main>
      {isOpenAddTaskModal.isOpen && (
        <ModalPortal>
          <AddTaskModal boardProcessName={boardProcessName} />
        </ModalPortal>
      )}
      {isOpenAddBoardModal.isOpen && (
        <ModalPortal>
          <AddBoardModal boardProcessName={boardProcessName} />
        </ModalPortal>
      )}
      {isOpenNoticeModal && (
        <ModalPortal>
          <NoticeModal />
        </ModalPortal>
      )}
    </>
  )
}

export default MakeTodo
