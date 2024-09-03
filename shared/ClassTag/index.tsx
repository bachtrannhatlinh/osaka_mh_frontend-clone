import ClassTagStyled from './styled'
import classNames from 'classnames'
import { removeCharacterEnd } from 'utils/helper'

interface ClassTagProps {
  isInHomePage?: boolean
  text?: string
  onTagClicked?: () => void
  isActive: boolean
  customClass?: string
}

function ClassTag({ text, onTagClicked, isActive, customClass = '', isInHomePage = false }: ClassTagProps) {
  const classTagClass = classNames('position-relative', 'd-inline-block', customClass)

  return (
    <ClassTagStyled
      className={classTagClass}
      isActive={isActive}
      isInHomePage={isInHomePage}
      canBeClicked={Boolean(onTagClicked)}
      valueText={text as string}
    >
      <div className='tag text-center position-absolute w-100' onClick={onTagClicked}>
        {isInHomePage === true ? text : removeCharacterEnd(text)}
      </div>
    </ClassTagStyled>
  )
}

export default ClassTag
