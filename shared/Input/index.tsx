import classNames from 'classnames'
import { ChangeEvent } from 'react'

import { ORANGE_LINE } from 'assets/images'
import InputStyled from './styled'

interface InputProps {
  searchValue: string
  handleSearchValueChanged: (e: ChangeEvent<HTMLInputElement>) => void
  customClass?: string
  placeholder?: string
  type?: string
  h2h?: boolean
}

function Input({
  searchValue,
  handleSearchValueChanged,
  placeholder,
  customClass = '',
  type,
  h2h = false
}: InputProps) {
  const searchInputClass = classNames('position-relative', 'd-flex', 'align-items-center', customClass)

  return (
    <InputStyled className={searchInputClass}>
      <img src={ORANGE_LINE} alt='' className='orange-line position-absolute' />
      <input
        type={type || 'text'}
        className='search-input flex-grow-1'
        placeholder={placeholder}
        defaultValue={searchValue}
        onChange={handleSearchValueChanged}
        maxLength={h2h === true ? 50 : 25}
      />
    </InputStyled>
  )
}

export default Input
