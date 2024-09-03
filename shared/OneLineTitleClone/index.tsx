import OneLineTitleCloneStyled from './styled'

interface OneLineTitleCloneProps {
  text: string
  customClass?: string
  contentClass?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any
}

function OneLineTitleClone({ text, customClass = '', value, contentClass }: OneLineTitleCloneProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDisplayValue = (value: any) => {
    let cloneValue = null
    switch (text) {
      case 'Career':
        cloneValue = (
          <div className='carrer'>
            <div className='carrer-detail'>
              <span className='total'>{value.split('-').shift()}</span>
              <span className='color-white'>{`-${value.split('-').pop()}`}</span>
            </div>
          </div>
        )
        break

      case 'Win rates':
        cloneValue = (
          <div className='win-rates'>
            <span className='color-white'>{value}</span>
          </div>
        )
        break

      case 'Class':
        cloneValue = (
          <div className='class'>
            <span className='color-white'>{value}</span>
          </div>
        )
        break

      default:
        cloneValue = (
          <div className='win-rates'>
            <span className='color-white'>{value}</span>
          </div>
        )
        break
    }
    return cloneValue
  }

  return (
    <OneLineTitleCloneStyled className={customClass}>
      <div className='text'>{text}</div>
      <div className={contentClass ? contentClass : 'mt-1'}>{handleDisplayValue(value)}</div>
    </OneLineTitleCloneStyled>
  )
}

export default OneLineTitleClone
