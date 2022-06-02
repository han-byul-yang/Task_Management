import { forwardRef } from 'react'

import { ClockIcon } from 'assets/svgs'
import styles from '../modal.module.scss'

export const CustomButton = forwardRef(({ value, onClick }: any, ref: any) => (
  <div className={styles.dateBtn}>
    <ClockIcon onClick={onClick} />
    <button type='button' className='example-custom-input' onClick={onClick} ref={ref}>
      <div>{value}</div>
    </button>
  </div>
))

CustomButton.displayName = 'customButton'
