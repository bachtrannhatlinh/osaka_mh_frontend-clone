import { FLASH_ICON } from 'assets/images'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { formatTime, getEnergyPercent } from 'utils/helper'
import EnergyBarStyled from './styled'

interface EnergyBarProps {
  maxEnergy: number | null
  currentEnergy: number | 0
  customClass?: string
  firstTime: number
  disableRecovery: boolean
}

function EnergyBar({ maxEnergy, customClass = '', firstTime, disableRecovery = false }: EnergyBarProps) {
  const { t } = useTranslation()
  const currentEnergyPercent = useMemo<number>(() => getEnergyPercent(firstTime), [maxEnergy, firstTime])
  return (
    <EnergyBarStyled currentEnergyPercent={currentEnergyPercent} className={customClass}>
      <div className='energy-bar d-flex'>
        <img src={FLASH_ICON} alt='' className='energy-icon position-relative' />
        <div className='energy-content d-flex flex-grow-1 flex-column'>
          <span className='energy-text color-grey'>{t(`${NOTIFICATION_MESSAGE}.energy`)}</span>
          <div className='bar flex-grow-1 position-relative' />
          {disableRecovery === true && (
            <span className='energy-text color-grey'>
              {t(`${NOTIFICATION_MESSAGE}.recovery`)}: <span className='energy-time color-white'>{formatTime(firstTime)}</span>
            </span>
          )}
        </div>
      </div>
    </EnergyBarStyled>
  )
}

export default EnergyBar
