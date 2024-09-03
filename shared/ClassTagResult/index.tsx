import ClassTagResultStyled from './styled'
import classNames from 'classnames'
import { removeCharacterEnd } from 'utils/helper'

interface ClassTagPropsResult {
  isInHomePage?: boolean
  text?: string
  onTagClicked?: () => void
  isActive: boolean
  customClass?: string
  atResultRace?: boolean
}

function ClassTagResult({
  text,
  onTagClicked,
  isActive,
  customClass = '',
  isInHomePage = false,
  atResultRace = false
}: ClassTagPropsResult) {
  const classTagClass = classNames('position-relative', 'd-inline-block', customClass)

  return (
    <ClassTagResultStyled
      className={classTagClass}
      isActive={isActive}
      isInHomePage={isInHomePage}
      canBeClicked={Boolean(onTagClicked)}
      valueText={text as string}
      atResultRace={atResultRace}
    >
      <div className='tag text-center position-absolute w-100 ' onClick={onTagClicked}>
        {isActive ? removeCharacterEnd(text) : text}
      </div>
    </ClassTagResultStyled>
  )
}

export default ClassTagResult
