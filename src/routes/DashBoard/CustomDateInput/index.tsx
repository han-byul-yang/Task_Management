import { MouseEventHandler, ReactNode } from 'react'

interface CustomDateInputProps {
  value: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}

const CustomDateInput = ({ value, onClick }: any) => (
  <button type='button' onClick={onClick}>
    {value}
  </button>
)

CustomDateInput.displayName = 'CustomDateInput'

export default CustomDateInput

// any
