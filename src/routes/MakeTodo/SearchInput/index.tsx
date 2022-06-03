import { SearchIcon } from 'assets/svgs'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { searchKeyAtom, todosAtom } from 'store/atoms'

import styles from './searchInput.module.scss'

const SearchInput = () => {
  const [keyInput, setKeyInput] = useState('')
  const setSearchKey = useSetRecoilState(searchKeyAtom)
  const todoList = useRecoilValue(todosAtom)

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
  }

  const handleKeyInputSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchKey(keyInput)
    setKeyInput('')
  }

  const handleKeyResultClick = (dropdownWord: string) => {
    setSearchKey(dropdownWord)
  }

  return (
    <div className={styles.inputBox}>
      <form className={styles.searchForm} onSubmit={handleKeyInputSubmit}>
        <SearchIcon className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          type='text'
          placeholder='search'
          value={keyInput}
          onChange={handleKeyInputChange}
        />
        {keyInput !== '' && (
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
// 처음에 dropdown 안 나오게 하기
// x 버튼 누르면 하이라이트 적용 취소
// submit 혹은 dropdown 클릭시 input 안에 keyword 남아있기
//
