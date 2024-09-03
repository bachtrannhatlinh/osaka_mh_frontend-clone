import { CARET_LEFT } from 'assets/images'
import { useNavigate } from 'react-router-dom';
import BtnBackStyled from './styled'

interface BtnBackProps {
  onBack?: () => void
}

function BtnBack({
  onBack
}: BtnBackProps) {

  const navigate = useNavigate();
  const handleBackClick = () => {
    if (onBack) {
      onBack?.()
    }
    else navigate(-1)
  }

  return (
    <BtnBackStyled >
      <div className='btn-back' onClick={handleBackClick}>
        <div><img src={CARET_LEFT} alt='' /></div>
        <span className='btn-name'>BACK</span>
      </div>
    </BtnBackStyled >
  )
}

export default BtnBack
