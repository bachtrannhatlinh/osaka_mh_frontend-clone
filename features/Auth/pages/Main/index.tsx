/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import authApi from 'apis/authApi'
import userApi from 'apis/userApi'
import { configs, constants, links, MESSAGE } from 'apps'
import messages from 'apps/messages'
import { METAMASK_LOGIN_BTN } from 'assets/images'
import classNames from 'classnames'
import { setAuthState } from 'features/Auth/auth.slice'
import ConnectH2hModal from 'features/Profile/components/ConnectH2Hmodal'
import { setCurrentUser } from 'features/Profile/profile.slice'
import { ResultHorseModal } from 'features/Race/components'
import { useAppDispatch, useAppSelector, useLocalStorage, useReloadCurrentPage, useToggle } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { AuthState, PostLoginError } from 'models'
import { useTranslation } from 'react-i18next'
import { TwoLineTitle } from 'shared'
import { handleAsyncRequest } from 'utils/helper'
import {
  checkCurrentNetwork,
  getBalance,
  getCurrentUser,
  getPostLoginBody,
  getRandomMessage,
  getSigner,
  isEthereumWalletInstalled,
  isRequestAccountsError
} from 'utils/metamask'
import AuthStyled from './styled'

function Auth() {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useLocalStorage(constants.ACCESS_TOKEN_KEY, null)
  const [, setRefreshToken] = useLocalStorage(constants.REFRESH_TOKEN_KEY, null)
  const [, setStorageUserId] = useLocalStorage(constants.USER_ID_KEY, 0)
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)
  const navigate = useNavigate()
  const [openConnectH2hModal, setOpenConnectH2hModal] = useToggle(false)
  const [valueFirstWebLogin, setValueFirstWebLogin] = useState<boolean>(false)
  const [firstLoginH2H, setFirstLoginH2H] = useState<boolean>(false)
  const [flagMetamask, setFlagMetamask] = useState<boolean>(false)
  const [isModalResultHorseOpen, toggleIsModalResultHorseOpen] = useToggle(false)
  const { t } = useTranslation()
  const metaMaskButtonClass = classNames('login-btn', 'p-0', { ['login-btn--loading']: isLoading })
  const handleCloseModalResult = () => toggleIsModalResultHorseOpen(false)
  const flagClickLogin = localStorage.getItem('clickLogin') as any

  useEffect(() => {
    if (flagClickLogin === true) {
      setIsLoading(false)
    }
  }, [flagClickLogin])



  useEffect(() => {
    if (accessToken && valueFirstWebLogin == false) {
      navigate(links.home.index())
      useReloadCurrentPage()
    }
  }, [auth, valueFirstWebLogin])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isPostLoginError = (candidate: any): candidate is PostLoginError => {
    const isValid: boolean =
      candidate.code === constants.HTTP_STATUS.BAD_REQUEST && typeof candidate.message === 'string'

    return isValid
  }

  const handleOk = () => {
    toggleIsModalResultHorseOpen(false)
  }

  const handleMetamaskLoginClicked = async () => {
    if (isLoading) return

    flagClickLogin === false && setIsLoading(true)
    if (!isEthereumWalletInstalled()) {
      toggleIsModalResultHorseOpen(true)
      setFlagMetamask(true)
    }

    const chainID = window.ethereum.networkVersion
    if (chainID) {
      if (checkCurrentNetwork()) {
        localStorage.removeItem(constants.CLICKLOGIN)
        const [signerError, signer] = await handleAsyncRequest(getSigner())
        if (signerError && isRequestAccountsError(signerError)) {
          // -32002: Already processing eth_requestAccounts. Please wait.
          // 4001: user declined the request
          window.ethereum.request({
            method: 'wallet_requestPermissions',
            params: [
              {
                eth_accounts: {}
              }
            ]
          })
          setErrorMessage(messages.please_login_metamask)
          return
        }
        if (!signer) return

        const [, randomMessage] = await handleAsyncRequest(getRandomMessage())
        if (!randomMessage) return

        const [loginError, postLoginBody] = await handleAsyncRequest(getPostLoginBody(signer, randomMessage))

        if (loginError && isRequestAccountsError(loginError)) {
          setIsLoading(false)
          return
        }

        if (!postLoginBody) return

        const [postLoginError, loginResponse] = await handleAsyncRequest(authApi.postLogin(postLoginBody))
        if (postLoginError && isPostLoginError(postLoginError)) {
          setErrorMessage(postLoginError.message)
        }
        if (!loginResponse) return

        const {
          data: { access_token, refresh_token, user_id }
        } = loginResponse

        setAccessToken(access_token)
        setRefreshToken(refresh_token)
        setStorageUserId(user_id)

        const [, currentUser] = await handleAsyncRequest(getCurrentUser())
        if (!currentUser) return

        const [, result] = await handleAsyncRequest(userApi.getUserInformation())
        if (!result) return ''
        if (result.data.first_web_login === true) {
          setOpenConnectH2hModal(true)
          setValueFirstWebLogin(true)
          setFirstLoginH2H(true)
        }

        const [, balance] = await handleAsyncRequest(getBalance(signer))
        if (typeof balance !== 'string') return

        const valueHtc = balance.split(',').shift()
        const valuePrz = balance.split(',').pop()

        const authState: AuthState = {
          user_id,
          isLogged: true,
          isFirstLogin: true,
          balance: {
            coinHtc: valueHtc,
            coinPrz: valuePrz
          }
        }

        dispatch(setAuthState(authState))
        dispatch(setCurrentUser(currentUser))
      } else {
        // toggleIsModalResultHorseOpen(true)
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: configs.chainIdDirect,
                rpcUrls: [configs.linkRpcUrls],
                chainName: configs.nameChain,
                nativeCurrency: {
                  name: configs.nameCurrency,
                  symbol: configs.nameCurrency,
                  decimals: +configs.valueDecimals
                },
                blockExplorerUrls: [configs.linkBlockExplorerUrls]
              }
            ]
          })
        } catch (addError) {
          console.log(addError, 'addError')
        }
      }
      // setIsLoading(false)
    } else {
      useReloadCurrentPage()
    }
  }

  const handleCancelConnectH2hModal = () => {
    setOpenConnectH2hModal(false)
  }

  const handleConnectLater = () => {
    navigate(links.home.index())
  }

  return (
    <AuthStyled>
      <div className='login'>
        <div className='container'>
          <div className='title-container d-flex flex-column align-items-center'>
            <TwoLineTitle text={t(`${NOTIFICATION_MESSAGE}.joinNow`)} customClass='title' />
            <div className='sub-title color-white'>{t(`${NOTIFICATION_MESSAGE}.careerMarkName`)}</div>
          </div>
          <div className='login-container'>
            <div className='login-wrapper d-flex flex-column flex-md-row justify-content-center align-items-center'>
              <button className={metaMaskButtonClass} onClick={handleMetamaskLoginClicked} disabled={isLoading}>
                <img src={METAMASK_LOGIN_BTN} alt='' className={isLoading ? '' : 'login-img'} />
              </button>
            </div>
          </div>
          <div className='err-container color-red text-center'>{errorMessage}</div>
        </div>
      </div>
      {openConnectH2hModal && valueFirstWebLogin === true && (
        <ConnectH2hModal
          firstLoginH2H={firstLoginH2H}
          toggleIsModalOpen={setOpenConnectH2hModal}
          onCancelModal={handleCancelConnectH2hModal}
          onConnectLater={handleConnectLater}
        />
      )}
      {isModalResultHorseOpen && (
        <ResultHorseModal
          title={'warning'}
          onCloseButtonClick={handleCloseModalResult}
          onOk={handleOk}
          message={flagMetamask === true ? MESSAGE.please_install_metamask : MESSAGE.please_install_spectre}
        />
      )}
    </AuthStyled>
  )
}

export default Auth
