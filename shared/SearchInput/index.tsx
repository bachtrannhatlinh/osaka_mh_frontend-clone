import { ChangeEvent } from 'react'
import classNames from 'classnames'

import { MAGNIFYING_GLASS, ORANGE_LINE } from 'assets/images'
import SearchInputStyled from './styled'

interface SearchInputProps {
  searchValue: string
  handleSearchValueChanged: (e: ChangeEvent<HTMLInputElement>) => void
  customClass?: string
  placeholder?: string
  onAutoFocus?: boolean
}

function SearchInput({
  searchValue,
  handleSearchValueChanged,
  customClass = '',
  placeholder = 'Search',
  onAutoFocus
}: SearchInputProps) {
  const searchInputClass = classNames('position-relative', 'd-flex', 'align-items-center', customClass)

  return (
    <SearchInputStyled className={searchInputClass}>
      <img src={ORANGE_LINE} alt='' className='orange-line position-absolute' />
      <img src={MAGNIFYING_GLASS} alt='search' className='search-icon' />
      <input
        autoFocus = {onAutoFocus === true ? true : false}
        type='text'
        className='search-input flex-grow-1'
        placeholder={placeholder}
        value={searchValue}
        onChange={handleSearchValueChanged}
      />
    </SearchInputStyled>
  )
}

export default SearchInput
