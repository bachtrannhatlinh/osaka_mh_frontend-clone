import { BTN_OK, CANCEL_COUNT_DOWN, CLOSE_BTN, ONE_LINE_ORANGE } from 'assets/images'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { Modal } from 'shared'
import ResultHorseModalStyled from './styled'

interface ResultHorseModalProps {
  toggleIsModalOpen?: (value?: boolean) => void
  toggleIsChooseHorseModal?: (value?: boolean) => void
  onCloseButtonClick?: () => void
  title?: string
  message: ReactNode
  onOk?: () => void
  exchangeCoin?: boolean
  btnCancel?: boolean
}

function ResultHorseModal({
  toggleIsModalOpen,
  message,
  title = 'warning',
  onCloseButtonClick,
  onOk,
  exchangeCoin = false,
  btnCancel = false,
}: ResultHorseModalProps) {
  const classTitle = classNames([
    'race-name color-orange text-uppercase d-flex align-items-start flex-column',
    (title === 'completed' || title === 'success!') && 'color-primary'
  ])

  const classTitleFailed = classNames([
    'race-name color-orange text-uppercase d-flex align-items-start flex-column',
    title === 'failed!' && 'color-red'
  ])

  const handleClassTitle = () => {
    switch (title) {
      case 'completed':
        return classTitle
      case 'success!':
        return classTitle
      case 'failed!':
        return classTitleFailed
      default:
        return classTitle
    }
  }

  return (
    <Modal onOverlayClick={toggleIsModalOpen}>
      <ResultHorseModalStyled>
        <div className='choose-horse-modal'>
          {exchangeCoin === true ? (
            ' '
          ) : (
            <button className='close-btn p-0 position-absolute' role='button' onClick={onCloseButtonClick}>
              <img src={CLOSE_BTN} alt='close' />
            </button>
          )}
          <div className='race-name-container'>
            <p className={handleClassTitle()}>
              <span className='d-block'>{title}</span>
              <img src={ONE_LINE_ORANGE} alt='' />
            </p>
          </div>
          <div className='confirm-horse'>
            <div className='confirm-horse-message text-white'>{message}</div>
            {title !== 'completed' && (
              <div className='confirm-horse-btns d-flex align-items-center justify-content-end'>
                {btnCancel && (
                  <button onClick={onCloseButtonClick} className='confirm-btn pe-5'>
                    <img width={145} src={CANCEL_COUNT_DOWN} alt='cancel' />
                  </button>
                )}
                {
                  onOk && <button onClick={onOk} className='confirm-btn'>
                    <img src={BTN_OK} alt='confirm' />
                  </button>
                }
              </div>
            )}
          </div>
        </div>
      </ResultHorseModalStyled>
    </Modal>
  )
}

export default ResultHorseModal
