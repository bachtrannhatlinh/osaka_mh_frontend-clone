import { useCallback, useMemo } from 'react'
import { getCurrentEnergyPercent } from 'utils/helper'
import EnergyExpBarStyled from './styled'

interface EnergyExpBarProps {
  maxEnergy: number | null
  currentExp: number | null
  customClass?: string
}

function EnergyExpBar({ maxEnergy, currentExp, customClass = '' }: EnergyExpBarProps) {
  const currentEnergyPercent = useMemo<number>(
    () => getCurrentEnergyPercent(currentExp, maxEnergy),
    [currentExp, maxEnergy]
  )

  const cloneCurrentEnergyPercent = useCallback(
    (currentEnergyPercent: number) => {
      if (currentEnergyPercent > 100) {
        return (currentEnergyPercent = 100)
      }
      return currentEnergyPercent
    },
    [currentEnergyPercent]
  )

  return (
    <EnergyExpBarStyled currentEnergyPercent={cloneCurrentEnergyPercent(currentEnergyPercent)} className={customClass}>
      <div className='energy-bar d-flex'>
        <div className='energy-content d-flex flex-grow-1 flex-column'>
          <div className='bar flex-grow-1 position-relative' />
        </div>
      </div>
    </EnergyExpBarStyled>
  )
}

export default EnergyExpBar
