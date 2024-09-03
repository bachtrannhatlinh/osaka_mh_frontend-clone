import { Navigate, Route, Routes } from 'react-router-dom'

import { links, paths } from 'apps'
import { CommonLayout } from 'layouts'
import { PublicRoute } from 'routes'
import { RaceMain, RaceOpen, RaceDetail, RaceScheduledRaces, RaceResult } from './pages'

const tabs = [
  {
    name: 'open',
    link: links.race.open()
  },
  {
    name: 'scheduled race',
    link: links.race.scheduledRaces()
  },
  {
    name: 'result',
    link: links.race.result()
  }
]
function Race() {
  return (
    <Routes>
      <Route
        path={paths.default()}
        element={
          <PublicRoute layout={CommonLayout}>
            <RaceMain titleTabs={tabs} />
          </PublicRoute>
        }
      >
        <Route path={paths.race.open()} element={<RaceOpen />} />
        <Route path={paths.race.scheduledRaces()} element={<RaceScheduledRaces />} />
        <Route path={paths.race.result()} element={<RaceResult />} />
        <Route path='*' element={<Navigate replace to={paths.notFound.feature()} />} />
      </Route>
      <Route
        path={paths.race.detail()}
        element={
          <PublicRoute layout={CommonLayout}>
            <RaceDetail />
          </PublicRoute>
        }
      />
      <Route path='*' element={<Navigate replace to={paths.notFound.feature()} />} />
    </Routes>
  )
}

export default Race
