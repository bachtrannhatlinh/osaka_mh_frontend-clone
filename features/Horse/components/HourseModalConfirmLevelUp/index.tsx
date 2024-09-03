import {
  BTN_BACK,
  BTN_CONFIRM,
  FLASH_ICON,
  LEVEL_CURRENT,
  NEXT_LEVEL_UP,
  ORANGE_ARROW_RIGHT,
  ORANGE_FRAME
} from 'assets/images'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { Level } from 'models'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'shared'
import { getEnergyPercent } from 'utils/helper'
import HourseModalStyle from './styled'

interface HourseModalConfirmLevelUpProps {
  onOverlayClick?: () => void
  onCloseButtonClick?: () => void
  onConfirm: () => void
  levelHorse?: Level
  subAvatar?: string
  remainingTimeToNextEnergy: number
}

function HourseModalConfirmLevelUp({
  onOverlayClick,
  onConfirm,
  onCloseButtonClick,
  levelHorse,
  subAvatar,
  remainingTimeToNextEnergy
}: HourseModalConfirmLevelUpProps) {
  const { level, level_up_cost, id } = levelHorse as Level

  const currentEnergyPercent = useMemo<number>(
    () => getEnergyPercent(remainingTimeToNextEnergy),
    [remainingTimeToNextEnergy]
  )

  const { t } = useTranslation()

  return (
    <Modal onOverlayClick={onOverlayClick}>
      <HourseModalStyle currentEnergy={currentEnergyPercent}>
        <div className='choose-horse-modal align-items-center justify-content-between'>
          <div className='title-levelup d-flex justify-content-between'>
            <div className='withdraw text-uppercase color-white'>{'LEVEL UP ?'}</div>
          </div>
          <div className='mt-3'>
            <span
              className='color-white font-size-18'
              dangerouslySetInnerHTML={{ __html: t(`${NOTIFICATION_MESSAGE}.havePayToLevelUp`, { level_up_cost }) }}
            />
          </div>
          <div className='content-horse-level-up d-flex mt-3'>
            <div className='left-container d-flex flex-column align-items-center'>
              <div className='avatar-container d-flex align-items-center justify-content-center p-1'>
                <img src={subAvatar} className='avatar' />
              </div>
              <div className='energy-container d-flex align-items-center'>
                <img src={FLASH_ICON} alt='energy' className='energy-icon' />
                <div className='energy-bar position-relative' />
              </div>
            </div>
            <div className='right-container color-white font-size-20'>
              <div>{t(`${NOTIFICATION_MESSAGE}.amaterusWarmUp`)}</div>
              <div className='view-level-up'>
                <span className='level-current'>{level}</span>
                <img src={LEVEL_CURRENT} alt='level-current' />
                <img src={ORANGE_ARROW_RIGHT} alt='orange-arrow-right' className='orange-arrow-right' />
                <span className='next-level-up'>{id}</span>
                <img src={NEXT_LEVEL_UP} alt='level-up' className='level-up' />
              </div>
              <div className='orange-frame'>
                <img src={ORANGE_FRAME} alt='orange-frame' />
              </div>
            </div>
          </div>
          <div className='color-white font-size-20 text-center mt-4'>
            <p>{t(`${NOTIFICATION_MESSAGE}.okWithThis`)}</p>
          </div>
          <div className='confirm-horse'>
            <div className='confirm-horse-btns d-flex align-items-center justify-content-center'>
              <button className='back-btn' onClick={onCloseButtonClick}>
                <img src={BTN_BACK} alt='back' />
              </button>
              <button onClick={onConfirm} className='confirm-btn'>
                <img src={BTN_CONFIRM} alt='confirm' />
              </button>
            </div>
          </div>
        </div>
      </HourseModalStyle>
    </Modal>
  )
}

export default HourseModalConfirmLevelUp
