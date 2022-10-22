import { useRecoilValue, useSetRecoilState } from 'recoil'

import { isOpenNoticeModalAtom, noticeMessageAtom } from 'store/atoms'

import { NoticeIcon } from 'assets/svgs'
import styles from './noticeModal.module.scss'

const NoticeModal = () => {
  const setOpenMessageModal = useSetRecoilState(isOpenNoticeModalAtom)
  const noticeMessage = useRecoilValue(noticeMessageAtom)

  const handleCancelButtonClick = () => {
    setOpenMessageModal(false)
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox}>
        <div className={styles.noticeBox}>
          <NoticeIcon className={styles.noticeIcon} />
          <p>NOTICE</p>
        </div>
        <p>{noticeMessage.message}</p>
        <div className={styles.buttonBox}>
          <button type='button' onClick={noticeMessage.noticeMessageOkButtonHandle}>
            확인
          </button>
          <button type='button' onClick={handleCancelButtonClick}>
            취소
          </button>
        </div>
      </div>
    </>
  )
}

export default NoticeModal
