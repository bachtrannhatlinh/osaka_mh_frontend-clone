import { Navigate } from 'react-router-dom'

import { links } from 'apps'

interface PrivateRouteProps {
  isAuth: boolean
  navigate: string
  layout: React.ElementType
  children: React.ReactNode
}

function PrivateRoute({ isAuth, layout: Layout, navigate = links.home.index(), children }: PrivateRouteProps) {
  return isAuth ? <Layout>{children}</Layout> : <Navigate to={navigate} />
}

export default PrivateRoute
