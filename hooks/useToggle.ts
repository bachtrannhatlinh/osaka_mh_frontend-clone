import { useState } from 'react'

export default function useToggle(initialValue: boolean): [boolean, (value?: boolean | undefined) => void] {
  const [value, setValue] = useState<boolean>(initialValue)

  function toggleValue(value?: boolean) {
    setValue(currentValue => (typeof value === 'boolean' ? value : !currentValue))
  }

  return [value, toggleValue]
}
