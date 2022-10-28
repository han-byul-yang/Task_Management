import { useEffect, useRef } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import { isOpenNoticeModalAtom, noticeMessageAtom } from 'store/atoms'

import { ErrorIcon, NoticeIcon } from 'assets/svgs'
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

  const modalIcon = {
    ERROR: <ErrorIcon className={styles.typeIcon} />,
    NOTIFICATION: <NoticeIcon className={styles.typeIcon} />,
  }[noticeMessage.messageInformation.kind.toUpperCase()]

  const handleCancelButtonClick = () => {
    setOpenMessageModal(false)
  }

  const messageModalButton = {
    ERROR: (
      <button type='button' onClick={handleCancelButtonClick}>
        확인
      </button>
    ),
    NOTIFICATION: (
      <div className={styles.buttonBox}>
        <button type='button' onClick={noticeMessage.noticeMessageOkButtonHandle}>
          확인
        </button>
        <button type='button' onClick={handleCancelButtonClick}>
          취소
        </button>
      </div>
    ),
  }[noticeMessage.messageInformation.kind.toUpperCase()]

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox} ref={containerRef}>
        <div className={styles.typeBox}>
          {modalIcon}
          <p>{noticeMessage.messageInformation.kind.toUpperCase()}</p>
        </div>
        <p>{noticeMessage.messageInformation.message}</p>
        {messageModalButton}
      </div>
    </>
  )
}

export default NoticeModal
