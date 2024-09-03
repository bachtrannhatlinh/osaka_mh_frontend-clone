/* eslint-disable prefer-const */
import exchangeApi from 'apis/exchange'
import { configs, constants } from 'apps'
import { decimalFormatCoin, timeCheckNonce } from 'apps/constants'
import {
  CHAIN_TOKEN_PRZ,
  CIRCEL_ARROW_DOWN,
  CLOSE_BTN,
  CONNECT_WALLET_WITHDRAW,
  DISABLE_CONNECT_WALLET_WITHDRAW,
  GAME_TOKEN_E_PRZ,
  UP
} from 'assets/images'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { ResultHorseModal } from 'features/Race/components'
import { useDebounce, useLocalStorage, useReloadCurrentPage, useToggle, useUpdateEffect } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import tokenGateAbi from 'json/TokenGate.json'
import { ClaimResponses, DepositRequest, ExchangeError } from 'models'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'shared'
import { handleAsyncRequest, numberWithCommas } from 'utils/helper'
import InProgressBalanceModal from '../InProgress'
import WithdrawPRZModalStyled from './styled'

interface WithdrawPRZModalProps {
  toggleIsWithdrawModalOpen: (value: boolean) => void
  coinPrz?: string
  coinHtc?: string
  isCoinPRZ: number
  coinHtcLogic: number
}

const defaultParams: DepositRequest = {
  amount: ''
}

function WithdrawPRZModal({ coinPrz, toggleIsWithdrawModalOpen, isCoinPRZ }: WithdrawPRZModalProps) {
  const [params, setParams] = useState<DepositRequest>(defaultParams)
  const [valueHTC, setValueInput] = useState<string>('')
  const debounceSearchValue = useDebounce<string>(valueHTC, constants.DEBOUNCE_TIME)
  const [resultExchangeClaim, setResultExchangeClaim] = useState<ClaimResponses>()
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
  const [isConfirmExchange, setConfirmExchange] = useState<boolean>(false)
  const [, setWaitTransaction] = useLocalStorage(constants.TRANSACTION, '')
  const [, setSigner] = useLocalStorage(constants.SIGNER, '')
  const { t } = useTranslation()
  const contract = {
    tokenHtc: configs.tokenHTC,
    tokenGate: configs.tokenGate,
    tokenPrz: configs.tokenPRZ
  }

  const messageSuccess = t(`${NOTIFICATION_MESSAGE}.transferredSuccess`)
  const messageFailed = t(`${NOTIFICATION_MESSAGE}.transferredFailed`)
  const messageNotEnoughWithdraw = t(`${NOTIFICATION_MESSAGE}.notEnoughEPrz`)
  const messageCantClaimPRZNow = t(`${NOTIFICATION_MESSAGE}.cannotClaimPRZNow`)

  const handleSearchValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const inputCoin = parseInt(e.target.value)
    const compareCoinEPRZInput = inputCoin > isCoinPRZ

    if (compareCoinEPRZInput) {
      setTitleBalance('warning')
      toggleIsModalResultHorseOpen(true)
      setMessageError(messageNotEnoughWithdraw)
      setReInputExchange(true)
      setValueInput((e.target.value = ''))
      setWatchConnectWallet(true)
    }

    setWatchConnectWallet(false)
    setValueInput(e.target.value.replace(/^0+/, ''))
    // const validated = e.target.value.match(/^(\d*\.{0,1}\d{0,5}$)/)
    // if (validated) {
    //   setValueInput(e.target.value)
    // }
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isExchangeError = (candidate: any): candidate is ExchangeError => {
    const isValid: boolean =
      candidate.code === constants.HTTP_STATUS.BAD_REQUEST && typeof candidate.message === 'string'

    return isValid
  }

  const handleClaimPrz = async () => {
    setWatchConnectWallet(true)
    const [error, result] = await handleAsyncRequest(exchangeApi.postClaimPrz(params))
    if (error) {
      const errorMessage = isExchangeError(error) && error.message === 'You cannot claim PRZ at this time!' ?
        messageCantClaimPRZNow :
        messageFailed
      setTitleBalance('failed!')
      toggleIsModalResultHorseOpen(true)
      setMessageError(errorMessage)
      setFlagButtonOk(false)
    }
    if (!result) return
    if (result) {
      setResultExchangeClaim(result.data)
      setModalConfirmExchangeOpen(true)
      setConfirmExchange(true)
    }
  }

  const assignMetaMarkPrz = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) return
      if (!resultExchangeClaim) return

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      setSigner(signer._isSigner)
      const coverBlockExpired = new BigNumber(resultExchangeClaim.block_expired).toFixed()


      const amountToClaim = new BigNumber(resultExchangeClaim.blockchain_amount).toFixed()
      const tokenGateContract = new ethers.Contract(contract.tokenGate, tokenGateAbi.contract.abi, signer)
      const tx = await tokenGateContract.claim({
        owner: resultExchangeClaim.owner,
        token: resultExchangeClaim.token,
        blockExpired: coverBlockExpired,
        amount: amountToClaim,
        none: resultExchangeClaim.nonce,
        v: resultExchangeClaim.v,
        r: resultExchangeClaim.r,
        s: resultExchangeClaim.s,
      })

      if (window.performance) {
        if (performance.navigation.type == 1) {
          setWaitTransaction(tx.hash)
        }
      }

      if (tx.hash) {
        await provider.waitForTransaction(tx.hash)
      }
      setWatchConnectWallet(true)
      setOpenInProgressBalanceModal(true)
    } catch (err) {
      setTitleBalance('failed!')
      toggleIsModalResultHorseOpen(true)
      setMessageError(messageFailed)
      setFlagButtonOk(true)
      setWatchConnectWallet(false)
      setWatchCloseBtnWhenMTOpen(false)
      setConfirmExchange(false)
    }
  }

  const handlePostCheckNonceClaim = async () => {
    if (!resultExchangeClaim) return
    setWatchConnectWallet(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let checkNonceExits = null as any
    let x = 0
    let intervalID = setInterval(async () => {
      const nonce = resultExchangeClaim.nonce
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
      assignMetaMarkPrz()
    }
  }, [isConfirmExchange])

  useEffect(() => {
    if (openInProgressBalanceModal === true) {
      handlePostCheckNonceClaim()
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
      return toggleIsWithdrawModalOpen(true)
    }

    return toggleIsWithdrawModalOpen(false)
  }, [watchCloseBtnWhenMTOpen])

  return (
    <Modal>
      <WithdrawPRZModalStyled>
        <button className='close-btn p-0 position-absolute' role='button' onClick={handleCloseButtonClick}>
          <img src={CLOSE_BTN} alt='close' />
        </button>
        <div className='title-exchange d-flex justify-content-between'>
          <div className='withdraw text-uppercase'>{'withdraw'}</div>
          <div className='claim'>{t(`${NOTIFICATION_MESSAGE}.claimPrz`)}</div>
        </div>
        <div className='e-prz'>
          <img src={UP} alt='' />
          <img src={GAME_TOKEN_E_PRZ} alt='' className='game-token-e-prz' />
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
            {t(`${NOTIFICATION_MESSAGE}.balance`)}:{' '}
            {Number.isInteger(isCoinPRZ) ? isCoinPRZ : numberWithCommas(Number(isCoinPRZ.toFixed(decimalFormatCoin)))}
          </span>
          <span className='title-e-prz'>{'ePRZ'}</span>
        </div>
        <div className='text-center mt-1 mb-3'>
          <img src={CIRCEL_ARROW_DOWN} alt='' />
        </div>
        <div className='e-prz'>
          <img src={UP} alt='' />
          <img src={CHAIN_TOKEN_PRZ} alt='' className='game-token-e-prz' />
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
            {t(`${NOTIFICATION_MESSAGE}.balance`)}: {coinPrz}
          </span>
          <span className='title-e-prz'>{'PRZ'}</span>
        </div>
        <div className='notice-exchange text-center'>
          <div>{t(`${NOTIFICATION_MESSAGE}.exchangeRate`)}</div>
          <div>{t(`${NOTIFICATION_MESSAGE}.ePrzToPrz`)}</div>
        </div>
        <div className='btn-connect-wallet text-center'>
          <button onClick={handleClaimPrz} disabled={handleDisableBtn()}>
            <img
              src={
                handleDisabledBtnConnect() || watchConnectWallet
                  ? DISABLE_CONNECT_WALLET_WITHDRAW
                  : CONNECT_WALLET_WITHDRAW
              }
              alt='btn-connect-h2h'
            />
          </button>
        </div>
      </WithdrawPRZModalStyled>

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

export default WithdrawPRZModal
