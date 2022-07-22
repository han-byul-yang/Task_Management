import { forwardRef, MouseEventHandler, ReactNode, useState } from 'react'
import ReactDatePicker from 'react-datepicker'

interface CustomDateInputProps {
  value: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}

const CustomDateInput = forwardRef(({ value, onClick }: CustomDateInputProps, ref) => (
  <button type='button' onClick={onClick}>
    {value}
  </button>
))

const DashBoard = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  CustomDateInput.displayName = 'CustomDateInput'

  return <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat='dd, dd MMMM yyyy' />
}

export default DashBoard
