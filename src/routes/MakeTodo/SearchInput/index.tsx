import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'

import { filteringAtom, filterTasksAtom, searchKeyAtom, tasksAtom } from 'store/atoms'
import filterContents from 'utils/filterContents'
import NarrowSearchBox from './NarrowSearchBox'

import { SearchIcon, XIcon } from 'assets/svgs'
import styles from './searchInput.module.scss'

const SearchInput = () => {
  const [keyInput, setKeyInput] = useState('')
  const [filterTypeInput, setFilterTypeInput] = useState('')
  const setSearchKey = useSetRecoilState(searchKeyAtom)
  const boardsTasks = useRecoilValue(tasksAtom)
  const setFilterTasks = useSetRecoilState(filterTasksAtom)
  const [filtering, setFiltering] = useRecoilState(filteringAtom)
  const [openDropDown, setOpenDropDown] = useState(false)
  const [isNarrowSearchBoxOpen, setIsNarrowSearchBoxOpen] = useState(false)

  const allTasks = [...boardsTasks.TODO, ...boardsTasks.DOING, ...boardsTasks.DONE] // board 삭제하면 이거 오류남
  /* const categoryWordsList = allTasks.reduce(
    (acc, cur) => {
      return [...acc, ...cur.categoryList]
    },
    ['']
  ) */
  const categoryWordsList = ['']
  const taskWordsList = allTasks.reduce(
    (acc, cur) => {
      return [...acc, cur.taskTitle]
    },
    ['']
  )

  const categoryWordList = Array.from(new Set(categoryWordsList))
  const categoryHashtagList = categoryWordList.map((categoryWord) => `#${categoryWord}`)
  const taskWordList = Array.from(new Set(taskWordsList))

  // const dropdownWordsList = categoryHashtagList.concat(taskWordList)
  const dropdownWordsList = ['']

  const handleKeyInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyInput(e.currentTarget.value)
    // setOpenDropDown(true)
    setIsNarrowSearchBoxOpen(false)
  }

  useEffect(() => {
    if (keyInput) setFiltering((prevFiltering) => ({ ...prevFiltering, filter: true }))
    if (!keyInput) setFiltering((prevFiltering) => ({ ...prevFiltering, filter: false }))
    if (filtering.filter) {
      setFilterTasks(filterContents(filtering.type, keyInput, boardsTasks))
    }
  }, [boardsTasks, filtering.filter, filtering.type, keyInput, setFilterTasks, setFiltering])

  const handleKeyInputSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // setSearchKey(keyInput)
    // setOpenDropDown(false)
  }

  const handleSearchInputFocus = () => {
    setIsNarrowSearchBoxOpen(true)
  }

  const handleCloseDropDownClick = () => {
    setOpenDropDown(false)
  }

  const handleKeyResultClick = (dropdownWord: string) => {
    setSearchKey(dropdownWord)
    setKeyInput(dropdownWord)
    setOpenDropDown(false)
  }

  const handleDeleteKeyInputClick = () => {
    // setSearchKey('')
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
        />
        {keyInput !== '' && <XIcon className={styles.xIcon} onClick={handleDeleteKeyInputClick} />}
      </form>
      <div className={styles.inputDownBox}>
        {isNarrowSearchBoxOpen && (
          <NarrowSearchBox setKeyInput={setKeyInput} setIsNarrowSearchBoxOpen={setIsNarrowSearchBoxOpen} />
        )}
        {/* {openDropDown && (
        <ul className={styles.dropdownList}>
          {dropdownWordsList.map((dropdownWord) => {
            if (dropdownWord.includes(keyInput)) {
              return (
                <li key={`dropdown-${dropdownWord}`}>
                  <button type='button' onClick={() => handleKeyResultClick(dropdownWord)}>
                    {dropdownWord}
                  </button>
                </li>
              )
            }
            return null
          })}
        </ul>
        )} */}
      </div>
    </div>
  )
}

export default SearchInput
