import { Route, Routes } from 'react-router-dom'

import { paths } from 'apps'
import { LoggedAccount } from './pages'
import { PublicRoute } from 'routes'
import { CloneCommonLayout } from 'layouts'

function LoggedAccountRoute() {
  return (
    <Routes>
      <Route
        path={paths.default()}
        element={
          <PublicRoute layout={CloneCommonLayout}>
            <LoggedAccount />
          </PublicRoute>
        }
      />
    </Routes>
  )
}

export default LoggedAccountRoute
