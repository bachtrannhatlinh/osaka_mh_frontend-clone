import { Navigate, Route, Routes } from 'react-router-dom'

import { paths } from 'apps'
import { DisableAccount } from './pages'
import { PublicRoute } from 'routes'
import { CloneCommonLayout } from 'layouts'

function DisableAccountRoute() {
  return (
    <Routes>
      <Route
        path={paths.default()}
        element={
          <PublicRoute layout={CloneCommonLayout}>
            <DisableAccount />
          </PublicRoute>
        }
      />
      <Route path='*' element={<Navigate replace to={paths.notFound.feature()} />} />
    </Routes>
  )
}

export default DisableAccountRoute
