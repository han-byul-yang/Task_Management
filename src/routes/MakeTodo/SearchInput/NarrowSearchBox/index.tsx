import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import { filteringAtom } from 'store/atoms'

import styles from './narrowSearchBox.module.scss'

const filteringList = ['제목', '카테고리', '내용']

interface INarrowSearchBox {
  setIsNarrowSearchBoxOpen: Dispatch<SetStateAction<boolean>>
  setKeyInput: Dispatch<SetStateAction<string>>
}

const NarrowSearchBox = ({ setKeyInput, setIsNarrowSearchBoxOpen }: INarrowSearchBox) => {
  const setFiltering = useSetRecoilState(filteringAtom)
  const containerRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsNarrowSearchBoxOpen(false)
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleNarrowSearchClick = (filtering: string) => {
    setKeyInput(`${filtering}: `) // 클릭 훈 onFocus
    setFiltering((prevFiltering) => ({ ...prevFiltering, type: filtering }))
    setIsNarrowSearchBoxOpen(false)
  }

  return (
    <div className={styles.settingBox} ref={containerRef}>
      <p>검색 필터링</p>
      <ul className={styles.narrowSearchList}>
        {filteringList.map((filtering) => {
          const filterKey = `filter-${filtering}`
          return (
            <li key={filterKey}>
              <button type='button' onClick={() => handleNarrowSearchClick(filtering)}>
                {filtering}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default NarrowSearchBox
