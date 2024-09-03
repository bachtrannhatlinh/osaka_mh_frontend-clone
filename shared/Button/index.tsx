import { BG_BUTTON, BTN_CANCEL } from 'assets/images'
import { Spin } from 'antd';
import ButtonStyled from './styled'

interface ButtonProps {
  onClickButton: () => void
  buttonName: string
  disabled?: boolean
  width?: number
  btnCancel?: boolean,
  isLoading?: boolean
}

function Button({
  onClickButton,
  buttonName,
  disabled,
  width = 215,
  btnCancel,
  isLoading
}: ButtonProps) {

  const handleClick = () => {
    if (disabled || isLoading) return
    onClickButton()
  }

  return (
    <ButtonStyled >
      <div className={`btn-container-${disabled || isLoading ? 'disable' : ''}`} onClick={handleClick} >
        <img src={btnCancel ? BTN_CANCEL : BG_BUTTON} alt='' className='background-btn' width={width} height={50} />
        <span className='btn-name'>{isLoading && <Spin className='mt-2 mr-3' />}{buttonName}</span>
      </div>
    </ButtonStyled>
  )
}

export default Button
