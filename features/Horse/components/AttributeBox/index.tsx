import { YELLOW_LINE } from 'assets/images'
import AttributeBoxStyled from './styled'

interface AttributeBoxProps {
  title: string
  value: string
  customClass?: string
  total?: number
}

function AttributeBox({ title, value, customClass = '', total }: AttributeBoxProps) {
  return (
    <AttributeBoxStyled className={customClass}>
      <div className='attribute-box position-relative'>
        <div className='title color-yellow'>{title}</div>
        <div className='value'>
          <span className='color-yellow'>{total}</span>
          <span className='color-white'>{value}</span>
        </div>
        <img src={YELLOW_LINE} alt='' className='position-absolute line' />
      </div>
    </AttributeBoxStyled>
  )
}

export default AttributeBox
