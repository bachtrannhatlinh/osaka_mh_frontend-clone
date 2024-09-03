import { Route, Routes } from 'react-router-dom'

import { paths } from 'apps'
import { PageNotFound } from './pages'

function PageNotFoundRoute() {
  return (
    <Routes>
      <Route path={paths.default()} element={<PageNotFound />} />
    </Routes>
  )
}

export default PageNotFoundRoute
