import { forwardRef, LegacyRef } from 'react'

import { ClockIcon } from 'assets/svgs'
import styles from './schedule.module.scss'

export const CustomDateButton = forwardRef(({ value, onClick }: any, ref: LegacyRef<HTMLButtonElement> | undefined) => (
  <div className={styles.dateButton}>
    <ClockIcon onClick={onClick} />
    <button type='button' onClick={onClick} ref={ref}>
      <div>{value}</div>
    </button>
  </div>
))

CustomDateButton.displayName = 'customButton'
