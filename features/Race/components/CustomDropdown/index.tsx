import { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import CustomDropDownStyled from './styled'

interface CustomDropDownProps {
  onStartInstance?: (value: string | null) => void
  onEndInstance?: (value: string | null) => void
  defaultInstace?: string | null
  minInstace?: string | null
  maxInstace?: string | null
  startInstance?: string | null
  endInstance?: string | null
}

export default function CustomDropDown({
  onStartInstance,
  onEndInstance,
  defaultInstace,
  minInstace,
  maxInstace,
  startInstance,
  endInstance
}: CustomDropDownProps) {
  const [defaultValue, setDefaultValue] = useState<string | null>(startInstance || endInstance || defaultInstace || '')
  const change = (eventkey: string | null) => {
    setDefaultValue(eventkey)
    onStartInstance?.(eventkey)
    onEndInstance?.(eventkey)
  }

  const listDropdownItem = [
    {
      key: 1,
      value: 1000
    },
    {
      key: 2,
      value: 1200
    },
    {
      key: 3,
      value: 1400
    },
    {
      key: 4,
      value: 1600
    },
    {
      key: 5,
      value: 1800
    },
    {
      key: 6,
      value: 2000
    },
    {
      key: 7,
      value: 2200
    },
    {
      key: 1,
      value: 2400
    },
    {
      key: 8,
      value: 2600
    },
    {
      key: 9,
      value: 2800
    },
    {
      key: 10,
      value: 3000
    },
    {
      key: 11,
      value: 3200
    }
  ]

  return (
    <CustomDropDownStyled>
      <Dropdown onSelect={change}>
        <Dropdown.Toggle variant='#0B0B0C' id='dropdown-autoclose-true' className='dropdownToggle'>
          {startInstance || endInstance || defaultValue}
        </Dropdown.Toggle>
        <Dropdown.Menu className='dropdown-menu-ui'>
          {listDropdownItem?.map((item, index) => (
            <Dropdown.Item
              disabled={item.value < (minInstace || 0) || item.value > (maxInstace || 3200)}
              key={item.key + index}
              eventKey={item.value}
            >
              {item.value}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </CustomDropDownStyled>
  )
}
