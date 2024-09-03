import LoadingStyled from './styled'

interface InputProps {
  customClass?: string
  content?: string
}

function Loading({ customClass = '', content = '' }: InputProps) {
  return (
    <LoadingStyled>
      <div className={customClass}>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div className='color-white content'> {content} </div>
      </div>
    </LoadingStyled>
  )
}

export default Loading
