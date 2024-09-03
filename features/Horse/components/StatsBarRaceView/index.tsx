import { capitalizeOnlyFirstLetter } from 'utils/helper'
import StatsBarRaceViewStyled from './styled'

interface StatsBarRaceViewProps {
  statsType: string
  statsRank: string
  currentValue: number
  count?: number
}

function StatsBarRaceView({ statsType, statsRank, currentValue, count = 0 }: StatsBarRaceViewProps) {
  return (
    <StatsBarRaceViewStyled currentStatsValue={currentValue} countStats={count}>
      <div className='stats-bar d-flex align-items-center mt-3'>
        <div className='stats-type'>{capitalizeOnlyFirstLetter(statsType)}</div>
        <div className='progress flex-grow-1 position-relative' />
        <div className={`current-value ${count > 0 ? 'color-yellow' : 'colorValue'}`}>{currentValue + count}</div>
        <div className='stats-rank color-white font-bold'>{statsRank}</div>
      </div>
    </StatsBarRaceViewStyled>
  )
}

export default StatsBarRaceView
