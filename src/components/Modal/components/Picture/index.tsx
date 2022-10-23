import { useRecoilState } from 'recoil'

import { taskAtom } from 'store/atoms'

import { ImageIcon } from 'assets/svgs'
import styles from './picture.module.scss'

const Picture = () => {
  const [task, setTask] = useRecoilState(taskAtom)

  const handleImageChange = (e: any) => {
    const { files } = e.target
    const reader = new FileReader()
    reader.readAsDataURL(files[0])

    reader.onload = () => {
      setTask((prevTask) => ({ ...prevTask, image: { name: files[0].name, url: reader.result } }))
    }
  }

  return (
    <div className={styles.image}>
      <label className={styles.imageLabel} htmlFor='chooseFile'>
        <ImageIcon className={styles.imageBtn} />
        Choose Your Image 👈
      </label>
      <input type='file' id='chooseFile' accept='img/*' onChange={handleImageChange} />
      {task.image.name && <p>{task.image.name}</p>}
    </div>
  )
}

export default Picture

// any type 설정
