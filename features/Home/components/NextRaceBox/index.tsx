import { links } from 'apps'
import { decimalFormatCoin } from 'apps/constants'
import { GAME_TOKEN_E_HTC, NEXT_RACE_BOTTOM_FRAME, NEXT_RACE_THUMBNAIL } from 'assets/images'
import CountDownTimeClone from 'features/Race/components/CountDownTimeClone'
import { useHandleImageError } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { RecordRace } from 'models'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ClassTag } from 'shared'
import { numberWithCommas, shortenRaceName } from 'utils/helper'
import NextRaceStyled from './styled'
interface NextRaceBoxProps {
  race: RecordRace
  customClass?: string
  isInHomePage?: boolean
}

function NextRaceBox({ race, customClass = '' }: NextRaceBoxProps) {
  const handleRaceImageError = useHandleImageError(NEXT_RACE_THUMBNAIL)
  const { t } = useTranslation()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStatus = (status: string, countDown: any) => {
    let result = null
    if (status === 'SCHEDULING') {
      result = 'scheduling ...'
    }

    if (status === 'WAITING') {
      result = <CountDownTimeClone time={countDown} />
    }

    if (status === 'LIVE') {
      result = (
        <div className='starts-in color-red font-bold d-flex align-items-center'>
          <div className='dot' /> <span className='live-text'>{t(`${NOTIFICATION_MESSAGE}.live`)}</span>
        </div>
      )
    }
    return result
  }

  return (
    <NextRaceStyled className={customClass}>
      <Link to={links.race.detail(race.id.toString())} className='next-race d-flex justify-content-between'>
        <div className='left color-white'>
          <div className='d-flex align-items-center'>
            <div className='city'>{race.course.name}</div>
            <ClassTag text={race.racing_class_name} isActive={true} customClass='next-race-tag' />
          </div>
          <div className='race-name'>{shortenRaceName(race.name)}</div>
          <div className='d-flex'>
            {race.entry_fee === 0 ? (
              <div className='price color-primary font-bold'>{t(`${NOTIFICATION_MESSAGE}.free`)}</div>
            ) : (
              <div className='price color-e-htc font-bold'>
                {race.entry_fee / 2 === 0
                  ? race.entry_fee
                  : Number.isInteger(race.entry_fee)
                    ? race.entry_fee
                    : numberWithCommas(race.entry_fee.toFixed(decimalFormatCoin))}
                <img src={GAME_TOKEN_E_HTC} alt='e-htc' />
              </div>
            )}
            <div className='text'>{handleStatus(race.status, race.count_down)}</div>
          </div>
        </div>
        <div className='right'>
          <img src={race.image || ''} alt='' className='thumbnail' onError={handleRaceImageError} />
        </div>
      </Link>
      <img src={NEXT_RACE_BOTTOM_FRAME} className='bottom-frame position-absolute' />
    </NextRaceStyled>
  )
}

export default NextRaceBox
