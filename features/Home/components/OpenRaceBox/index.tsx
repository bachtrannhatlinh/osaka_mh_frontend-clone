import { links } from 'apps'
import { decimalFormatCoin } from 'apps/constants'
import { GAME_TOKEN_E_HTC, OPEN_RACE_THUMBNAIL } from 'assets/images'
import { useHandleImageError } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { RecordRace } from 'models'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ClassTag } from 'shared'
import { numberWithCommas } from 'utils/helper'
import OpenRaceStyled from './styled'

interface OpenRaceBoxProps {
  race: RecordRace
  customClass?: string
}

function OpenRaceBox({ race, customClass = '' }: OpenRaceBoxProps) {
  const handleRaceImageError = useHandleImageError(OPEN_RACE_THUMBNAIL)
  const { t } = useTranslation()
  return (
    <OpenRaceStyled className={customClass}>
      <div className='open-race'>
        <div className='top position-relative'>
          <div className='top-frame position-absolute' />
          <img src={race.image || ''} alt='' onError={handleRaceImageError} />

          <div className='slot position-absolute d-flex align-items-center justify-content-center'>
            <span className='color-white'>{race.registered}/12</span>
          </div>
        </div>
        <div className='bottom color-white'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='city mb-2 color-primary'>{race.course.name}</div>
            <div className='classtag'>
              <ClassTag text={race.racing_class_name} isActive={true} />
            </div>
          </div>
          <div className='d-block name '>
            <div className='mb-2 race-name'>{race.name}</div>
            <div className='d-flex justify-content-between'>
              <div className='mb-2 color-orange'>{race.field_type}</div>
              <div className='mb-2 color-yellow'>{race.distance}</div>
            </div>
          </div>
          <div className='action d-flex align-items-center justify-content-between'>
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
            <Link
              to={links.race.detail(race.id.toString())}
              className='enter-btn p-0 color-secondary font-bold d-flex align-items-center justify-content-center'
            >
              <span>{t(`${NOTIFICATION_MESSAGE}.enter`)}</span>
            </Link>
          </div>
        </div>
      </div>
    </OpenRaceStyled>
  )
}

export default OpenRaceBox
