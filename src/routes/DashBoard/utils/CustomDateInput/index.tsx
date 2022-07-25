import { forwardRef, LegacyRef, MouseEventHandler, ReactNode } from 'react'

import { CalendarIcon, ArrowDownIcon } from 'assets/svgs'
import styles from './customDateInput.module.scss'

interface ICustomDateInputProps {
  value: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}

const CustomDateInput = forwardRef(({ value, onClick }: any, ref: LegacyRef<HTMLButtonElement> | undefined) => (
  <button className={styles.customButton} type='button' onClick={onClick} ref={ref}>
    <CalendarIcon className={styles.calendarIcon} />
    <div>{value}</div>
    <ArrowDownIcon className={styles.arrowDownIcon} />
  </button>
))

CustomDateInput.displayName = 'CustomDateInput'

export default CustomDateInput

// any
