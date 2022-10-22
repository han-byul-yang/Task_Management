import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import useClickOutside from 'hooks/useClickOutside'

import styles from './boardSettingBox.module.scss'

interface IMenuBoxProps {
  setIsBoardSettingBoxOpen: Dispatch<SetStateAction<boolean>>
}

const BoardSettingBox = ({ setIsBoardSettingBoxOpen }: IMenuBoxProps) => {
  const containerRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsBoardSettingBoxOpen(false)
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  return (
    <div className={styles.menuBox} ref={containerRef}>
      <p>보드 수정</p>
      <p>보드 삭제</p>
    </div>
  )
}

export default BoardSettingBox
