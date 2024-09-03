import classNames from 'classnames'
import { LegacyRef } from 'react'

import SwitchBtnStyled from './styled'

interface SwitchBtnProps {
  title: string
  isOn: boolean
  handleSwitchBtnClicked: () => void
  customClass?: string
  refSwitch?: LegacyRef<HTMLButtonElement> | undefined
  disabled?: boolean
}

function SwitchBtn({ title, isOn, handleSwitchBtnClicked, customClass = '', refSwitch, disabled }: SwitchBtnProps) {
  const switchBtnClass = classNames('switch-btn', {
    'switch-btn--on': isOn
  })
  const SwitchBtnClass = classNames('d-flex', 'align-items-center', customClass)

  return (
    <SwitchBtnStyled className={SwitchBtnClass}>
      <div className='switch-title font-bold color-white'>{title}</div>
      <button ref={refSwitch} className={switchBtnClass} onClick={handleSwitchBtnClicked} disabled={disabled}>
        <div className='circle' />
      </button>
    </SwitchBtnStyled>
  )
}

export default SwitchBtn
