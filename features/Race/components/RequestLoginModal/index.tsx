import RequestLoginModalStyled from './styled'
import { Modal } from 'shared'
import { useTranslation } from 'react-i18next'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'

interface RequestLoginModalProps {
  toggleIsModalOpen: (value: boolean) => void
}

function RequestLoginModal({ toggleIsModalOpen }: RequestLoginModalProps) {
  const handleOverlayClick = () => {
    toggleIsModalOpen(false)
  }

  const handleCancelButtonClick = () => {
    toggleIsModalOpen(false)
  }

  const { t } = useTranslation()

  return (
    <Modal onOverlayClick={handleOverlayClick}>
      <RequestLoginModalStyled>
        <div className='request-login-modal d-flex flex-column justify-content-between'>
          <p className='color-white text-center font-size-20 mt-4'>{t(`${NOTIFICATION_MESSAGE}.pleaseLogin`)}</p>
          <div className='btn-container d-flex justify-content-center'>
            <button className='cancel-btn' onClick={handleCancelButtonClick}>
              <span className='color-primary font-bold'>{t(`${NOTIFICATION_MESSAGE}.cancel`)}</span>
            </button>
          </div>
        </div>
      </RequestLoginModalStyled>
    </Modal>
  )
}

export default RequestLoginModal
