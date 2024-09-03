import { useFocusTopScreen } from 'hooks'
import LayoutMaintenaceStyled from './styled'

interface LayoutMaintenaceProps {
  children: React.ElementType
}

function LayoutMaintenace({ children }: LayoutMaintenaceProps) {
  useFocusTopScreen()

  return (
    <LayoutMaintenaceStyled>
      <div className='content-container'>{children}</div>
    </LayoutMaintenaceStyled>
  )
}

export default LayoutMaintenace
