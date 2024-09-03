/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import exchangeApi from 'apis/exchange'
import { constants } from 'apps'
import {
  CIRCEL_ARROW_DOWN_PRIMARY,
  CLOSE_BTN,
  CONNECT_WALLET_TRANSFER,
  DISABLE_CONNECT_WALLET_TRANSFER,
  GAME_TOKEN_E_HTC,
  GAME_TOKEN_E_PRZ,
  UP
} from 'assets/images'
import { ResultHorseModal } from 'features/Race/components'
import { useDebounce, useReloadCurrentPage, useToggle, useUpdateEffect } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { SwapETokenRequest } from 'models'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'shared'
import { handleAsyncRequest } from 'utils/helper'
import SwapEPRZToEHTCModalStyled from './styled'

interface SwapEPRZToEHTCModalProps {
  onCloseButtonClick: () => void
  isCoinHTC: number
  isCoinPRZ: number
}

const defaultParams: SwapETokenRequest = {
  amount: ''
}

function SwapEPRZToEHTCModal({ onCloseButtonClick, isCoinHTC, isCoinPRZ }: SwapEPRZToEHTCModalProps) {
  const [params, setParams] = useState<SwapETokenRequest>(defaultParams)
  const [valueInput, setValueInput] = useState<string>('')
  const amountInput = useDebounce<string>(valueInput, constants.DEBOUNCE_TIME)
  const [isModalResultHorseOpen, toggleIsModalResultHorseOpen] = useToggle(false)
  const [messageError, setMessageError] = useState<string>('')
  const [titleBalace, setTitleBalance] = useState<string>('')
  const [flagButtonOk, setFlagButtonOk] = useState<boolean>(false)
  const [reInputExchange, setReInputExchange] = useState<boolean>(false)
  const [confirmSwap, setConfirmSwap] = useToggle(false)
  const [watchConnectWallet, setWatchConnectWallet] = useState<boolean>(false)
  const refInput = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()

  const messageSuccess = t(`${NOTIFICATION_MESSAGE}.transferredSuccess`)
  const messageFailed = t(`${NOTIFICATION_MESSAGE}.transferredFailed`)
  const messageNotEnoughWithdraw = t(`${NOTIFICATION_MESSAGE}.notEnoughEPrz`)

  const handleSearchValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const inputCoin = parseInt(e.target.value)
    const compareCoinEPRZInput = inputCoin > isCoinPRZ

    if (compareCoinEPRZInput) {
      setTitleBalance('warning')
      toggleIsModalResultHorseOpen(true)
      setMessageError(messageNotEnoughWithdraw)
      setReInputExchange(true)
      setValueInput((e.target.value = ''))
      setWatchConnectWallet(false)
    }
    setWatchConnectWallet(false)
    setValueInput(e.target.value.replace(/^0+/, ''))
    // const validated = e.target.value.match(/^(\d*\.{0,1}\d{0,5}$)/)
    // if (validated) {
    //   setValueInput(e.target.value)
    // }
  }

  useEffect(() => {
    if (refInput.current?.value === '') {
      setWatchConnectWallet(true)
    }
  })

  const handleCloseConfirmSwap = () => setConfirmSwap(false)

  useUpdateEffect(() => {
    setParams({ ...params, amount: amountInput })
  }, [amountInput])

  const handleSwapEPRZToEHTC = () => {
    const cannotInputValueZero = `value does not match`
    if (Number(amountInput) === 0) {
      toggleIsModalResultHorseOpen(true)
      setTitleBalance('warning')
      setMessageError(cannotInputValueZero)
      setFlagButtonOk(false)
    } else {
      setConfirmSwap(true)
      setTitleBalance('warning')
    }
  }

  const handleOk = () => {
    if (flagButtonOk === true) {
      setConfirmSwap(false)
      useReloadCurrentPage()
    } else {
      toggleIsModalResultHorseOpen(false)
    }
  }

  const handleOkExchange = () => {
    toggleIsModalResultHorseOpen(false)
  }

  const handleOkConfirm = async () => {
    const [error, result] = await handleAsyncRequest(exchangeApi.postSwapEToken(params))
    if (error) {
      setTitleBalance('failed!')
      toggleIsModalResultHorseOpen(true)
      setMessageError(messageFailed)
    }
    if (!result) return

    if (result.code === 200) {
      setWatchConnectWallet(true)
      toggleIsModalResultHorseOpen(true)
      setTitleBalance('success!')
      setMessageError(messageSuccess)
      setFlagButtonOk(true)
    }
  }

  const handleDisabledBtnConnect = useCallback(() => {
    if (valueInput) {
      return false
    }

    return true
  }, [valueInput])

  const handleDisableBtn = useCallback(() => {
    if (watchConnectWallet === true) {
      return true
    }

    return false
  }, [watchConnectWallet])

  return (
    <Modal>
      <SwapEPRZToEHTCModalStyled>
        <button className='close-btn p-0 position-absolute' role='button' onClick={onCloseButtonClick}>
          <img src={CLOSE_BTN} alt='close' />
        </button>
        <div className='title-exchange d-flex justify-content-between'>
          <div className='withdraw text-uppercase'>{'exchange'}</div>
          <div className='claim'>{t(`${NOTIFICATION_MESSAGE}.getYourEHtc`)}</div>
        </div>
        <div className='e-prz'>
          <img src={UP} alt='' />
          <img src={GAME_TOKEN_E_PRZ} alt='' className='game-token-e-prz' />
          <input
            className='value-e-prz search-input flex-grow-1'
            defaultValue={valueInput}
            placeholder='0.0'
            onChange={handleSearchValueChanged}
            maxLength={10}
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
            // onKeyPress={event => (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)}
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
            {isCoinPRZ > 0
              ? isCoinPRZ
              : 0}
          </span>
          <span className='title-e-prz'>{'ePRZ'}</span>
        </div>
        <div className='text-center mt-1 mb-3'>
          <img src={CIRCEL_ARROW_DOWN_PRIMARY} alt='' />
        </div>
        <div className='e-prz'>
          <img src={UP} alt='' />
          <img src={GAME_TOKEN_E_HTC} alt='' className='game-token-e-prz' />
          <input
            ref={refInput}
            className='value-e-prz search-input flex-grow-1'
            placeholder='0.0'
            defaultValue={valueInput}
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
            {isCoinHTC}
          </span>
          <span className='title-e-prz'>{'eHTC'}</span>
        </div>
        <div className='notice-exchange text-center'>
          <div>{t(`${NOTIFICATION_MESSAGE}.exchangeRate`)}</div>
          <div>{t(`${NOTIFICATION_MESSAGE}.ePrzToEHtc`)}</div>
        </div>
        <div className='btn-connect-wallet text-center'>
          <button onClick={handleSwapEPRZToEHTC} disabled={handleDisableBtn()}>
            <img
              src={handleDisabledBtnConnect() ? DISABLE_CONNECT_WALLET_TRANSFER : CONNECT_WALLET_TRANSFER}
              alt='btn-connect-h2h'
            />
          </button>
        </div>
      </SwapEPRZToEHTCModalStyled>
      {confirmSwap && (
        <ResultHorseModal
          toggleIsModalOpen={setConfirmSwap}
          title={titleBalace}
          onCloseButtonClick={handleCloseConfirmSwap}
          onOk={handleOkConfirm}
          message={
            <span dangerouslySetInnerHTML={{ __html: t(`${NOTIFICATION_MESSAGE}.convertEPrzToEHtc`, { valueInput }) }} />
          }
        />
      )}

      {isModalResultHorseOpen && (
        <ResultHorseModal
          title={titleBalace}
          onOk={reInputExchange === true ? handleOkExchange : handleOk}
          message={messageError}
          exchangeCoin={true}
        />
      )}
    </Modal>
  )
}

export default SwapEPRZToEHTCModal
