import { useEffect, useMemo, useState } from 'react'

import { links } from 'apps'
import { FLASH_ICON } from 'assets/images'
import { HorseAvailable, ListHorseStats } from 'models'
import { ClassTag } from 'shared'
import { capitalizeOnlyFirstLetter, formatStatsRank, formatTime, getEnergyPercent } from 'utils/helper'
import ChooseHorseItemStyled from './styled'
import { useTranslation } from 'react-i18next'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { RateStar } from 'features/Horse/components'

interface ChooseHorseItemProps {
  horse: HorseAvailable
  onHorseClick?: (horseId: number) => void
  customClass?: string
}

const statsType = ['SPEED', 'MUSCLE', 'STAMINA', 'ACCURACY', 'SPIRIT', 'IQ']

function ChooseHorseItem({ horse, onHorseClick, customClass = '' }: ChooseHorseItemProps) {
  const currentEnergyPercent = useMemo<number>(() => getEnergyPercent(horse.remaining_time_to_next_energy), [horse])
  const [firstTime, setFirstTime] = useState(0)
  const [disableRecovery, setDisableRecovery] = useState<boolean>(false)

  const bloodLine = useMemo<string>(() => capitalizeOnlyFirstLetter(horse.blood_line ?? horse.bloodline?.name), [horse])
  const gender = useMemo<string>(() => capitalizeOnlyFirstLetter(horse.gender), [horse])
  const lastFiveRaces = useMemo<string>(() => horse?.last_races_position?.join('-'), [horse])
  const { t } = useTranslation()
  const handleItemClick = (horseId: number) => () => {
    onHorseClick && onHorseClick(horseId)
  }

  useEffect(() => {
    setFirstTime(horse?.remaining_time_to_next_energy)
  }, [horse])

  const timer = () => setFirstTime(firstTime - 1000)
  useEffect(() => {
    const id = setInterval(timer, 1000)
    if (firstTime > 0) {
      setDisableRecovery(true)
    }
    if (firstTime <= 0) {
      setDisableRecovery(false)
      clearInterval(id)
    }
    return () => clearInterval(id)
  }, [firstTime])

  const handleSortStatsType = (arr: ListHorseStats[]) => {
    return (
      <>
        {arr
          .sort((a, b) => (statsType.indexOf(a.stats_type) > statsType.indexOf(b.stats_type) ? 1 : -1))
          .map(stats => (
            <div key={stats.stats_type} className='stat-item w-50 d-flex align-items-center'>
              <span className='stat-title color-yellow'>{stats.stats_type}</span>
              <span className='stat-content color-white'>
                {stats.stat_rank !== null ? formatStatsRank(stats.stat_rank) : 'A'}
              </span>
            </div>
          ))}
        <div className='ability-wrap-content '>
          {
            horse?.list_horse_ability?.length &&
            horse?.list_horse_ability?.map((item, index) => {
            return (
                <div key={index} className='ability-box d-flex justify-content-between align-items-center'>
                  <div className='title color-white'>{item.name_en} </div>
                  <div className='level d-flex ps-2'>{generateRateLevel(3, item.level)}</div>
                </div>
              )
            })
          }
        </div>
      </>
    )
  }

  const generateRateLevel = (maxLevel: number, currentLevel: number): JSX.Element[] => {
    const rateStars: JSX.Element[] = []

    for (let i = 0; i < maxLevel; i++) {
      rateStars.push(<RateStar key={i} isActive={i < currentLevel} />)
    }

    return rateStars
  }

  return (
    <ChooseHorseItemStyled currentEnergy={currentEnergyPercent} className={customClass}>
      <div
        className='choose-horse-item d-flex align-items-center justify-content-between gap-3'
        role='button'
        onClick={handleItemClick(horse.id)}
      >
        <div className='left-container d-flex flex-column align-items-center'>
          {horse.active === false ? <div className='color-red font-bold'>disable</div> : ''}
          <div className='avatar-container d-flex align-items-center justify-content-center p-1'>
            <img src={horse.sub_avatar} alt={horse.name} className='avatar' />
          </div>
          <div className='energy-container d-flex align-items-center'>
            <img src={FLASH_ICON} alt='energy' className='energy-icon' />
            <div className='energy-bar position-relative' />
          </div>
          {disableRecovery && (
            <div>
              <span className='energy-text color-grey'>
                {t(`${NOTIFICATION_MESSAGE}.recovery`)}:{' '}
                <span className='energy-time color-white'>{formatTime(firstTime)}</span>
              </span>
            </div>
          )}

          <div className='link-container'>
            <a
              rel='noopener noreferrer'
              href={links.horse.detail(horse.token_id)}
              target='_blank'
              className='link color-primary'
            >
              {t(`${NOTIFICATION_MESSAGE}.detail`)}
            </a>
          </div>
        </div>
        <div className='mid-container flex-grow-1'>
          <div className='horse-container'>
            <div className='d-flex align-items-center'>
              <div className='name color-white font-bold text-uppercase'>{horse.name}</div>
              <div className='class-type ps-2'>
                <ClassTag text={horse.racing_class} isActive={true} />
              </div>
            </div>
            <div className='bloodline-gender color-white'>
              {bloodLine} - {gender}
            </div>

            <div className='extra-info d-flex align-items-center'>
              <span className='title color-grey'>{t(`${NOTIFICATION_MESSAGE}.runType`)} </span>
              <span className='content color-white'>
                <span> {horse?.run_type} </span>
              </span>
            </div>
            <div className='extra-info d-flex align-items-center'>
              <span className='title color-grey'> {t(`${NOTIFICATION_MESSAGE}.characteristic`)} </span>
              <span className='content color-white'>
                <span> {horse?.characteristic_display} </span>
              </span>
            </div>

            <div className='extra-info d-flex align-items-center'>
              <span className='title color-grey'> {t(`${NOTIFICATION_MESSAGE}.career`)}</span>
              <span className='content color-white'>
                <span className='color-yellow'> {horse.career?.total_number_of_races} </span>{' '}
                <span>
                  {horse.career?.first_count}/{horse.career?.second_count}/{horse.career?.third_count}
                </span>
              </span>
            </div>
            <div className='extra-info d-flex align-items-center'>
              <span className='title color-grey'>{t(`${NOTIFICATION_MESSAGE}.last5Race`)}</span>
              <span className='content color-white'>{lastFiveRaces?.length ? lastFiveRaces : '---'}</span>
            </div>
          </div>
        </div>
        <div className='right-container'>
          <div className='stat-container-border'>
            <div className='stat-container d-flex flex-wrap'>{handleSortStatsType(horse?.list_horse_stats)}</div>
          </div>
        </div>
      </div>
    </ChooseHorseItemStyled>
  )
}

export default ChooseHorseItem
