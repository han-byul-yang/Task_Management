import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import { filteringAtom } from 'store/atoms'

import styles from './filterChooseBox.module.scss'

const filteringList = ['제목', '카테고리', '내용']

interface IFilterChooseBoxProps {
  setIsOpenFilterChooseBox: Dispatch<SetStateAction<boolean>>
  setKeyInput: Dispatch<SetStateAction<string>>
  inputRef: MutableRefObject<HTMLInputElement | null>
}

const FilterChooseBox = ({ setKeyInput, setIsOpenFilterChooseBox, inputRef }: IFilterChooseBoxProps) => {
  const setFiltering = useSetRecoilState(filteringAtom)
  const containerRef = useRef(null)

  const clickOutsideHandle = () => {
    setIsOpenFilterChooseBox(false)
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleFilterChooseClick = (filtering: string) => {
    if (inputRef && inputRef.current) inputRef.current.focus()
    setKeyInput(`${filtering}: `)
    setFiltering((prevFiltering) => ({ ...prevFiltering, type: filtering }))
    setIsOpenFilterChooseBox(false)
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
