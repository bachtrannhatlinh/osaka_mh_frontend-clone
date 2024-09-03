import { Route, Routes } from 'react-router-dom'

import { paths } from 'apps'
import { Maintenace } from './pages'
import { PublicRoute } from 'routes'
import { LayoutMaintenace } from 'layouts'

function MaintenaceRoute() {
  return (
    <Routes>
      <Route
        path={paths.default()}
        element={
          <PublicRoute layout={LayoutMaintenace}>
            <Maintenace />
          </PublicRoute>
        }
      />
    </Routes>
  )
}

export default MaintenaceRoute
