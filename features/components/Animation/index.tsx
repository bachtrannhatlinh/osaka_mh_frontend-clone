import AnimationStyled from './styled'
import classNames from 'classnames'


interface AnimationProps {
  customClass?: string
}

function Animation({ customClass = '' }: AnimationProps) {
  const animationClass = classNames('position-relative', customClass)
  return (
    <AnimationStyled className={animationClass}>
      <div className="pyro"><div className="before"></div><div className="after"></div></div>
    </AnimationStyled>
  )
}

export default Animation
