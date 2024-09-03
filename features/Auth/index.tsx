import { Route, Routes } from 'react-router-dom'

import { paths } from 'apps'
import { CommonLayout } from 'layouts'
import { PublicRoute } from 'routes'
import { AuthMain } from './pages'

function Auth() {
  return (
    <Routes>
      <Route
        path={paths.default()}
        element={
          <PublicRoute layout={CommonLayout}>
            <AuthMain />
          </PublicRoute>
        }
      />
    </Routes>
  )
}

export default Auth
