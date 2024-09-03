/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash'
import { LENDING_STATUS } from 'models'
import { capitalizeOnlyFirstLetter } from 'utils/helper'
import StatsBarStyled from './styled'

interface StatsBarProps {
  statsType: string
  statsRank: string
  currentValue: number
  onDecrease: () => void
  onIncrease: () => void
  count?: number
  point: number
  isMyHorse: boolean
  listHorsesStats: any
  horseStatus?: string
}

function StatsBar({
  statsType,
  statsRank,
  currentValue,
  onDecrease,
  onIncrease,
  count = 0,
  point,
  isMyHorse,
  listHorsesStats,
  horseStatus
}: StatsBarProps) {
  const countStats = currentValue + count

  const handleStatsRank = () => {
    if (_.isEmpty(listHorsesStats)) return
    if (countStats <= listHorsesStats[statsType][0].max) return 'F'
    if (countStats <= listHorsesStats[statsType][1].max) return 'D'
    if (countStats <= listHorsesStats[statsType][2].max) return 'C'
    if (countStats <= listHorsesStats[statsType][3].max) return 'B'
    if (countStats <= listHorsesStats[statsType][4].max) return 'A'
    if (countStats <= listHorsesStats[statsType][5].max) return 'AA'
    if (countStats <= listHorsesStats[statsType][6].max) return 'S'
    if (countStats <= listHorsesStats[statsType][7].max) return 'SS'
    if (countStats <= listHorsesStats[statsType][8].max) return 'SS+'
    else return 'SSS'
  }
  return (
    <StatsBarStyled currentStatsValue={currentValue} countStats={count}>
      <div className='stats-bar d-flex align-items-center mt-2'>
        <div className='stats-type'>{capitalizeOnlyFirstLetter(statsType)}</div>
        <div className='progress flex-grow-1 position-relative' />
        {isMyHorse && (
          <div className={`current-value ${count > 0 ? 'color-yellow' : 'colorValue'}`}>{countStats}</div>
        )}
        <div className='stats-rank color-white font-bold'>
          {!_.isEmpty(listHorsesStats) && handleStatsRank() === statsRank ? statsRank : <span className='animation-text'>{handleStatsRank()}</span>}
        </div>
        {isMyHorse && (horseStatus !== LENDING_STATUS.Lending) && (
          <>
            <button
              className={`decrease font-bold ${count === 0 && 'disabled'}`}
              onClick={onDecrease}
              disabled={count === 0}
            >
              -
            </button>
            <div className='color-white count'> {count} </div>
            <button
              className={`increase font-bold ${(point === 0 || (countStats >= 100)) && 'disabled'}`}
              onClick={onIncrease}
              disabled={point === 0}
            >
              +
            </button>
          </>
        )}
      </div>
    </StatsBarStyled >
  )
}

export default StatsBar
