/* eslint-disable @typescript-eslint/no-explicit-any */
import userApi from 'apis/userApi'
import { constants, links, paths } from 'apps'
import {
  CHAIN_TOKEN_HTC,
  CHAIN_TOKEN_PRZ,
  GAME_TOKEN_E_HTC,
  GAME_TOKEN_E_PRZ,
  GAME_TOKEN_Z_PRZ,
  TWO_LINE,
  ICON_SPECTRE,
  ICON_META_HORSE,
  ICON_SPC,
  NEXT_RACE_BOTTOM_FRAME,
  ICON_ARROW
} from 'assets/images'
import ExchangeHTCModal from 'features/Balance/components/ExchangeHTCModal'
import SwapEPRZToEHTCModal from 'features/Balance/components/SwapEPRZToEHTCModal'
import WithdrawPRZModal from 'features/Balance/components/WithdrawPRZModal'
import { ResultHorseModal } from 'features/Race/components'
import { useAppDispatch, useAppSelector, useToggle } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { Coin, CoinUser } from 'models'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { handleAsyncRequest, handleGroupingsOfThreeNumbers } from 'utils/helper'
import StyledBalance from './styled'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getSigner } from 'utils/metamask'
import { setCurrentUser } from 'features/Profile/profile.slice'
import { setCoinUser } from 'features/Balance/coinUser.slice'
import WithdrawFreePRZModal from 'features/Balance/components/WithdrawFreePRZModal'
import { ethers } from 'ethers'

export default function Balance() {
  const [isModalExchangeOpen, toggleIsExchangeModalOpen] = useToggle(false)
  const [isModalWithdrawOpen, toggleIsWithdrawModalOpen] = useToggle(false)
  const [isModalWithdrawFreeOpen, toggleIsWithdrawFreeModalOpen] = useToggle(false)
  const [openModalConfirmOpenBeta, setOpenModalConfirmOpenBeta] = useState(false)
  const [isSwapEPRZToEHTCModalOpen, toggleIsSwapEPRZToEHTCModalOpen] = useToggle(false)
  const { auth } = useAppSelector(state => state)
  const [coinHTC, setCoinHTC] = useState<number>(0)
  const [coinPRZ, setCoinPRZ] = useState<number>(0)
  const [coinZPRZ, setCoinZPRZ] = useState<number>(0)
  const [coinSPC, setCoinSPC] = useState<number>(0)
  const [isOpenModalConfirmWithDraw, setOpenModalConfirmWithDraw] = useState<boolean>(false)
  const [titleBalace, setTitleBalance] = useState<string>('')

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const [isOpenModalNoticeMetamask, setOpenModalNoticeMetamask] = useState<boolean>(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const rejectMessageFailed = t(`${NOTIFICATION_MESSAGE}.transactionFailed`)
  const messageMetamask = t(`${NOTIFICATION_MESSAGE}.confirmTransaction`)
  const messageConfirmOpenBeta = t(`${NOTIFICATION_MESSAGE}.confirmVersion`)

  // const openExchangeHTC = useCallback(() => {
  //   if (signer == 'true') {
  //     setTitleBalance('warning')
  //     setOpenModalNoticeMetamask(true)
  //   } else {
  //     toggleIsExchangeModalOpen(true)
  //   }
  // }, [signer])

  const openExchangeHTC = () => {
    toggleIsExchangeModalOpen(true)
    // setOpenModalConfirmOpenBeta(true)
    // setTitleBalance('warning')
  }

  const openSwapEPRZToEHTC = () => {
    toggleIsSwapEPRZToEHTCModalOpen(true)
    // setOpenModalConfirmOpenBeta(true)
    // setTitleBalance('warning')
  }

  // const openWithDrawPRZ = () => {
  //   toggleIsExchangeModalOpen(true)
  // }

  const closeSwapEPRZToEHTCModalOpen = () => {
    toggleIsSwapEPRZToEHTCModalOpen(false)
  }

  const coinHtcDisplayScreen = handleGroupingsOfThreeNumbers(Number(auth.balance.coinHtc || 0) / Number(Math.pow(10, 18)))
  const cloneCoinHtc = coinHtcDisplayScreen.split('.') ? coinHtcDisplayScreen.split('.').shift() : coinHtcDisplayScreen
  const coinPrz = handleGroupingsOfThreeNumbers(Number(auth.balance.coinPrz) / Number(Math.pow(10, 18)))
  const coinHtcLogic = Number(auth.balance.coinHtc) / Number(Math.pow(10, 18))
  const cloneCoinPrz = coinPrz.split('.') ? coinPrz.split('.').shift() : coinPrz

  const fetchCoinUser = useCallback(async () => {
    const [error, resultCoinUser]: any = await handleAsyncRequest(userApi.getUserItems())
    if (error?.code === 403) {
      window.location.href = paths.auth.login()
    }
    if (!resultCoinUser) return
    const handleCoinUser = (data: CoinUser) => {
      data.items.filter((item: Coin) => {
        if (item.item_type === 'E_HTC') {
          setCoinHTC(item.amount)
        }

        if (item.item_type === 'E_PRZ') {
          setCoinPRZ(item.amount)
        }

        if (item.item_type === 'FREE_PRZ') {
          setCoinZPRZ(item.amount)
        }
      })
    }

    handleCoinUser(resultCoinUser.data)
  }, [])

  useEffect(() => {
    const checkCurrentCoinUser = async () => {
      const [, currentUser]: any = await handleAsyncRequest(getCurrentUser())
      if (!currentUser) return

      const [, resultCoinUser] = await handleAsyncRequest(userApi.getUserItems())
      if (!resultCoinUser) return

      dispatch(setCurrentUser(currentUser))
      dispatch(setCoinUser(resultCoinUser.data))
    }

    checkCurrentCoinUser()
    fetchCoinUser()
    getCoinSPC()
  }, [])

  const handleOk = () => {
    setOpenModalConfirmWithDraw(false)
  }

  const handleOkMetamask = () => {
    localStorage.removeItem(constants.SIGNER)
    setOpenModalNoticeMetamask(false)
  }

  const checkWithDrawPRZ = async (type: string) => {
    const [error, resultCoinUser]: any = await handleAsyncRequest(userApi.getUserItems())
    if (error?.code === 403) {
      window.location.href = paths.auth.login()
    }
    if (!resultCoinUser) return
    if (resultCoinUser?.data?.pending_transactions?.length > 0) {
      setOpenModalConfirmWithDraw(true)
      setTitleBalance('warning')
    } else {
      if (type === 'eprz') {
        toggleIsWithdrawModalOpen(true)
      }
      else {
        toggleIsWithdrawFreeModalOpen(true)
      }
    }

  }

  useEffect(() => {
    const checkSignerBalance = async () => {
      const [signerError] = await handleAsyncRequest(getSigner())
      if (signerError) {
        navigate(links.home.index())
      }
    }

    checkSignerBalance()
  }, [])

  const clickBtnOkOpenBeta = () => {
    setOpenModalConfirmOpenBeta(false)
  }

  const getCoinSPC = async () => {
    const addressUser = await signer.getAddress();
    const balance = await provider.getBalance(addressUser);
    const data = +ethers.utils.formatEther(balance);
    setCoinSPC(+data?.toFixed(4) || 0)
  }

  const layoutCoin = (logo: string, name: string, price: string | number) => {
    return (
      <div className='wallet-item'>
        <div>
          <img src={logo} alt='' className='icon-coin' />
        </div>
        <div className='name-coin'>
          {name}
        </div>
        <div className='value-coin'>
          {price}
        </div>
      </div>
    )
  }

  const layoutExchange = (logoFrom: string, onClickItem: () => void, logoTo: string) => {
    return (
      <div className='exchange-container' onClick={onClickItem}>
        <div className='background-line'>
          <img src={NEXT_RACE_BOTTOM_FRAME} alt='' width={300} />
        </div>
        <div className='exchange-item'>
          <div className='exchange-background'>
            <div>
              <img src={logoFrom} alt='' className='icon-coin' />
            </div>
            <div className='name-coin'>
              <img src={ICON_ARROW} alt='' className='icon-coin' width={25} />
            </div>
            <div>
              <img src={logoTo} alt='' className='icon-coin' />
            </div>
          </div>
        </div>
      </div>

    )
  }

  return (
    <StyledBalance>
      <div className='container'>
        <div className='balance-container'>
          <div className='balance'>
            <div className='title font-bold'>{t(`${NOTIFICATION_MESSAGE}.balance`)}</div>
            <img src={TWO_LINE} alt='' className='line' />
          </div>

          <div className='wallet'>
            <div>
              <div className='wallet-title'>
                <img src={ICON_SPECTRE} alt='' className='wallet-icon' width={25} />
                SPECTRE CHAIN COIN
              </div>
              {layoutCoin(ICON_SPC, "SPC", coinSPC)}
              {layoutCoin(CHAIN_TOKEN_HTC, "HTC", cloneCoinHtc ?? '0')}
              {layoutCoin(CHAIN_TOKEN_PRZ, "PRZ", cloneCoinPrz ?? '0')}
            </div>
            <div>
              <div className='wallet-title'>
                <img src={ICON_META_HORSE} alt='' className='wallet-icon' width={20} />
                GAME COIN
              </div>
              {layoutCoin(GAME_TOKEN_E_HTC, "e-HTC", coinHTC ?? '0')}
              {layoutCoin(GAME_TOKEN_E_PRZ, "e-PRZ", coinPRZ ?? '0')}
              {layoutCoin(GAME_TOKEN_Z_PRZ, "e-PRZ", coinZPRZ ?? '0')}
            </div>
          </div>

          <div className='exchange'>
            <div>
              <div className='exchange-title'>
                EXCHANGE e-HTC
              </div>
              {layoutExchange(CHAIN_TOKEN_HTC, openExchangeHTC, GAME_TOKEN_E_HTC)}
              <div className='exchange-title'>
                EXCHANGE e-HTC
              </div>
              {layoutExchange(GAME_TOKEN_E_PRZ, openSwapEPRZToEHTC, GAME_TOKEN_E_HTC)}
            </div>

            <div>
              <div className='exchange-title'>
                CLAIM PRZ
              </div>
              {layoutExchange(GAME_TOKEN_E_PRZ, () => checkWithDrawPRZ('eprz'), CHAIN_TOKEN_PRZ)}
              <div style={{ height: '145px' }}></div>
              {/* 	
              START TODO 20221115 comment source code claim prz
               <div className='disable'>
                <div className='exchange-title'>
                  CLAIM PRZ
                </div>
                {layoutExchange(GAME_TOKEN_Z_PRZ, () => checkWithDrawPRZ('free-eprz'), CHAIN_TOKEN_PRZ)}
              </div> 
              END TODO 20221115 comment source code claim prz 
              */}
            </div>
          </div>
        </div>
      </div>

      {isOpenModalConfirmWithDraw && (
        <ResultHorseModal
          title={titleBalace}
          onOk={handleOk}
          message={<p className='reject-msg-failed'>{rejectMessageFailed}</p>}
          exchangeCoin={true}
        />
      )}

      {isOpenModalNoticeMetamask && (
        <ResultHorseModal
          title={titleBalace}
          onOk={handleOkMetamask}
          message={<p>{messageMetamask}</p>}
          exchangeCoin={true}
        />
      )}

      {openModalConfirmOpenBeta && (
        <ResultHorseModal
          title={titleBalace}
          onOk={clickBtnOkOpenBeta}
          message={<p>{messageConfirmOpenBeta}</p>}
          exchangeCoin={true}
        />
      )}

      {isModalWithdrawOpen && (
        <WithdrawPRZModal
          toggleIsWithdrawModalOpen={toggleIsWithdrawModalOpen}
          coinHtcLogic={coinHtcLogic}
          coinPrz={cloneCoinPrz}
          isCoinPRZ={coinPRZ}
        />
      )}

      {isModalWithdrawFreeOpen && (
        <WithdrawFreePRZModal
          toggleIsWithdrawModalOpen={toggleIsWithdrawFreeModalOpen}
          coinHtcLogic={coinHtcLogic}
          coinPrz={cloneCoinPrz}
          isCoinPRZ={coinZPRZ}
        />
      )}

      {isModalExchangeOpen && (
        <ExchangeHTCModal
          toggleIsExchangeModalOpen={toggleIsExchangeModalOpen}
          coinHtc={cloneCoinHtc}
          coinHtcLogic={coinHtcLogic}
          isCoinHTC={coinHTC}
        />
      )}
      {isSwapEPRZToEHTCModalOpen && (
        <SwapEPRZToEHTCModal
          onCloseButtonClick={closeSwapEPRZToEHTCModalOpen}
          isCoinHTC={coinHTC}
          isCoinPRZ={coinPRZ}
        />
      )}
    </StyledBalance>
  )
}
