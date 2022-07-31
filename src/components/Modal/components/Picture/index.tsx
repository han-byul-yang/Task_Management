import { Dispatch, SetStateAction } from 'react'

import { ImageIcon } from 'assets/svgs'
import styles from './picture.module.scss'

interface IPictureProps {
  setImage: Dispatch<SetStateAction<any>>
}

const Picture = ({ setImage }: IPictureProps) => {
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
    <div className={styles.image}>
      <label className={styles.imageLabel} htmlFor='chooseFile'>
        <ImageIcon className={styles.imageBtn} />
        Choose Your Image 👈
      </label>
      <input type='file' id='chooseFile' accept='img/*' onChange={handleImageChange} />
    </div>
  )
}

export default Picture
