import { forwardRef } from 'react'

import { ClockIcon } from 'assets/svgs'

export const CustomButton = forwardRef(({ value, onClick }: any, ref: any) => (
  <>
    <ClockIcon onClick={onClick} />
    <button type='button' className='example-custom-input' onClick={onClick} ref={ref}>
      <div>{value}</div>
    </button>
  </>
))

CustomButton.displayName = 'customButton'
