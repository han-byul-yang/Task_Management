import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import { filteringAtom, keyInputAtom } from 'store/atoms'
import FilterChooseBox from './FilterChooseBox'

import { SearchIcon, XIcon } from 'assets/svgs'
import styles from './searchInput.module.scss'

const SearchInput = () => {
  const [keyInput, setKeyInput] = useRecoilState(keyInputAtom)
  const [filtering, setFiltering] = useRecoilState(filteringAtom)
  const [isOpenFilterChooseBox, setIsOpenFilterChooseBox] = useState(false)
  const inputRef = useRef(null)

  const handleKeyInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyInput(e.currentTarget.value)
    setIsOpenFilterChooseBox(false)
  }

  useEffect(() => {
    if (keyInput) setFiltering((prevFiltering) => ({ ...prevFiltering, filter: true }))
    if (!keyInput) setFiltering((prevFiltering) => ({ ...prevFiltering, filter: false }))
    if (filtering.type && !keyInput.includes(`${filtering.type}:`)) setFiltering({ type: '', filter: false })
  }, [filtering.type, keyInput, setFiltering])

  const handleKeyInputSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleSearchInputFocus = () => {
    setIsOpenFilterChooseBox(true)
  }

  const handleDeleteKeyInputClick = () => {
    setKeyInput('')
  }

  return (
    <div className={styles.inputBox}>
      <form className={styles.searchForm} onSubmit={handleKeyInputSubmit}>
        <SearchIcon className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          type='search'
          placeholder='search'
          value={keyInput}
          onChange={handleKeyInputChange}
          onFocus={handleSearchInputFocus}
          ref={inputRef}
        />
        {keyInput !== '' && <XIcon className={styles.xIcon} onClick={handleDeleteKeyInputClick} />}
      </form>
      <div className={styles.inputDownBox}>
        {isOpenFilterChooseBox && (
          <FilterChooseBox
            setKeyInput={setKeyInput}
            setIsOpenFilterChooseBox={setIsOpenFilterChooseBox}
            inputRef={inputRef}
          />
        )}
      </div>
    </div>
  )
}

export default SearchInput
