import { DROPDOWN_TAG_ICON, FILTER_ICON, ORANGE_LINE } from 'assets/images'
import { useRef, useState } from 'react'
import SelectCustomStyled from './styled'
import { ClassFilters, TypeFilters } from 'features/Race/pages/Open'
import { useOnClickOutside } from 'hooks'
import { ILeaseTypes, TypeSorts } from 'models'

interface PropsSelectCustom {
  nameSelect?: string
  dataSelect: ClassFilters | TypeFilters | TypeSorts | ILeaseTypes
  onSelected: (item: string) => void
  customClass?: string
  disabled?: boolean
  isFiltered?: boolean
}
function SelectCustom({ nameSelect, dataSelect, onSelected, customClass = '', disabled, isFiltered }: PropsSelectCustom) {
  const selectRef = useRef(null)

  const [show, setShow] = useState(false)

  useOnClickOutside(selectRef, e => {
    if (e.target == selectRef.current) {
      return
    }
    setShow(false)
  })

  return (
    <SelectCustomStyled>
      <div className={`select-box-customs ${customClass}`} onClick={() => setShow(!show)} ref={selectRef}>
        <span className='select-name'>
          {isFiltered &&
            <img src={FILTER_ICON} alt='' className='filter-icon' width={20} />
          }
          { nameSelect === 'In_Farm' ? 'In Farm' : nameSelect }
        </span>
        {!disabled && <img
          className={!show ? 'select-drop-icon ' : 'select-drop-icon up-down-icon '}
          src={DROPDOWN_TAG_ICON}
          alt=''
        />
        }
        <img src={ORANGE_LINE} alt='' className='orange-line position-absolute' />
        {show && !disabled && (
          <ul className='select-content-dropdown'>
            {dataSelect.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  onSelected(item.name)
                  setShow(false)
                }}
                className={nameSelect == item.name ? 'active' : ''}
              >
                { item.name === 'In_Farm' ? 'In Farm' : item.name } 
              </li>
            ))}
            <div className='polygon'>
              <div className='rect'></div>
              <div className='triangle'>
                <div className='triangle-border'></div>
              </div>
            </div>
          </ul>
        )}
      </div>
    </SelectCustomStyled>
  )
}
export default SelectCustom
