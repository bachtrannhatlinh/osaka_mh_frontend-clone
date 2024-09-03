import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'
import { QuickStatsBox } from 'features/Horse/components'
import { Horse } from 'models'
import classNames from 'classnames'

import StatsStyled from './styled'

interface StatsProps {
  customClass?: string
  horse: Horse
  isLending?: boolean
}

const statsType = ['SPEED', 'MUSCLE', 'STAMINA', 'ACCURACY', 'SPIRIT', 'IQ']

function Stats({ customClass = '', horse, isLending }: StatsProps) {
  const StatsClass = classNames('position-relative', customClass)
  const { t } = useTranslation()

  return (
    <StatsStyled className={StatsClass}>
      <div className='stats-container '>
        <div className='title-stats'>{t(`${NOTIFICATION_MESSAGE}.stats`)} </div>
        <div className='row stats'>
          {horse.list_horse_stats
            .sort((a, b) =>
              statsType.indexOf(a.stats_type) > statsType.indexOf(b.stats_type) ? 1 : -1
            )
            .map((stats, index) => (
              <div className={`stat-block ${isLending ? 'col-4' : 'col-4'} `} key={index}>
                <QuickStatsBox statsType={stats.stats_type} statsRank={stats.stat_rank} />
              </div>
            ))}
        </div>
      </div>
    </StatsStyled>
  )
}

export default Stats
