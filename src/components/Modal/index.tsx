import { ChangeEvent, FormEvent, useState } from 'react'
import cx from 'classnames'
import DatePicker from 'react-datepicker'

import { CustomButton } from './utils/CustomButton'

import { FileIcon, ImageIcon, PlusIcon, XIcon } from 'assets/svgs'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './modal.module.scss'

const Modal = () => {
  const [task, setTask] = useState('')
  const [category, setCategory] = useState('')
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [categoryShow, setCategoryShow] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)
  const [image, setImage] = useState<string | ArrayBuffer | null>()

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.currentTarget.value)
  }

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

  const handleDateChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.readAsDataURL(file)

    return new Promise(() => {
      reader.onload = () => {
        setImage(reader.result)
      }
    })
  }

  return (
    <div className={styles.modalBox}>
      <div className={styles.modalHead}>
        <div>Create a new task</div>
        <XIcon />
      </div>
      <div className={styles.title}>
        <div>title</div>
        <input type='text' placeholder='할 일을 입력해주세요' value={task} onChange={handleTaskChange} />
      </div>
      <form className={styles.category} onSubmit={handleCategorySubmit}>
        <div>Task Type</div>
        <PlusIcon className={styles.categoryBtn} onClick={handleCategoryShow} />
        <input
          className={cx(styles.categoryInput, { [styles.show]: categoryShow })}
          type='text'
          placeholder='카테고리 입력해주세요'
          value={category}
          onChange={handleCategoryChange}
        />
        {categoryList.map((item, index) => {
          return (
            <button type='button' key={`category-${item}`} onClick={() => handleCategoryDelete(index)}>
              {item}
            </button>
          )
        })}
      </form>
      <div className={styles.detail}>
        <div>Task Detail</div>
        <div className={styles.date}>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            customInput={<CustomButton />}
          />
        </div>
        <div className={styles.image}>
          <ImageIcon />
          <input type='file' accept='img/*' onChange={handleImageChange} />
        </div>
        <div className={styles.description}>
          <FileIcon />
          <input type='text' placeholder='상세한 내용을 입력하세요' value={} onChange={} />
        </div>
      </div>
    </div>
  )
}

export default Modal

// 카테고리 중복으로 했을 때 처리
// dates any types
// date Picker onSelect 생각해보기
// change type
