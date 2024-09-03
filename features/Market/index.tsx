/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, Route, Routes } from 'react-router-dom'

import { constants, links, paths } from 'apps'
import { CommonLayout } from 'layouts'
import { PublicRoute } from 'routes'
import { Market } from './pages'
import { RaceMain } from 'features/Race/pages'
import MyAsset from './pages/MyAsset'
import MyLending from './pages/MyLending'
import MyBorrow from './pages/MyBorrow'
import HorseModalAvailable from './pages/Detail'
import { useEffect } from 'react'
import { handleAsyncRequest } from 'utils/helper'
import { getSigner } from 'utils/metamask'
import { useLocalStorage } from 'hooks'


const tabs = [
  {
    name: 'Market',
    link: links.market.market()
  },
  {
    name: 'My asset',
    link: links.market.myAsset()
  },
  {
    name: 'My Lending',
    link: links.market.myLending()
  },
  {
    name: 'My borrow',
    link: links.market.myBorrow()
  }
]

function Lending() {
  const [, setUserId] = useLocalStorage(constants.USER_ID_KEY, 0)
  const [, setAccessToken] = useLocalStorage(constants.ACCESS_TOKEN_KEY, null)
  const [, setRefreshToken] = useLocalStorage(constants.REFRESH_TOKEN_KEY, null)

  const checkSignerProfile = async () => {
    const [signerError] = await handleAsyncRequest(getSigner())
    if (signerError) {
      setUserId(0)
      setAccessToken('')
      setRefreshToken('')
    }
  }
  useEffect(() => {
    checkSignerProfile()
  }, [])
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
        <Route path={paths.market.market()} element={<Market />} />
        <Route path={paths.market.myAsset()} element={<MyAsset />} />
        <Route path={paths.market.myLending()} element={<MyLending />} />
        <Route path={paths.market.myBorrow()} element={<MyBorrow />} />
      </Route>
      <Route
        path={paths.market.detail()}
        element={
          <PublicRoute layout={CommonLayout}>
            <HorseModalAvailable />
          </PublicRoute>
        }
      />
      <Route path='*' element={<Navigate replace to={paths.notFound.feature()} />} />
    </Routes>
  )
}

export default Lending
