import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import { filteringAtom } from 'store/atoms'

import styles from './filterChooseBox.module.scss'

const filteringList = ['제목', '카테고리', '내용']

interface IFilterChooseBoxProps {
  setIsFilterChooseBoxOpen: Dispatch<SetStateAction<boolean>>
  setKeyInput: Dispatch<SetStateAction<string>>
}

const FilterChooseBox = ({ setKeyInput, setIsFilterChooseBoxOpen }: IFilterChooseBoxProps) => {
  const setFiltering = useSetRecoilState(filteringAtom)
  const containerRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsFilterChooseBoxOpen(false)
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleFilterChooseClick = (filtering: string) => {
    setKeyInput(`${filtering}: `) // 클릭 훈 onFocus
    setFiltering((prevFiltering) => ({ ...prevFiltering, type: filtering }))
    setIsFilterChooseBoxOpen(false)
  }

  return (
    <div className={styles.settingBox} ref={containerRef}>
      <p>검색 필터링</p>
      <ul className={styles.filterChooseList}>
        {filteringList.map((filtering) => {
          const filterKey = `filter-${filtering}`
          return (
            <li key={filterKey}>
              <button type='button' onClick={() => handleFilterChooseClick(filtering)}>
                {filtering}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default FilterChooseBox
