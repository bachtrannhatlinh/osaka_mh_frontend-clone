import { TWO_LINE } from 'assets/images'
import TwoLineTitleStyled from './styled'

interface TwoLineTitleProps {
  text: string
  customClass?: string
}

function TwoLineTitle({ text, customClass = '' }: TwoLineTitleProps) {
  return (
    <TwoLineTitleStyled className={customClass}>
      <div className='text color-primary font-bold'>{text}</div>
      <img src={TWO_LINE} alt='' className='line' />
    </TwoLineTitleStyled>
  )
}

export default TwoLineTitle
