import { INACTIVE_TAG_BG, DROPDOWN_TAG_ICON } from 'assets/images'
import { useRef, useState } from 'react'
import SelectBoxStyled from './styled'
import { useOnClickOutside } from 'hooks'

interface PropsSelectBox {
  nameSelect?: string
  dataSelect: { name: string, isActive: boolean }[]
  onSelected: (item: string) => void
  customClass?: string
}
function Select({ nameSelect, dataSelect, onSelected, customClass = '' }: PropsSelectBox) {
  const selectRef = useRef(null)

  const [show, setShow] = useState(false)

  useOnClickOutside(selectRef, e => {
    if (e.target == selectRef.current) {
      return
    }
    setShow(false)
  })
  return (
    <SelectBoxStyled>
      <div className={`select-box-customs ${customClass}`} onClick={() => setShow(!show)} ref={selectRef}>
        <img src={INACTIVE_TAG_BG} alt='' />
        <span className='select-name'>{nameSelect}</span>
        <img
          className={!show ? 'select-drop-icon ' : 'select-drop-icon up-down-icon '}
          src={DROPDOWN_TAG_ICON}
          alt=''
        />
        {show && (
          <ul className='select-content-dropdown'>
            {dataSelect.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  onSelected(item.name)
                  setShow(false)
                }}
                className={item.isActive ? 'active' : ''}
              >
                {item.name}
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
    </SelectBoxStyled>
  )
}
export default Select
