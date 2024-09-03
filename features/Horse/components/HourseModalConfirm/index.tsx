import { BTN_BACK, BTN_CONFIRM, CLOSE_BTN } from 'assets/images'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'
import { Modal } from 'shared'
import HourseModalStyle from './styled'

interface HorseModalRaceViewProps {
  onOverlayClick?: () => void
  onCloseButtonClick?: () => void
  onConfirm: () => void
  typeMsg?: string
}

function HorseModalConfirm({ onOverlayClick, onConfirm, onCloseButtonClick, typeMsg }: HorseModalRaceViewProps) {
  const { t } = useTranslation()
  const checkTypeModalConfirm = (typeMsg: string) => {
    switch (typeMsg) {
      case 'deleteMailItem':
        return <p className='confirm-horse-title color-white'>{t(`${NOTIFICATION_MESSAGE}.deleteMail`)}</p>
      case 'ReadAllMailItem':
        return <p className='confirm-horse-title color-white'>{t(`${NOTIFICATION_MESSAGE}.readAllMail`)}</p>
      default:
        return <p className='confirm-horse-title color-white'>{t(`${NOTIFICATION_MESSAGE}.changeStatsPoint`)}</p>
    }
  }

  return (
    <Modal onOverlayClick={onOverlayClick}>
      <HourseModalStyle>
        <div className='choose-horse-modal'>
          <button className='close-btn p-0 position-absolute' role='button' onClick={onCloseButtonClick}>
            <img src={CLOSE_BTN} alt='close' />
          </button>
          <div className='confirm-horse'>
            {checkTypeModalConfirm(typeMsg as string)}
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

export default HorseModalConfirm
