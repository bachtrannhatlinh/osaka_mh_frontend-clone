import { Navigate, Route, Routes } from 'react-router-dom'

import { paths } from 'apps'
import { CommonLayout } from 'layouts'
import { PublicRoute } from 'routes'
import { ProfileMain } from './pages'

function Login() {
  return (
    <Routes>
      <Route
        path={paths.default()}
        element={
          <PublicRoute layout={CommonLayout}>
            <ProfileMain />
          </PublicRoute>
        }
      />
      <Route path='*' element={<Navigate replace to={paths.notFound.feature()} />} />
    </Routes>
  )
}

export default Login
