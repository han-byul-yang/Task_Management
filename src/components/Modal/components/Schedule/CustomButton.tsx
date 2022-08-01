import { forwardRef, LegacyRef } from 'react'

import { ClockIcon } from 'assets/svgs'
import styles from './schedule.module.scss'

export const CustomButton = forwardRef(({ value, onClick }: any, ref: LegacyRef<HTMLButtonElement> | undefined) => (
  <div className={styles.dateBtn}>
    <ClockIcon onClick={onClick} />
    <button type='button' onClick={onClick} ref={ref}>
      <div>{value}</div>
    </button>
  </div>
))

CustomButton.displayName = 'customButton'

// component 이름 수정
