import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react'
import cx from 'classnames'

import { PlusIcon } from 'assets/svgs'
import styles from './category.module.scss'

interface ICategoryProps {
  noCategory: boolean
  categoryList: string[]
  setCategoryList: Dispatch<SetStateAction<string[]>>
}

const Category = ({ noCategory, categoryList, setCategoryList }: ICategoryProps) => {
  const [category, setCategory] = useState('')
  const [categoryShow, setCategoryShow] = useState(false)

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.currentTarget.value)
  }

  const handleCategoryShow = () => {
    setCategoryShow(true)
  }

  const handleCategorySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCategoryList((prevState) => [...prevState, category])
    setCategory('')
  }

  const handleCategoryDelete = (index: number) => {
    setCategoryList(categoryList.filter((selectItem) => categoryList.indexOf(selectItem) !== index))
  }

  return (
    <div className={styles.category}>
      <div className={styles.categoryHead}>
        <div>Task Type</div>
        {noCategory && <div className={styles.error}>카테고리를 입력해주세요</div>}
      </div>
      <form className={styles.categoryForm} onSubmit={handleCategorySubmit}>
        <PlusIcon className={styles.categoryBtn} onClick={handleCategoryShow} />
        <input
          className={cx(styles.categoryInput, { [styles.show]: categoryShow })}
          type='text'
          placeholder='카테고리 입력해주세요'
          value={category}
          onChange={handleCategoryChange}
        />
      </form>
      {categoryList.map((item, index) => {
        return (
          <button
            className={styles.categoryItem}
            type='button'
            key={`category-${item}`}
            onClick={() => handleCategoryDelete(index)}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}

export default Category
