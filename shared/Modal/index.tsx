import ReactDOM from 'react-dom'
import ModalStyled from './styled'
import { SyntheticEvent } from 'react'

interface ModalProps {
  children: React.ReactNode
  onOverlayClick?: () => void
}

function Modal({ children, onOverlayClick }: ModalProps) {
  const handleOverlayClicked = () => {
    if (!onOverlayClick) return

    onOverlayClick()
  }

  const handleChildrenContainerClicked = (e: SyntheticEvent) => {
    e.stopPropagation()
  }

  return ReactDOM.createPortal(
    <ModalStyled>
      <div className='modal-overlay' onClick={handleOverlayClicked}>
        <div className='children-container' onClick={handleChildrenContainerClicked}>
          {children}
        </div>
      </div>
    </ModalStyled>,
    document.getElementById('portal') as HTMLElement
  )
}

export default Modal
