import { ChangeEvent, FormEvent, useState } from 'react'

import { useSetRecoilState, useRecoilValue } from 'recoil'
import { searchKeyAtom, todosAtom } from 'store/atoms'

import { SearchIcon, XIcon } from 'assets/svgs'
import styles from './searchInput.module.scss'

const SearchInput = () => {
  const [keyInput, setKeyInput] = useState('')
  const setSearchKey = useSetRecoilState(searchKeyAtom)
  const todoList = useRecoilValue(todosAtom)
  const [openDropDown, setOpenDropDown] = useState(false)

  // const allTasks: Todo[][] = []

  // Object.keys(todoList).forEach((todoKey) => allTasks.push(todoList[todoKey]))

  const allTasks = [...todoList.TODO, ...todoList.DOING, ...todoList.DONE]
  const categoryWordsList = allTasks.reduce(
    (acc, cur) => {
      return [...acc, ...cur.category]
    },
    ['all']
  )
  const taskWordsList = allTasks.reduce(
    (acc, cur) => {
      return [...acc, cur.task]
    },
    ['']
  )

  const categoryWordList = Array.from(new Set(categoryWordsList))
  const categoryHashtagList = categoryWordList.map((categoryWord) => `#${categoryWord}`)
  const taskWordList = Array.from(new Set(taskWordsList))

  const dropdownWordsList = categoryHashtagList.concat(taskWordList)

  const handleKeyInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyInput(e.currentTarget.value)
    setOpenDropDown(true)
  }

  const handleKeyInputSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchKey(keyInput)
    setOpenDropDown(false)
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
    setSearchKey('')
    setKeyInput('')
  }

  return (
    <div className={styles.inputBox}>
      <form className={styles.searchForm} onSubmit={handleKeyInputSubmit}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        {openDropDown && <div className={styles.inputBackground} onClick={handleCloseDropDownClick} />}
        <SearchIcon className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          type='search'
          placeholder='search'
          value={keyInput}
          onChange={handleKeyInputChange}
        />
        {keyInput !== '' && <XIcon className={styles.xBtn} onClick={handleDeleteKeyInputClick} />}
        {openDropDown && (
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
        )}
      </form>
    </div>
  )
}

export default SearchInput
// onClick 함수형 바꿀 방법 모색(컴포넌트로 나눠 props로 전달해주는 것도 나쁘지 않을 듯)
