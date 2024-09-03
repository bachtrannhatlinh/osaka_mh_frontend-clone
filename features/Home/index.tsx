import { paths } from 'apps'
import { CommonLayout } from 'layouts'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicRoute } from 'routes'
import { Help, HomeMain, Privacy, Terms } from './pages'

function Home() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <PublicRoute layout={CommonLayout}>
            <HomeMain />
          </PublicRoute>
        }
      />
      <Route
        path={paths.home.help()}
        element={
          <PublicRoute layout={CommonLayout}>
            <Help />
          </PublicRoute>
        }
      />
      <Route
        path={paths.home.terms()}
        element={
          <PublicRoute layout={CommonLayout}>
            <Terms />
          </PublicRoute>
        }
      />
      <Route
        path={paths.home.privacy()}
        element={
          <PublicRoute layout={CommonLayout}>
            <Privacy />
          </PublicRoute>
        }
      />
      <Route path='*' element={<Navigate replace to={paths.notFound.feature()} />} />
    </Routes>
  )
}

export default Home
