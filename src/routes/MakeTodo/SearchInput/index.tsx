import { SearchIcon } from 'assets/svgs'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { searchKeyAtom, Todo, todosAtom } from 'store/atoms'

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

  const handleKeyResultClick = (dropdownWord: string) => {
    setSearchKey(dropdownWord)
    setKeyInput(dropdownWord)
    setOpenDropDown(false)
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
        />
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
// x 버튼 누르면 하이라이트 적용 취소
// submit 혹은 dropdown 클릭시 input 안에 keyword 남아있기
// 바깥에 누르면 폼 딛히기
