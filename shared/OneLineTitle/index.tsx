import { ONE_LINE, YELLOW_LINE_HORSE } from 'assets/images'
import OneLineTitleStyled from './styled'

interface OneLineTitleProps {
  text: string
  customClass?: string
  total?: number
  isLending?: boolean
}

function OneLineTitle({ text, customClass = '', total, isLending }: OneLineTitleProps) {
  return (
    <OneLineTitleStyled className={customClass}>
      <div className={`text font-bold ${isLending ? 'lending' : ''}`}> {total} {text}</div>
      <img src={isLending ? YELLOW_LINE_HORSE : ONE_LINE} alt='' className='line' width={100} />
    </OneLineTitleStyled>
  )
}

export default OneLineTitle
