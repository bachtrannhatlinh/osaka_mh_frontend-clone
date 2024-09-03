import { Navigate, Route, Routes } from 'react-router-dom'

import { paths } from 'apps'
import { CommonLayout } from 'layouts'
import { PublicRoute } from 'routes'
import { HorseMain, HorseDetail, HorseDetailRaceView } from './pages'

function Horse() {
  return (
    <Routes>
      <Route
        path={paths.default()}
        element={
          <PublicRoute layout={CommonLayout}>
            <HorseMain />
          </PublicRoute>
        }
      />
      <Route
        path={paths.horse.detail()}
        element={
          <PublicRoute layout={CommonLayout}>
            <HorseDetail />
          </PublicRoute>
        }
      />
      <Route
        path={paths.horse.detailRaceView()}
        element={
          <PublicRoute layout={CommonLayout}>
            <HorseDetailRaceView />
          </PublicRoute>
        }
      />
      <Route path='*' element={<Navigate replace to={paths.notFound.feature()} />} />
    </Routes>
  )
}

export default Horse
