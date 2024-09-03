import userApi from 'apis/userApi'
import { configs, links } from 'apps'
import {
  CANCEL_UPDATE_INFOR,
  CONNECT_H2H,
  CONNECT_LATER,
  DISABLE_CONNECT_H2H,
  H2H_LOGO,
  RIGHT_LINE
} from 'assets/images'
import { ResultHorseModal } from 'features/Race/components'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { ChangeEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'shared'
import Input from 'shared/Input'
import { handleAsyncRequest } from 'utils/helper'

import ConnectH2hModalStyled from './styled'
interface ResultHorseModalProps {
  toggleIsModalOpen?: (value?: boolean) => void
  onCancelModal: () => void
  onIsH2H?: (value: boolean) => void
  onUpdateId?: () => void
  firstLoginH2H?: boolean
  onConnectLater?: () => void
}
export default function ConnectH2hModal({
  onCancelModal,
  onIsH2H,
  onUpdateId,
  firstLoginH2H,
  onConnectLater
}: ResultHorseModalProps) {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMassage] = useState<string>('')
  const [isModalMessageOpen, setModalMessageOpen] = useState<boolean>(false)
  const [titleBalace, setTitleBalance] = useState<string>('')
  const navigate = useNavigate()
  const { t } = useTranslation()

  const messageSuccess = t(`${NOTIFICATION_MESSAGE}.h2hSuccess`)
  const messageFail = t(`${NOTIFICATION_MESSAGE}.userOrPassIncorrect`)
  const linkH2H = configs.linkH2H

  const handleChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const checkFirstLogin = () => {
    if (firstLoginH2H) {
      setModalMessageOpen(true)
      setTitleBalance(messageSuccess)
      handleOk()
    }
    onUpdateId?.()
    onIsH2H?.(true)
    onCancelModal()
  }

  const checkFirstLoginError = (error: Error) => {
    setModalMessageOpen(true)
    setTitleBalance(messageFail)
    handleOkClone()
    setMassage(error?.message)
  }

  const handleSubmitConnectH2H = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, result]: any[] = await handleAsyncRequest(userApi.postConnectH2H({ username, password }))
    if (result?.code === 200) {
      checkFirstLogin()
    } else if (error) {
      firstLoginH2H ? checkFirstLoginError(error) : setMassage(error?.message)
    }
  }

  const handleOk = () => {
    navigate(links.home.index())
  }

  const handleOkClone = () => {
    setModalMessageOpen(false)
  }

  const handleDisabledBtnConnect = useCallback(() => {
    if (username && password) {
      return false
    }

    return true
  }, [username, password])

  return (
    <Modal>
      <ConnectH2hModalStyled>
        <div className='h2h-connect-container'>
          <div className='h2h-content'>
            <img src={H2H_LOGO} alt='h2h-logo' />
            <span className='text-white'>{t(`${NOTIFICATION_MESSAGE}.insertConnectH2h`)}</span>
          </div>
          <form onSubmit={handleSubmitConnectH2H}>
            <div className='user-h2h-input'>
              <span className='color-white user-h2h-title '>{t(`${NOTIFICATION_MESSAGE}.userName`)}</span>
              <span className='user-h2h-input-container'>
                <Input
                  searchValue={''}
                  handleSearchValueChanged={handleChangeUserName}
                  customClass='search-horse-input'
                  h2h={true}
                />
              </span>
            </div>
            <div className='user-h2h-input'>
              <span className='color-white user-h2h-title '>{t(`${NOTIFICATION_MESSAGE}.password`)}</span>
              <span className='user-h2h-input-container'>
                <Input
                  searchValue={''}
                  handleSearchValueChanged={handleChangePassword}
                  customClass='search-horse-input'
                  type='password'
                  h2h={true}
                />
              </span>
            </div>

            {message && <div className='err-container color-red text-center p-2 width-msg-error'>{message}</div>}

            <div className='not-account-h2h'>
              <span className='color-white'>
                Don&apos;t have an account? You can{' '}
                <a rel='noopener noreferrer' href={linkH2H} target='_blank'>
                  register
                </a>{' '}
                one here.
              </span>
            </div>
            {firstLoginH2H ? (
              <div className='button-h2h-group'>
                <button className='btn-cancel' type='button' onClick={onConnectLater}>
                  <img src={CONNECT_LATER} alt='btn-cancel' />
                </button>
                <button className='btn-h2h-connect' disabled={handleDisabledBtnConnect()}>
                  <img src={handleDisabledBtnConnect() ? DISABLE_CONNECT_H2H : CONNECT_H2H} alt='btn-connect-h2h' />
                </button>
              </div>
            ) : (
              <div className='button-h2h-group'>
                <button className='btn-cancel' type='button' onClick={onCancelModal}>
                  <img src={CANCEL_UPDATE_INFOR} alt='btn-cancel' />
                </button>
                <button className='btn-h2h-connect' type='submit' value='submit' disabled={handleDisabledBtnConnect()}>
                  <img src={handleDisabledBtnConnect() ? DISABLE_CONNECT_H2H : CONNECT_H2H} alt='btn-connect-h2h' />
                </button>
              </div>
            )}
          </form>
        </div>
        <img className='right-line-modal' src={RIGHT_LINE} alt='' />
        {isModalMessageOpen && <ResultHorseModal title={titleBalace} onOk={handleOk} message={messageSuccess} />}
      </ConnectH2hModalStyled>
    </Modal>
  )
}
