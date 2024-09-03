import { Modal } from 'shared'
import ConfirmOkModalStyled from './styled'
import { CLOSE_BTN, ONE_LINE_ORANGE } from 'assets/images'
import Button from 'shared/Button'
import { ReactNode } from 'react'
import classNames from 'classnames'
import { MODAL_TYPE } from 'models'

interface ConfirmOkModalProps {
  toggleIsModalOpen?: (value?: boolean) => void
  onCloseButtonClick: () => void
  onConfirm?: () => void
  message: ReactNode
  title?: string
  isLoading?: boolean
  btnOk?: string
  btnCancel?: string
}

function ConfirmOkModal({ btnOk, btnCancel, toggleIsModalOpen, onCloseButtonClick, onConfirm, message, title, isLoading }: ConfirmOkModalProps) {
  const handleBackModalCancel = () => {
    onCloseButtonClick()
  }

  const classTitle = classNames([
    'race-name color-orange text-uppercase d-flex align-items-center flex-column',
    (title === 'completed' || title === 'success!') && 'color-primary'
  ])

  const classTitleFailed = classNames([
    'race-name color-orange text-uppercase d-flex align-items-center flex-column',
    title === MODAL_TYPE.failed && 'color-red'
  ])


  const handleClassTitle = () => {
    switch (title) {
      case MODAL_TYPE.completed:
        return classTitle
      case MODAL_TYPE.success:
        return classTitle
      case MODAL_TYPE.failed:
        return classTitleFailed
      default:
        return classTitle
    }
  }

  return (
    <Modal onOverlayClick={toggleIsModalOpen ? toggleIsModalOpen : undefined}>
      <ConfirmOkModalStyled>
        <div className='choose-horse-modal'>
          {title &&
            <div className='race-name-container'>
              <p className={handleClassTitle()}>
                <span className='d-block'>{title}
                  <img className='line-bottom' src={ONE_LINE_ORANGE} alt='' />
                </span>
              </p>
            </div>
          }
          <button className='close-btn p-0 position-absolute' role='button' onClick={handleBackModalCancel}>
            <img src={CLOSE_BTN} alt='close' />
          </button>
          <div className='confirm-horse'>
            <div className='text'>
              {message}
            </div>
            <div className='confirm-horse-btns d-flex align-items-center justify-content-center'>
              {title === MODAL_TYPE.failed || title === MODAL_TYPE.success ? <Button buttonName='OK' onClickButton={handleBackModalCancel} width={150} /> :
                <>
                  <Button buttonName={`${btnOk ? btnOk : 'Yes'}`} onClickButton={() => onConfirm?.()} width={150} isLoading={isLoading} />
                  <Button buttonName={`${btnCancel ? btnCancel : 'No'}`} onClickButton={handleBackModalCancel} width={150} btnCancel />
                </>
              }

            </div>
          </div>
        </div>
      </ConfirmOkModalStyled>
    </Modal>
  )
}

export default ConfirmOkModal
