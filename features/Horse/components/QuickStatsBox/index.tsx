import QuickStatsBoxStyled from './styled'
import { GREY_LINE, PRIMARY_LINE } from 'assets/images'
import { formatStatsRank } from 'utils/helper'

interface QuickStatsBoxProps {
  customClass?: string
  statsType: string
  statsRank: string
}

function QuickStatBox({ customClass = '', statsType, statsRank }: QuickStatsBoxProps) {
  return (
    <QuickStatsBoxStyled className={customClass}>
      <div className='quick-stats-box'>
        <img src={PRIMARY_LINE} alt='' className='grey-line d-block' />
        <div className='content'>
          <div className='stats-type'>{statsType}</div>
          <div className='current-value color-yellow text-uppercase stats-type-text'>{formatStatsRank(statsRank)}</div>
        </div>
        <img src={GREY_LINE} alt='' className='grey-line d-block' />
      </div>
    </QuickStatsBoxStyled>
  )
}

export default QuickStatBox
