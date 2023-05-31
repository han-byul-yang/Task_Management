import { ChangeEvent, FormEvent, useState } from 'react'
import { useRecoilState } from 'recoil'
import cx from 'classnames'

import { taskAtom } from 'store/atoms'

import { PlusIcon } from 'assets/svgs'
import styles from './category.module.scss'

interface ICategoryProps {
  noCategory: boolean
}

const Category = ({ noCategory }: ICategoryProps) => {
  const [category, setCategory] = useState('')
  const [task, setTask] = useRecoilState(taskAtom)

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.currentTarget.value)
  }

  const handleAddCategory = () => {
    if (!task.categoryList.includes(category)) {
      setTask((prevTask) => ({ ...prevTask, categoryList: [...prevTask.categoryList, category] }))
    }
    setCategory('')
  }

  const handleCategorySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleAddCategory()
  }

  const handleCategoryDeleteClick = (item: string) => {
    setTask((prevTask) => {
      return {
        ...prevTask,
        categoryList: prevTask.categoryList.filter((prevCategory) => prevCategory !== item),
      }
    })
  }

  return (
    <div className={styles.category}>
      <div className={styles.categoryHead}>
        <p>Task Type</p>
        {noCategory && <p className={styles.error}>카테고리를 입력해주세요</p>}
      </div>
      <form className={styles.categoryForm} onSubmit={handleCategorySubmit}>
        <PlusIcon className={styles.plusIcon} onClick={handleAddCategory} />
        <input
          className={styles.categoryInput}
          type='text'
          placeholder='카테고리 입력해주세요'
          value={category}
          onChange={handleCategoryChange}
        />
      </form>
      {task.categoryList.map((item) => {
        const categoryKey = `category-${item}`
        return (
          <button
            className={styles.categoryItem}
            type='button'
            key={categoryKey}
            onClick={() => handleCategoryDeleteClick(item)}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}

export default Category
