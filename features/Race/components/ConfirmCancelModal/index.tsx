import { Modal } from 'shared'
import ConfirmCancelModalStyled from './styled'
import { BTN_BACK, BTN_CONFIRM, CLOSE_BTN } from 'assets/images'
import { useTranslation } from 'react-i18next'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'

interface ConfirmCancelModalProps {
  toggleIsModalOpen: (value?: boolean) => void
  onCloseButtonClick: () => void
  onConfirm: () => void
}

function ConfirmCancelModal({ toggleIsModalOpen, onCloseButtonClick, onConfirm }: ConfirmCancelModalProps) {
  const { t } = useTranslation()
  const handleBackModalCancel = () => {
    onCloseButtonClick()
  }
  return (
    <Modal onOverlayClick={toggleIsModalOpen}>
      <ConfirmCancelModalStyled>
        <div className='choose-horse-modal'>
          <button className='close-btn p-0 position-absolute' role='button' onClick={handleBackModalCancel}>
            <img src={CLOSE_BTN} alt='close' />
          </button>
          <div className='confirm-horse'>
            <p className='confirm-horse-title color-white'>{t(`${NOTIFICATION_MESSAGE}.areYouCancel`)}</p>
            <div className='confirm-horse-btns d-flex align-items-center justify-content-center'>
              <button className='back-btn' onClick={handleBackModalCancel}>
                <img src={BTN_BACK} alt='back' />
              </button>
              <button onClick={onConfirm} className='confirm-btn'>
                <img src={BTN_CONFIRM} alt='confirm' />
              </button>
            </div>
          </div>
        </div>
      </ConfirmCancelModalStyled>
    </Modal>
  )
}

export default ConfirmCancelModal
