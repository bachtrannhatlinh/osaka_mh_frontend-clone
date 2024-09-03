/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import exchangeApi from 'apis/exchange'
import { configs, constants } from 'apps'
import { timeCheckNonce } from 'apps/constants'
import {
  CHAIN_TOKEN_HTC,
  CIRCEL_ARROW_DOWN_BLUE,
  CLOSE_BTN,
  CONNECT_WALLET_EXCHANGE,
  DISABLE_CONNECT_WALLET_EXCHANGE,
  GAME_TOKEN_E_HTC,
  UP
} from 'assets/images'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { ResultHorseModal } from 'features/Race/components'
import { useDebounce, useLocalStorage, useReloadCurrentPage, useToggle, useUpdateEffect } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import tokenGateAbi from 'json/TokenGate.json'
import htcABI from 'json/TokenHTC.json'
import { DepositRequest, DepositResponses } from 'models'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'shared'
import { handleAsyncRequest } from 'utils/helper'
import InProgressBalanceModal from '../InProgress'
import ExchangeHTCModalStyled from './styled'

interface ExchangeHTCModalProps {
  toggleIsExchangeModalOpen: (value: boolean) => void
  coinHtc?: string
  isCoinHTC: number
  coinHtcLogic: number
}

const defaultParams: DepositRequest = {
  amount: ''
}

function ExchangeHTCModal({ coinHtc, toggleIsExchangeModalOpen, isCoinHTC, coinHtcLogic }: ExchangeHTCModalProps) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  const [params, setParams] = useState<DepositRequest>(defaultParams)
  const [valueHTC, setValueInput] = useState<string>('')
  const debounceSearchValue = useDebounce<string>(valueHTC, constants.DEBOUNCE_TIME)
  const [resultExchangeDeposit, setResultExchangeDeposit] = useState<DepositResponses>()
  const [isModalResultHorseOpen, toggleIsModalResultHorseOpen] = useToggle(false)
  const [messageError, setMessageError] = useState('')
  const [titleBalace, setTitleBalance] = useState('')
  const [reInputExchange, setReInputExchange] = useState(false)
  const [openInProgressBalanceModal, setOpenInProgressBalanceModal] = useToggle(false)
  const [flagButtonOk, setFlagButtonOk] = useState<boolean>(false)
  const [watchInProgress, setWatchInProgress] = useState<boolean>(false)
  const [watchConnectWallet, setWatchConnectWallet] = useState<boolean>(false)
  const [watchCloseBtnWhenMTOpen, setWatchCloseBtnWhenMTOpen] = useState<boolean>(false)
  const [isModalConfirmExchangeOpen, setModalConfirmExchangeOpen] = useState<boolean>(false)
  const [, setWaitTransaction] = useLocalStorage(constants.TRANSACTION, '')
  const [isConfirmExchange, setConfirmExchange] = useState<boolean>(false)
  const [handleDepositCoin, setHandleDepositCoin] = useState<boolean>(false)
  const { t } = useTranslation()

  const contract = {
    tokenHtc: configs.tokenHTC,
    tokenGate: configs.tokenGate,
    tokenPrz: configs.tokenPRZ,
    transporter: configs.transporter,
  }

  const messageSuccess = t(`${NOTIFICATION_MESSAGE}.transferredSuccess`)
  const messageFailed = t(`${NOTIFICATION_MESSAGE}.transferredFailed`)
  const messageNotEnoughExchange = t(`${NOTIFICATION_MESSAGE}.notEnoughHtc`)

  const handleSearchValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const inputCoin = parseInt(e.target.value)
    const compareCoinHTCInput = inputCoin > coinHtcLogic

    if (compareCoinHTCInput) {
      setTitleBalance('warning')
      toggleIsModalResultHorseOpen(true)
      setMessageError(messageNotEnoughExchange)
      setReInputExchange(true)
      setValueInput((e.target.value = ''))
      setWatchConnectWallet(true)
    }

    setWatchConnectWallet(false)
    setValueInput(e.target.value.replace(/^0+/, ''))
  }

  useEffect(() => {
    if (debounceSearchValue === '') {
      setWatchConnectWallet(true)
    }
    setParams({ ...params, amount: debounceSearchValue })
  }, [debounceSearchValue])

  useUpdateEffect(() => {
    if (watchInProgress === true) {
      toggleIsModalResultHorseOpen(true)
      setTitleBalance('success!')
      setMessageError(messageSuccess)
      setFlagButtonOk(true)
      localStorage.removeItem(constants.TRANSACTION)
    }
  }, [watchInProgress])

  const handleDepositHTC = async () => {
    setWatchConnectWallet(true)
    setWatchCloseBtnWhenMTOpen(true)
    const [error, result]: any = await handleAsyncRequest(exchangeApi.postExchange(params))
    if (error) {
      setTitleBalance('failed!')
      toggleIsModalResultHorseOpen(true)
      setMessageError(error?.message || error?.errors[0]?.message || messageFailed)
      setFlagButtonOk(false)
      setWatchCloseBtnWhenMTOpen(false)
    }
    if (!result) return
    if (result) {
      setResultExchangeDeposit(result.data)
      setModalConfirmExchangeOpen(true)
      setConfirmExchange(true)
    }
  }

  const assignMetaMaskHtc = async () => {
    try {
      toggleIsExchangeModalOpen(true)
      const { ethereum } = window
      if (!ethereum) return
      if (!resultExchangeDeposit) return


      const amountToApprove = new BigNumber(resultExchangeDeposit.blockchain_amount).toFixed()
      const htcContract = new ethers.Contract(contract.tokenHtc, htcABI.contract.abi, signer)

      try {
        await htcContract.approve(contract.transporter, amountToApprove)
        setHandleDepositCoin(true)
      } catch (err) {
        setTitleBalance('failed!')
        toggleIsModalResultHorseOpen(true)
        setMessageError(messageFailed)
        setFlagButtonOk(false)
        setWatchConnectWallet(false)
        setWatchCloseBtnWhenMTOpen(false)
        setConfirmExchange(false)
      }

    } catch (err) {
      setTitleBalance('failed!')
      toggleIsModalResultHorseOpen(true)
      setMessageError(messageFailed)
      setFlagButtonOk(false)
      setWatchConnectWallet(false)
    }
  }

  const handleDeposit = async () => {
    if (!resultExchangeDeposit) return

    try {
      const tokenGateContract = new ethers.Contract(contract.tokenGate, tokenGateAbi.contract.abi, signer)
      const coverBlockExpired = new BigNumber(resultExchangeDeposit.block_expired).toFixed()
      const amountToApprove = new BigNumber(resultExchangeDeposit.blockchain_amount).toFixed()

      const tx = await tokenGateContract.deposit({
        owner: resultExchangeDeposit.owner,
        token: resultExchangeDeposit.token,
        blockExpired: coverBlockExpired,
        amount: amountToApprove,
        none: resultExchangeDeposit.nonce,
        v: resultExchangeDeposit.v,
        r: resultExchangeDeposit.r,
        s: resultExchangeDeposit.s
      })

      if (window.performance) {
        if (performance.navigation.type == 1) {
          setWaitTransaction(tx)
        }
      }

      if (tx.hash) {
        await provider.waitForTransaction(tx.hash)
      }
      setOpenInProgressBalanceModal(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setTitleBalance('failed!')
      toggleIsModalResultHorseOpen(true)
      setMessageError(messageFailed)
      setFlagButtonOk(false)
      setWatchConnectWallet(false)
      setWatchCloseBtnWhenMTOpen(false)
    }
  }

  const handlePostCheckNonceDeposit = async () => {
    if (!resultExchangeDeposit) return
    let checkNonceExits = null as any
    let x = 0
    let intervalID = setInterval(async () => {
      const nonce = resultExchangeDeposit.nonce
      const [, result] = await handleAsyncRequest(exchangeApi.postCheckNonce({ nonce }))
      if (!result) return
      checkNonceExits = result.data
      if (checkNonceExits === true) {
        clearInterval(intervalID)
        setWatchInProgress(true)
      }

      if (++x === 10) {
        if (checkNonceExits === false) {
          clearInterval(intervalID)
          setTitleBalance('failed!')
          toggleIsModalResultHorseOpen(true)
          setMessageError(messageFailed)
          setFlagButtonOk(true)
        }
      }
    }, timeCheckNonce)
  }

  useEffect(() => {
    if (isConfirmExchange === true) {
      assignMetaMaskHtc()
    }
  }, [isConfirmExchange])

  useEffect(() => {
    if (handleDepositCoin === true) {
      handleDeposit()
    }
  }, [handleDepositCoin])

  useEffect(() => {
    if (openInProgressBalanceModal === true) {
      handlePostCheckNonceDeposit()
    }
  }, [openInProgressBalanceModal])

  const handleOk = () => {
    if (flagButtonOk === false) {
      toggleIsModalResultHorseOpen(false)
      setModalConfirmExchangeOpen(false)
    }
    if (flagButtonOk === true) {
      useReloadCurrentPage()
    }
  }

  const handleOkExchange = () => {
    toggleIsModalResultHorseOpen(false)
  }

  const handleDisabledBtnConnect = useCallback(() => {
    if (valueHTC) {
      return false
    }

    return true
  }, [valueHTC])

  const handleDisableBtn = useCallback(() => {
    if (watchConnectWallet === true) {
      return true
    }

    return false
  }, [watchConnectWallet])

  const handleCloseButtonClick = useCallback(() => {
    if (watchCloseBtnWhenMTOpen === true) {
      return toggleIsExchangeModalOpen(true)
    }

    return toggleIsExchangeModalOpen(false)
  }, [watchCloseBtnWhenMTOpen])

  return (
    <Modal>
      <ExchangeHTCModalStyled>
        <button className='close-btn p-0 position-absolute' role='button' onClick={handleCloseButtonClick}>
          <img src={CLOSE_BTN} alt='close' />
        </button>
        <div className='title-exchange d-flex justify-content-between'>
          <div className='withdraw text-uppercase'>{t(`${NOTIFICATION_MESSAGE}.exchange`)}</div>
          <div className='claim'>{t(`${NOTIFICATION_MESSAGE}.getHtc`)}</div>
        </div>
        <div className='e-prz'>
          <img src={UP} alt='' />
          <img src={CHAIN_TOKEN_HTC} alt='' className='game-token-e-prz' />
          <input
            className='value-e-prz search-input flex-grow-1'
            defaultValue={valueHTC}
            placeholder='0.0'
            onChange={handleSearchValueChanged}
            maxLength={10}
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
            onPaste={e => {
              e.preventDefault()
              return false
            }}
            onCopy={e => {
              e.preventDefault()
              return false
            }}
          />
          <span className='value-balance'>
            {t(`${NOTIFICATION_MESSAGE}.balance`)}: {coinHtc}
          </span>
          <span className='title-e-prz'>{'HTC'}</span>
        </div>
        <div className='text-center mt-1 mb-3'>
          <img src={CIRCEL_ARROW_DOWN_BLUE} alt='' />
        </div>
        <div className='e-prz'>
          <img src={UP} alt='' />
          <img src={GAME_TOKEN_E_HTC} alt='' className='game-token-e-prz' />
          <input
            className='value-e-prz search-input flex-grow-1'
            placeholder='0.0'
            defaultValue={valueHTC}
            maxLength={10}
            disabled
            onPaste={e => {
              e.preventDefault()
              return false
            }}
            onCopy={e => {
              e.preventDefault()
              return false
            }}
          />
          <span className='value-balance'>
            {t(`${NOTIFICATION_MESSAGE}.balance`)}:
            {isCoinHTC > 0
              ? isCoinHTC
              : 0}
          </span>
          <span className='title-e-prz'>{'eHTC'}</span>
        </div>
        <div className='notice-exchange text-center'>
          <div>{t(`${NOTIFICATION_MESSAGE}.exchangeRate`)}</div>
          <div>{t(`${NOTIFICATION_MESSAGE}.htcToEHtc`)}</div>
        </div>
        <div className='btn-connect-wallet text-center'>
          <button onClick={handleDepositHTC} disabled={handleDisableBtn()}>
            <img
              src={
                handleDisabledBtnConnect() || watchConnectWallet
                  ? DISABLE_CONNECT_WALLET_EXCHANGE
                  : CONNECT_WALLET_EXCHANGE
              }
              alt='btn-connect-h2h'
            />
          </button>
        </div>
      </ExchangeHTCModalStyled>

      {isModalConfirmExchangeOpen && <InProgressBalanceModal confirmTransaction={true} />}

      {isModalResultHorseOpen && (
        <ResultHorseModal
          title={titleBalace}
          onOk={reInputExchange === true ? handleOkExchange : handleOk}
          message={messageError}
          exchangeCoin={true}
        />
      )}

      {openInProgressBalanceModal && <InProgressBalanceModal />}
    </Modal>
  )
}

export default ExchangeHTCModal
