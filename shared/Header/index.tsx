/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import userApi from 'apis/userApi'
import { constants, links } from 'apps'
import {
  AVATAR_DEFAULT,
  DROPDOWN_ICON,
  GAME_TOKEN_E_HTC,
  GAME_TOKEN_E_PRZ,
  LOGO,
  MAIL_BOX,
  GAME_TOKEN_Z_PRZ,
  MINI_LOGO,
  DROPDOWN_ICON_BLUE
} from 'assets/images'
import { logout, setAuthState } from 'features/Auth/auth.slice'
import { setCoinUser } from 'features/Balance/coinUser.slice'
import { logoutProfile, setCurrentUser } from 'features/Profile/profile.slice'
import {
  useAppDispatch,
  useAppSelector,
  useLocalStorage,
  useOnClickOutside,
  usePreventBodyScroll,
  useToggle
} from 'hooks'
import { AuthState, Coin } from 'models'
import {
  getNumberOfMailBox,
  handleAsyncRequest,
  numberWithCommas,
  shortenRaceCourseName,
  shortenUserName
} from 'utils/helper'
import { getBalance, getCurrentUser, getSigner } from 'utils/metamask'
import MailBox from './components/MailBox'
import HeaderStyled from './styled'
import { GetUserNoticationtParams } from 'models/mailbox'
import mailbox from 'apis/mailbox'

function Header() {
  const getUserNoticationtParamsRace: GetUserNoticationtParams = {
    limit: 10,
    page: 1,
    type: 'RACE'
  }

  const getUserNoticationtParamsEvent: GetUserNoticationtParams = {
    limit: 10,
    page: 1,
    type: 'EVENT'
  }

  const getUserNoticationtParamsSystem: GetUserNoticationtParams = {
    limit: 10,
    page: 1,
    type: 'SYSTEM'
  }
  const headerMbRef = useRef<HTMLDivElement>(null)
  const burgerBtnRef = useRef<HTMLButtonElement>(null)
  const [isMenuOpened, toggleIsMenuOpened] = useToggle(false)
  const [userId, setUserId] = useLocalStorage(constants.USER_ID_KEY, 0)
  const [, setAccessToken] = useLocalStorage(constants.ACCESS_TOKEN_KEY, null)
  const [, setRefreshToken] = useLocalStorage(constants.REFRESH_TOKEN_KEY, null)
  const [, setFlagClickLogin] = useLocalStorage(constants.CLICKLOGIN, null)
  const { auth, profile, coinUser } = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  const [lengthSeenRace, setLengthSeenRace] = useState<number>(0)
  const [lengthSeenEvent, setLengthSeenEvent] = useState<number>(0)
  const [lengthSeenSystem, setLengthSeenSystem] = useState<number>(0)
  const [coinHTC, setCoinHTC] = useState<number>(0)
  const [coinPRZ, setCoinPRZ] = useState<number>(0)
  const [coinFreePRZ, setCoinFreePRZ] = useState<number>(0)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [openMailBox, setOpenMailBox] = useState<boolean>(false)
  usePreventBodyScroll(openMailBox)

  const numberOfMailBox = useMemo<number>(
    () => getNumberOfMailBox(lengthSeenRace, lengthSeenEvent, lengthSeenSystem),
    [lengthSeenRace, lengthSeenEvent, lengthSeenSystem]
  )

  useOnClickOutside(headerMbRef, e => {
    if (e.target == burgerBtnRef.current) {
      return
    }

    toggleIsMenuOpened(false)
  })

  const fetchCurrentUser = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [, currentUser]: any = await handleAsyncRequest(getCurrentUser())

    if (!currentUser) return

    const [, resultCoinUser] = await handleAsyncRequest(userApi.getUserItems())
    if (!resultCoinUser) return

    dispatch(setCurrentUser(currentUser))
    dispatch(setCoinUser(resultCoinUser.data))
    const [signerError, signer] = await handleAsyncRequest(getSigner())
    if (signerError) {
      navigate(links.home.index())
    }
    if (!signer) return

    const [, getUserNoticationtRaceResponse]: any = await handleAsyncRequest(
      mailbox.getUserNotication(getUserNoticationtParamsRace)
    )
    if (!getUserNoticationtRaceResponse) return

    const [, getUserNoticationtEventResponse]: any = await handleAsyncRequest(
      mailbox.getUserNotication(getUserNoticationtParamsEvent)
    )
    if (!getUserNoticationtEventResponse) return

    const [, getUserNoticationtSystemResponse]: any = await handleAsyncRequest(
      mailbox.getUserNotication(getUserNoticationtParamsSystem)
    )
    if (!getUserNoticationtSystemResponse) return

    setLengthSeenRace(getUserNoticationtRaceResponse.data.records.filter((item: any) => item.seen === false).length)
    setLengthSeenEvent(getUserNoticationtEventResponse.data.records.filter((item: any) => item.seen === false).length)
    setLengthSeenSystem(getUserNoticationtSystemResponse.data.records.filter((item: any) => item.seen === false).length)

    const [balanceError, balance] = await handleAsyncRequest(getBalance(signer))
    if (balanceError) {
      console.log(balanceError)
    }
    if (typeof balance !== 'string') return
    const valueHtc = balance.split(',').shift()
    const valuePrz = balance.split(',').pop()

    const authState: AuthState = {
      user_id: userId,
      isLogged: true,
      balance: {
        coinHtc: valueHtc,
        coinPrz: valuePrz
      }
    }
    dispatch(setAuthState(authState))
  }, [])

  useEffect(() => {
    const conditionNotToFetchCurrentUser: boolean =
      (auth.isLogged && userId !== 0) || (!auth.isLogged && userId === 0) || !window.ethereum
    fetchCurrentUser()
    if (conditionNotToFetchCurrentUser) return
  }, [])

  const handleLogoutClick = async () => {
    setUserId(0)
    setAccessToken('')
    setRefreshToken('')
    dispatch(logout())
    dispatch(logoutProfile())
    const [,] = await handleAsyncRequest(userApi.putUserInformation())
    localStorage.removeItem(constants.ACCESS_TOKEN_KEY)
    localStorage.removeItem(constants.REFRESH_TOKEN_KEY)
    localStorage.removeItem(constants.USER_ID_KEY)
    navigate(links.home.index())
  }

  useEffect(() => {
    if (coinUser.amount === 0) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCoinUser = (data: any) => {
      data.items.filter((item: Coin) => {
        if (item.item_type === 'E_HTC') {
          setCoinHTC(item.amount)
        }

        if (item.item_type === 'E_PRZ') {
          setCoinPRZ(item.amount)
        }

        if (item.item_type === 'FREE_PRZ') {
          setCoinFreePRZ(item.amount)
        }
      })
    }

    handleCoinUser(coinUser)
  }, [coinUser])

  const handleClickBtnLoginIn = () => {
    setFlagClickLogin(true)
    if (pathname === links.auth.index()) return
    localStorage.removeItem(constants.ACCESS_TOKEN_KEY)
    localStorage.removeItem(constants.REFRESH_TOKEN_KEY)
    localStorage.removeItem(constants.USER_ID_KEY)
  }

  const handleCloseMailBox = () => {
    setOpenMailBox(false)
  }

  const clickToPageMailBox = () => {
    return navigate(links.mailbox.index())
  }

  const slicePathName = pathname?.split('/').slice(1)[0]

  return (
    <HeaderStyled className='position-relative'>
      <div className='container'>
        <div className='header d-flex justify-content-between align-items-center position-relative'>
          <div className='header-left'>
            <Link to={links.home.index()} className='link-logo d-block'>
              <img src={LOGO} alt='home' className='logo' />
            </Link>
          </div>
          <div className='header-mid d-none d-lg-flex flex-grow-1'>
            <div className='nav font-bold'>
              <Link to={links.race.open()} className='nav-item'>
                <span className={`${slicePathName === 'race' ? 'color-primary active' : 'color-white'}`}>race</span>
                <img src={slicePathName === 'race' ? DROPDOWN_ICON_BLUE : DROPDOWN_ICON} />
              </Link>
              <Link to={links.market.market()} className='nav-item'>
                <span className={`${slicePathName === 'lending' ? 'color-primary active' : 'color-white'}`}>Lending</span>
                <img src={slicePathName === 'lending' ? DROPDOWN_ICON_BLUE : DROPDOWN_ICON} />
              </Link>
              {/* <Link to={links.home.index()} className='nav-item'>
              <span className='color-white'>about this</span>
            </Link>
            <Link to={links.home.index()} className='nav-item'>
              <span className='color-white'>other</span>
              <img src={DROPDOWN_ICON} />
            </Link> */}
            </div>
          </div>
          <div className='header-right d-none d-lg-block'>
            {auth.user_id ? (
              <div className='login-info d-flex align-items-center'>
                {numberOfMailBox > 0 ? <div className='num blink-me' /> : ''}
                <div className='block-mail-box'>
                  <img src={MAIL_BOX} alt='' className='mail-box' onClick={clickToPageMailBox} />
                </div>
                <div className='balance-container d-flex align-items-center'>
                  <div className='balance color-e-htc font-bold '>
                    {coinHTC > 0 ? coinHTC : 0}
                    <img src={GAME_TOKEN_E_HTC} alt='e-htc' className='e-htc' />
                  </div>
                </div>
                <div className='balance-container d-flex align-items-center'>
                  <div className='balance color-e-prz font-bold '>
                    {coinPRZ > 0 ? coinPRZ : 0}
                    <img src={GAME_TOKEN_E_PRZ} alt='' className='game-token-e-prz' />
                  </div>
                </div>
                <div className='balance-container d-flex align-items-center'>
                  <div className='balance color-z-prz font-bold '>
                    {coinFreePRZ > 0 ? coinFreePRZ : 0}
                    <img src={GAME_TOKEN_Z_PRZ} alt='' className='game-token-e-prz' />
                  </div>
                </div>
                <div className='separate-line'></div>
                <div className='info-container d-flex align-items-center p-0 position-relative'>
                  <div className='name color-white font-bold text-uppercase'>
                    {profile?.name?.length > 20 ? shortenUserName(profile?.name) : profile?.name}
                  </div>
                  <img src={profile.avatar ?? AVATAR_DEFAULT} alt='' className='avatar rounded-circle' />
                  <img src={DROPDOWN_ICON} alt='' className='dropdown-icon' />
                  <div className='info-dropdown position-absolute'>
                    <div className='info d-flex flex-column align-items-start'>
                      <Link className='info-link color-white' to={links.balance.index()}>
                        Balance
                      </Link>
                      <Link className='info-link color-white' to='/profile'>
                        Profile
                      </Link>
                      <button className='info-link logout-btn color-red p-0' onClick={handleLogoutClick}>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (window as any).chrome ? (
              <div onClick={handleClickBtnLoginIn}>
                <Link
                  to={links.auth.index()}
                  className='login-btn p-0 d-inline-block d-flex align-items-center justify-content-center'
                >
                  <span className={`color-primary font-bold`}>Login</span>
                  <img src={MINI_LOGO} className='position-absolute' />
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className='header-mb-right d-block d-lg-none'>
            <button
              className={`burger-btn ${isMenuOpened ? 'burger-btn--open' : ''
                } d-flex flex-column justify-content-between p-0`}
              onClick={() => toggleIsMenuOpened()}
              ref={burgerBtnRef}
            >
              <span className='stick stick-1 d-block' />
              <span className='stick stick-2 d-block' />
              <span className='stick stick-3 d-block' />
            </button>
          </div>
        </div>
        <div
          className={`header-mb ${isMenuOpened ? 'header-mb--open' : ''} d-block d-lg-none position-absolute`}
          ref={headerMbRef}
        >
          <div className='header-mb-container container'>
            <div className='nav font-bold d-flex flex-column '>
              <Link to={links.race.index()} className='nav-item py-3'>
                <span className='color-white'>race</span>
                <img src={DROPDOWN_ICON} />
              </Link>
              {/* <Link to={links.home.index()} className='nav-item py-3'>
              <span className='color-white'>market place</span>
              <img src={DROPDOWN_ICON} />
            </Link>
            <Link to={links.home.index()} className='nav-item py-3'>
              <span className='color-white'>about this</span>
            </Link>
            <Link to={links.home.index()} className='nav-item py-3'>
              <span className='color-white'>other</span>
              <img src={DROPDOWN_ICON} />
            </Link> */}
            </div>
            <div className='login-container d-flex justify-content-center'>
              {auth.user_id ? (
                <div className='info-nav d-flex flex-column align-items-stretch w-100'>
                  <div className='nav-item font-bold py-3 d-flex align-items-center text-uppercase'>
                    <div className='balance-container d-flex align-items-center'>
                      <div className='balance color-e-htc font-bold '>
                        {numberWithCommas(coinHTC)}
                        <img src={GAME_TOKEN_E_HTC} alt='e-htc' className='e-htc' />
                      </div>
                    </div>
                    <div className='balance-container d-flex align-items-center'>
                      <div className='balance color-e-prz font-bold '>
                        {numberWithCommas(coinPRZ)}
                        <img src={GAME_TOKEN_E_PRZ} alt='' className='game-token-e-prz' />
                      </div>
                    </div>
                    <div className='info-container d-flex align-items-center p-0 position-relative'>
                      <div className='name color-white font-bold text-uppercase'>
                        {profile.name.length > 20 ? shortenRaceCourseName(profile.name) : profile.name}
                      </div>
                      <img src={profile.avatar ?? AVATAR_DEFAULT} alt='' className='avatar rounded-circle' />
                    </div>
                  </div>
                  <Link to={links.balance.index()} className='nav-item font-bold color-white py-3 text-uppercase'>
                    Balance
                  </Link>
                  <Link to={links.profile.index()} className='nav-item font-bold color-white py-3 text-uppercase'>
                    Profile
                  </Link>
                  <button
                    className='nav-item logout-btn font-bold color-red py-3 text-uppercase p-0 text-start'
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to={links.auth.index()} className='login-btn color-primary font-bold my-3 w-100 text-center'>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {openMailBox && <MailBox onCloseMailBox={handleCloseMailBox} />}
    </HeaderStyled>
  )
}

export default Header
