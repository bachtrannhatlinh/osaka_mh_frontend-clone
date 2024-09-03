import { Navigate, Route, Routes } from 'react-router-dom'

import { paths } from 'apps'
import { CommonLayout } from 'layouts'
import { PublicRoute } from 'routes'
import { EventMail, MailBoxMain, RaceMail, SystemMail } from './pages'

function MailBox() {
  return (
    <Routes>
      <Route
        path={paths.default()}
        element={
          <PublicRoute layout={CommonLayout}>
            <MailBoxMain />
          </PublicRoute>
        }
      >
        <Route path={paths.mailbox.raceMail()} element={<RaceMail />} />
        <Route path={paths.mailbox.eventMail()} element={<EventMail />} />
        <Route path={paths.mailbox.systemMail()} element={<SystemMail />} />
        <Route path='*' element={<Navigate replace to={paths.notFound.feature()} />} />
      </Route>
      <Route path='*' element={<Navigate replace to={paths.notFound.feature()} />} />
    </Routes>
  )
}

export default MailBox
