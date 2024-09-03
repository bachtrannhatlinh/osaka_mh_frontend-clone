import { ChangeEvent } from 'react'
import RadioButtonStyled from './styled'

interface PropsSelectBox {
  id?: string
  isSelected: boolean
  changed: (e: ChangeEvent<HTMLInputElement>) => void
  label?: string
  value: string
}
function RadioButton({ changed, id, isSelected, label, value }: PropsSelectBox) {
  return (
    <RadioButtonStyled>
      <div className='radio-btn'>
        <input
          id={id}
          onChange={changed}
          value={value}
          type='radio'
          checked={isSelected}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </RadioButtonStyled>
  )
}
export default RadioButton
