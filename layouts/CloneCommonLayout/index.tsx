import { useFocusTopScreen } from 'hooks'
import CloneCommonLayoutStyled from './styled'

interface CloneCommonLayoutProps {
  children: React.ElementType
}

function CloneCommonLayout({ children }: CloneCommonLayoutProps) {
  useFocusTopScreen()

  return (
    <CloneCommonLayoutStyled>
      <div className='content-container'>{children}</div>
    </CloneCommonLayoutStyled>
  )
}

export default CloneCommonLayout
