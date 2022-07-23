import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import CustomDateInput from './CustomDateInput'

const DashBoard = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  return (
    <ReactDatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat='eee, dd MMMM yyyy'
      customInput={<CustomDateInput />}
    />
  )
}

export default DashBoard
