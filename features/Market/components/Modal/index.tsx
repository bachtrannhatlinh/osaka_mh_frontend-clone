import { CLOSE_BTN } from 'assets/images'
import ModalCommonStyled from './styled'
import { Modal } from 'shared';

interface IModalCommonProps {
  onOverlayClick?: () => void
  onCloseButtonClick?: () => void
  children: React.ReactNode
}

function ModalCommon(props: IModalCommonProps) {
  const { onOverlayClick, onCloseButtonClick } = props
  return (
    <Modal onOverlayClick={onOverlayClick}>
      <ModalCommonStyled>
        <>
          <button className='close-btn p-0 position-absolute' role='button' onClick={onCloseButtonClick}>
            <img src={CLOSE_BTN} alt='close' />
          </button>
          <div className='quick-view'>
            <div className='container'>
              <div className='quick-view-box'>
                <div className='quick-view-container'>
                  {props?.children}
                </div>
              </div>
            </div>
          </div>
        </>
      </ModalCommonStyled>
    </Modal>
  )
}

export default ModalCommon
