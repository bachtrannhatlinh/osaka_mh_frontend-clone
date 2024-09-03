import { paths } from 'apps'
import {
  AuthFeature,
  BalanceFeature,
  HomeFeature,
  HorseFeature,
  MaintenaceFeature,
  LendingFeature,
  ProfileFeature,
  RaceFeature,
  DisableAccountFeature,
  PageNotFoundFeature,
  LoggedAccountFeature,
  MailBoxFeature
} from 'features'
import Mobile from 'features/Mobile/pages/Mobile'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
function GlobalRoute() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home.feature()} element={<HomeFeature />} />
        <Route path={paths.race.feature()} element={<RaceFeature />} />
        <Route path={paths.auth.feature()} element={<AuthFeature />} />
        <Route path={paths.horse.feature()} element={<HorseFeature />} />
        <Route path={paths.profile.feature()} element={<ProfileFeature />} />
        <Route path={paths.market.feature()} element={<LendingFeature />} />
        <Route path={paths.balance.feature()} element={<BalanceFeature />} />
        <Route path={paths.maintenace.feature()} element={<MaintenaceFeature />} />
        <Route path={paths.disableAccount.feature()} element={<DisableAccountFeature />} />
        <Route path={paths.loggedAccount.feature()} element={<LoggedAccountFeature />} />
        <Route path={paths.notFound.feature()} element={<PageNotFoundFeature />} />
        <Route path={paths.mobile.feature()} element={<Mobile />} />
        <Route path={paths.mailbox.feature()} element={<MailBoxFeature />} />
        <Route path='*' element={<Navigate replace to={paths.notFound.feature()} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default GlobalRoute
export { default as PrivateRoute } from './PrivateRoute'
export { default as PublicRoute } from './PublicRoute'
