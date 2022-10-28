import { useEffect, useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import { isOpenNoticeModalAtom, noticeMessageAtom } from 'store/atoms'

import { NoticeIcon } from 'assets/svgs'
import styles from './noticeModal.module.scss'

const NoticeModal = () => {
  const setOpenMessageModal = useSetRecoilState(isOpenNoticeModalAtom)
  const noticeMessage = useRecoilValue(noticeMessageAtom)
  const containerRef = useRef(null)

  const clickOutsideHandle = () => {
    setOpenMessageModal(false)
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleCancelButtonClick = () => {
    setOpenMessageModal(false)
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox} ref={containerRef}>
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
