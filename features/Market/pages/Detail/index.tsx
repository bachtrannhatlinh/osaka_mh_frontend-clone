/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'
import lendingApi from 'apis/lending'
import { configs } from 'apps'
import { ethers } from 'ethers'
import horseNFTABI from 'json/HorseNFT.json'
import horseFarmABI from 'json/HorseFarm.json'
import { useAppDispatch, useAppSelector, useToggle } from 'hooks'
import {
  ApiResponse,
  ELeaseType,
  LendingHorse,
  LendingHorseInfo,
  LendingHorseMarket,
  LendingPriceConfigs,
  LENDING_STATUS,
  LENDING_TYPE,
  MODAL_TYPE,
  notificationTemplate
} from 'models'
import { useEffect, useState } from 'react'
import { handleAsyncRequest, convert_status_lending } from 'utils/helper'
import HorseModalAvailableStyled from './styled'
import BigNumber from 'bignumber.js'
import Button from 'shared/Button'
import HorseAvatar from '../../../Horse/components/HorseAvatar'
import HorseBodyInfo from '../../../Horse/components/HorseBodyInfo'
import InProgressBalanceModal from 'features/Balance/components/InProgress'
import { timeCheckNonce, TIME_CONFIGS } from 'apps/constants'
import { useNavigate, useParams } from 'react-router-dom'
import BtnBack from 'shared/BtnBack'
import ConfirmOkModal from 'features/Race/components/ConfirmOkModal'
import LendingTable from 'features/Market/components/LendingTable'
import openNotification from 'utils/toast'
import { GAME_TOKEN_E_HTC } from 'assets/images'
import SkeletonDetail from 'features/components/SkeletonDetail'
import { setCoinUser } from 'features/Balance/coinUser.slice'
import userApi from 'apis/userApi'
import { RequestLoginModal } from 'features/Race/components'
import horseApi from 'apis/horseApi'
import { LENDING_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'

const contract = {
  horseNFT: configs.horseNFT,
  horseFarm: configs.horseFarm,
  transporter: configs.transporter
}

function HorseModalAvailable() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { token_id } = useParams()
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const auth = useAppSelector(state => state.auth)

  const [horse, setHorse] = useState<LendingHorse>()
  const [lendingInfo, setLendingInfo] = useState<LendingHorseInfo>()
  const [lendingHorseInfo, setLendingHorseInfo] = useState<LendingPriceConfigs[]>(TIME_CONFIGS)

  const [isLoading, setIsLoading] = useToggle(false)
  const [isleaseHorse, setIsLeaseHorse] = useState<boolean>(false)

  const [resultLeaseHorse, setResultLeaseHorse] = useState<any>()
  const [resultWithdrawHorse, setResultWithdrawHorse] = useState<any>()
  const [openConfirmWithDrawModal, toggleOpenConfirmWithDrawModal] = useToggle(false)
  const [openConfirmFarmingModal, toggleOpenConfirmFarmingModal] = useToggle(false)
  const [isApproveContract, setIsApproveContract] = useState<boolean>(false)

  const [openInProgressBalanceModal, toggleOpenInProgressBalanceModal] = useToggle(false)
  const [openNotificationModal, toggleOpenNotificationModal] = useToggle(false)
  const [openNotificationHorseDisableModal, toggleOpenNotificationHorseDisableModal] = useToggle(false)
  const [message, setMessage] = useState<notificationTemplate>()

  const [isLendingShow, setLendingShow] = useState(true)
  const [isSendToMarketModal, togggleIsSendToMarketModal] = useToggle(false)
  const [isBorrowModal, toggleIsBorrowModal] = useToggle(false)
  const [isCancelLendingModal, toggleIsCancelLendingModal] = useToggle(false)
  const [isRequestLoginModalOpen, toggleIsRequestLoginModalOpen] = useToggle(false)
  const [isHorseInRace, toggleIsHorseInRace] = useToggle(false)

  const [lendingType, setLendingType] = useState('')
  const [isDisable, toggleIsDisable] = useToggle(false)
  const [value, setValue] = useState<LendingPriceConfigs>()
  const [btnLoading, setBtnLoading] = useToggle(false)
  const [messageError, setMessageError] = useState('')

  useEffect(() => {
    fetchHorse()
  }, [token_id])

  useEffect(() => {
    if (!value && !lendingHorseInfo?.some(value => value.active === true)) {
      setValue(undefined)
    }

    if (value && parseInt(value?.value) >= 0) {
      toggleIsDisable(false)
      return
    }
    toggleIsDisable(true)
  }, [value])

  useEffect(() => {
    if (!isleaseHorse) return
    createLeaseHorseContract()
  }, [isleaseHorse])

  useEffect(() => {
    if (isApproveContract === true) {
      handleLeaseHorseContract()
    }
  }, [isApproveContract])

  const fetchHorse = async () => {
    setIsLoading(true)
    const [error, horseResponse]: any = await handleAsyncRequest<ApiResponse<LendingHorseMarket>>(
      lendingApi.getHorseLendingDetails(token_id || '')
    )
    if (error) {
      if (error.code === 400) {
        setMessage?.({
          body: error.message,
          title: MODAL_TYPE.failed
        })
      }
      toggleOpenNotificationHorseDisableModal?.(true)
    }
    if (horseResponse) {
      const fetchedHorse = horseResponse.data
      if (convert_status_lending(fetchedHorse.lending_info.lending_status) === LENDING_STATUS.InFarm) {
        setLendingShow(false)
      }
      setHorse(fetchedHorse.horse)
      setLendingInfo(fetchedHorse?.lending_info)
      const priceConfigs = fetchedHorse?.lending_info?.price_configs
      const activeFirstDay =
        !_.isEmpty(priceConfigs) &&
        priceConfigs.map((v: any, index: number) => {
          if (index === 0) {
            setValue({ ...v, active: true })
            return { ...v, active: true }
          } else {
            return { ...v, active: false }
          }
        })
      setLendingHorseInfo(activeFirstDay || TIME_CONFIGS)
    }
    setIsLoading(false)
  }

  const handleLeaseHorse = async () => {
    toggleOpenConfirmFarmingModal(false)
    setBtnLoading(true)
    const [error, result]: any = await handleAsyncRequest(lendingApi.postLeaseHorse({ token_id: token_id }))
    setBtnLoading(false)
    if (error) {
      if (error.code === 404) {
        setMessage?.({
          body: t(`${LENDING_MESSAGE}.pleaseComeBack`),
          title: MODAL_TYPE.failed
        })
      } else setMessage?.({ body: error.message, title: MODAL_TYPE.failed })
      toggleOpenNotificationModal?.(true)
    }
    if (result) {
      toggleOpenInProgressBalanceModal(true)
      setMessage({ title: 'FARMING' })
      setResultLeaseHorse(result.data)
      setIsLeaseHorse(true)
    }
  }

  const checkNonceWithDrawContract = async (nonce: string) => {
    let checkNonceExits = null as any
    let x = 0
    const intervalID = setInterval(async () => {
      const [, result] = await handleAsyncRequest(lendingApi.postCheckNonce({ nonce }))
      if (!result) return
      checkNonceExits = result.data
      if (checkNonceExits === true) {
        clearInterval(intervalID)
        toggleOpenInProgressBalanceModal(false)
        pushNotification(t(`${LENDING_MESSAGE}.successWithdrawHorse`), true)
        fetchHorse()
      }

      if (++x === 10) {
        if (checkNonceExits === false) {
          clearInterval(intervalID)
          toggleOpenInProgressBalanceModal(false)
          setMessage?.({
            body: t(`${LENDING_MESSAGE}.failedTransaction`),
            title: MODAL_TYPE.failed
          })
          toggleOpenNotificationModal?.(true)
        }
      }
    }, timeCheckNonce)
  }

  const createLeaseHorseContract = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) return
      if (!resultLeaseHorse) return
      const leaseHorseContract = new ethers.Contract(contract.horseNFT, horseNFTABI.contract.abi, signer)
      try {
        await leaseHorseContract.approve(contract.transporter, token_id || '')
        setIsApproveContract(true)
      } catch (err: any) {
        if (err?.code && err?.code == 4001) {
          setMessage?.({
            body: t(`${LENDING_MESSAGE}.failedTransaction`),
            title: MODAL_TYPE.failed
          })
          toggleOpenNotificationModal?.(true)
          toggleOpenInProgressBalanceModal(false)
        }
        if (err?.code && err?.code == -32603) {
          setMessage?.({
            body: t(`${LENDING_MESSAGE}.failedTransaction`),
            title: MODAL_TYPE.failed
          })
          toggleOpenNotificationModal?.(true)
          toggleOpenInProgressBalanceModal(false)
        } else {
          setMessage?.({
            body: t(`${LENDING_MESSAGE}.failedTransaction`),
            title: MODAL_TYPE.failed
          })
          toggleOpenNotificationModal?.(true)
          toggleOpenInProgressBalanceModal(false)
        }
      }
      setIsLeaseHorse(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleLeaseHorseContract = async () => {
    if (!resultLeaseHorse) return
    try {
      const leaseContract = new ethers.Contract(contract.horseFarm, horseFarmABI.contract.abi, signer)
      const coverHorseId = new BigNumber(token_id || '').toFixed()
      const coverBlockExpired = new BigNumber(resultLeaseHorse.block_expired).toFixed()
      try {
        const tx = await leaseContract.lease({
          owner: resultLeaseHorse.owner,
          horseId: coverHorseId,
          blockExpired: coverBlockExpired,
          nonce: resultLeaseHorse.nonce,
          v: resultLeaseHorse.v,
          r: resultLeaseHorse.r,
          s: resultLeaseHorse.s
        })
        console.log('ok', tx)
        checkNonceWithDrawContract(resultLeaseHorse.nonce)
      } catch (err: any) {
        if (err?.code && err?.code === 4001) {
          setMessage?.({
            body: t(`${LENDING_MESSAGE}.failedTransaction`),
            title: MODAL_TYPE.failed
          })
          toggleOpenNotificationModal?.(true)
          toggleOpenInProgressBalanceModal(false)
        } else {
          setMessage?.({
            body: t(`${LENDING_MESSAGE}.failedTransaction`),
            title: MODAL_TYPE.failed
          })
          toggleOpenNotificationModal?.(true)
          toggleOpenInProgressBalanceModal(false)
        }
      }
      setIsApproveContract(false)
    } catch (err: any) {
      setIsApproveContract(false)
      console.log('fail', err)
    }
  }

  const handeLeaseType = () => {
    if (lendingInfo?.lending_type === LENDING_TYPE.Available) return ELeaseType.Available
    if (lendingInfo?.lending_type === LENDING_TYPE.Share) return ELeaseType.Share
    return ''
  }

  const onShowModalCancelLending = () => {
    setMessage({ body: t(`${LENDING_MESSAGE}.cancelLendingConfirm`), title: 'Cancel lending' })
    toggleIsCancelLendingModal(true)
  }

  const handleBtnLendingClick = () => {
    setLendingShow(true)
    setLendingHorseInfo(TIME_CONFIGS)
  }

  const buttonLayout = () => {
    if (!auth.isLogged) {
      return
    }
    switch (convert_status_lending(lendingInfo?.lending_status)) {
      case LENDING_STATUS.Available:
        return (
          <Button
            buttonName='Farming'
            onClickButton={() => toggleOpenConfirmFarmingModal(true)}
            isLoading={btnLoading}
          />
        )
      case LENDING_STATUS.InFarm:
        return (
          <>
            {lendingInfo?.is_owner ?
              <>
                <Button buttonName='Lending Setting' onClickButton={handleBtnLendingClick} disabled={btnLoading} />
                <Button
                  buttonName='Widthdraw to wallet'
                  onClickButton={() => toggleOpenConfirmWithDrawModal(true)}
                  btnCancel
                  isLoading={btnLoading}
                />
              </> : ''
            }
          </>
        )
      default:
        return ''
    }
  }

  const hanldeChangeTable = (item: any, type: string) => {
    if (type === 'checked') {
      const newState = lendingHorseInfo.map(obj => {
        if (convert_status_lending(lendingInfo?.lending_status) !== LENDING_STATUS.InFarm) {
          if (obj.day === item.day) {
            if (obj.active === true) {
              return { ...obj, active: obj.active };
            }
            setValue(item)
            return { ...obj, active: !obj.active };
          }
        } else
          if (obj.id === item.id) {
            setValue(item)
            return { ...obj, active: !obj.active };
          }
        if (convert_status_lending(lendingInfo?.lending_status) === LENDING_STATUS.InFarm) {
          return { ...obj };
        } else
          return { ...obj, active: false };
      });

      setLendingHorseInfo(newState);
    }
    if (type === 'price') {
      const newState = lendingHorseInfo.map(obj => {
        if (obj.id == item.target.id) {
          return { ...obj, value: item.target.value };
        }
        return { ...obj };
      });
      setLendingHorseInfo(newState);
    }
    if (type === 'day') {
      const newState = lendingHorseInfo.map(obj => {
        if (obj.id == item.target.id) {
          return { ...obj, day: item.target.value };
        }
        return { ...obj };
      });
      setLendingHorseInfo(newState);
    }
  }


  const handleParamsPriceConfigs = lendingHorseInfo.reduce((prev: any, cur) => {
    const { value, day, active } = cur
    if (active === true) {
      prev.push({ value, day })
    }
    return prev
  }, [])

  const handleSendToMarket = async () => {
    setBtnLoading(true)
    const [error, result]: any = await handleAsyncRequest(lendingApi.postSendToMarket(token_id || '', {
      lending_type: lendingType ? lendingType : LENDING_TYPE.Available,
      price_configs: handleParamsPriceConfigs
    }))
    setBtnLoading(false)
    if (error) {
      togggleIsSendToMarketModal(false)
      toggleOpenNotificationModal(true)
      setMessage({ body: error.code === 400 ? error.message : error?.errors[0]?.message, title: MODAL_TYPE.failed })
    }
    if (result) {
      togggleIsSendToMarketModal(false)
      pushNotification(t(`${LENDING_MESSAGE}.successRentalHorse`), true)
      fetchHorse()
      setLendingType(LENDING_TYPE.Available)
    }
  }

  const handleConfirmSendToMarket = () => {
    const dayArr = handleParamsPriceConfigs.map((item: any) => { return parseInt(item.day) });
    const isZero = dayArr.some((item: string) => {
      if (+item <= 0 || +item >= 365) {
        return true
      }
      else return false
    });
    const isNull = dayArr.some((item: string) => {
      if (!item) {
        return true
      }
    });
    const isDuplicate = dayArr.some((item: string, idx: number) => {
      return dayArr.indexOf(item) != idx
    });
    if (isNull) {
      setMessageError(t(`${LENDING_MESSAGE}.enterHorseRentalTime`))
      return
    }
    if (isZero) {
      setMessageError(t(`${LENDING_MESSAGE}.enterFrom1to364`))
      return
    }
    if (isDuplicate) {
      setMessageError(t(`${LENDING_MESSAGE}.enterDatesCannotBeSame`))
      return
    }

    if (lendingType !== LENDING_TYPE.Share) {
      const valueArr = handleParamsPriceConfigs.map((item: any) => {
        return item.value
      })
      const checkValue = (element: string) => parseInt(element) <= 0
      if (valueArr.some(checkValue)) {
        setMessageError(t(`${LENDING_MESSAGE}.enterPriceThan0`))
        return
      }
    }

    togggleIsSendToMarketModal(true)
    setMessageError('')
    setMessage({ body: t(`${LENDING_MESSAGE}.lendThisHorseConfirm`) })
  }

  const onShowModalBorrow = () => {
    if (!auth.isLogged) {
      toggleIsRequestLoginModalOpen(true)
      return
    }
    toggleIsBorrowModal(true)
    setMessage({ title: 'Borrowing' })
  }

  const fetchCoinUser = async () => {
    const [, resultCoinUser] = await handleAsyncRequest(userApi.getUserItems())
    if (!resultCoinUser) return
    dispatch(setCoinUser(resultCoinUser?.data))
  }

  const handleHorseRent = async () => {
    setBtnLoading(true)
    const [error, result]: any = await handleAsyncRequest(lendingApi.postHorseRent(token_id || '', {
      day: value?.day
    }))
    setBtnLoading(false)
    if (error) {
      if (error.code === 403) {
        toggleIsRequestLoginModalOpen(true)
        return
      }
      setMessage({ body: error?.message, title: MODAL_TYPE.failed })
      toggleOpenNotificationModal(true)
    }
    if (result) {
      // borrow success
      fetchCoinUser()
      pushNotification(t(`${LENDING_MESSAGE}.horseJoinRaceConfirm`), true)
      fetchHorse()
    }
    toggleIsBorrowModal(false)
  }

  const checkHorseIsInRace = async () => {
    setBtnLoading(true)
    const [, result]: any = await handleAsyncRequest(horseApi.getHorseIsInRace(token_id || '', { statuses: 'OPEN' }))
    setBtnLoading(false)
    if (result?.data?.is_in_race) {
      toggleIsHorseInRace(true)
      setMessage({ body: t(`${LENDING_MESSAGE}.successRentedHorse`), title: MODAL_TYPE.warning })
      toggleIsCancelLendingModal(false)
      return
    } else {
      handleHorseBackToFarm()
    }
  }

  const handleHorseBackToFarm = async () => {
    setBtnLoading(true)
    const [error, result]: any = await handleAsyncRequest(lendingApi.postHorseBackToFarm(token_id || ''))
    setBtnLoading(false)
    if (error) {
      if (error.code === 403) {
        toggleIsRequestLoginModalOpen(true)
      } else {
        toggleOpenNotificationModal(true)
        setMessage({ body: error?.message, title: MODAL_TYPE.failed })
      }
    }
    if (result) {
      pushNotification(t(`${LENDING_MESSAGE}.successCancelLending`), true)
      fetchHorse()
    }
    toggleIsCancelLendingModal(false)
    toggleIsHorseInRace(false)
  }

  const pushNotification = (description: string, isSuccess?: boolean) => {
    openNotification({
      message: '',
      description: description,
      className: isSuccess ? 'toast-success' : 'toast-error'
    })
  }

  const handleBtnWithdrawClick = async () => {
    toggleOpenConfirmWithDrawModal(false)
    setBtnLoading(true)
    const [error, result]: any = await handleAsyncRequest(lendingApi.postWithrawHorse({ token_id }))
    setBtnLoading(false)
    if (error) {
      if (error.code === 400) {
        setMessage?.({
          body: error.message,
          title: MODAL_TYPE.failed
        })
      }
      toggleOpenNotificationModal(true)
    }
    if (result) {
      toggleOpenInProgressBalanceModal(true)
      setMessage({ title: 'WITHDRAW' })
      setResultWithdrawHorse(result.data)
    }
  }

  useEffect(() => {
    if (!resultWithdrawHorse) return
    handleWithDrawHorseContract()
  }, [resultWithdrawHorse])

  const handleWithDrawHorseContract = async () => {
    if (!resultWithdrawHorse) return
    try {
      const leaseContract = new ethers.Contract(contract.horseFarm, horseFarmABI.contract.abi, signer)
      const coverHorseId = new BigNumber(token_id || '').toFixed()
      const coverBlockExpired = new BigNumber(resultWithdrawHorse.block_expired).toFixed()
      try {
        const tx = await leaseContract.withdraw({
          owner: resultWithdrawHorse.owner,
          horseId: coverHorseId,
          blockExpired: coverBlockExpired,
          nonce: resultWithdrawHorse.nonce,
          v: resultWithdrawHorse.v,
          r: resultWithdrawHorse.r,
          s: resultWithdrawHorse.s
        })
        console.log('ok', tx)
        checkNonceWithDrawContract(resultWithdrawHorse.nonce)
      } catch (err: any) {
        console.log(err)
        if (err?.code && err?.code === 4001) {
          setMessage?.({
            body: t(`${LENDING_MESSAGE}.failedTransaction`),
            title: MODAL_TYPE.failed
          })
          toggleOpenNotificationModal?.(true)
          toggleOpenInProgressBalanceModal(false)
        }
      }
    } catch (err: any) {
      console.log('fail', err)
    }
  }

  const handleBtnBackClick = () => {
    if (convert_status_lending(lendingInfo?.lending_status) === LENDING_STATUS.Borrowed && lendingInfo?.is_owner === false) {
      navigate("/lending/my-borrow");
      return
    }
    if (convert_status_lending(lendingInfo?.lending_status) === LENDING_STATUS.InFarm) {
      navigate("/lending/my-asset");
      return
    }
    navigate(-1)
  }
  const handleNavigateBack = () => {
    navigate(-1)
  }
  return (
    <div className='container'>
      <HorseModalAvailableStyled>
        <BtnBack onBack={handleBtnBackClick} />

        {isLoading && <SkeletonDetail />}
        {horse && !isLoading && (
          <div className='horse-detail-container'>
            <div className='quick-view-left'>
              <HorseAvatar horse={horse} lendingInfo={lendingInfo} />
            </div>
            <div className='quick-view-center'>
              <div className='right-container color-white'>
                <HorseBodyInfo horse={horse} isLending={true} />
                {
                  convert_status_lending(lendingInfo?.lending_status) !== LENDING_STATUS.Available && isLendingShow ? '' :
                    (<div className='btn-bottom'>
                      {buttonLayout()}
                    </div>)
                }
              </div>
            </div>

            {convert_status_lending(lendingInfo?.lending_status) !== LENDING_STATUS.Available && isLendingShow ?
              <div className='quick-view-right'>
                <div className='right color-white'>
                  <div className='right-body'>
                    <LendingTable
                      timeLending={lendingHorseInfo || []}
                      onTimeLending={setLendingHorseInfo}
                      leaseType={handeLeaseType()}
                      lendingInfo={lendingInfo}
                      onChange={hanldeChangeTable}
                      onLendingType={setLendingType}
                      disabledSelect={convert_status_lending(lendingInfo?.lending_status) !== LENDING_STATUS.InFarm ? true : false}
                      messageError={messageError}
                      onSetMessageError={setMessageError}
                    />
                  </div>
                </div>
                <div className='right-bottom'>
                  {
                    convert_status_lending(lendingInfo?.lending_status) === LENDING_STATUS.InFarm &&
                    <Button buttonName='Confirm' onClickButton={handleConfirmSendToMarket} isLoading={btnLoading} disabled={_.isEmpty(handleParamsPriceConfigs)} />
                  }
                  {
                    ((convert_status_lending(lendingInfo?.lending_status) === LENDING_STATUS.Lending && lendingInfo?.is_owner) ||
                      (convert_status_lending(lendingInfo?.lending_status) === LENDING_STATUS.Borrowed && lendingInfo?.lending_type === LENDING_TYPE.Share && lendingInfo?.is_owner)) &&
                    (
                      <Button buttonName={`${convert_status_lending(lendingInfo?.lending_status) === LENDING_STATUS.Borrowed && lendingInfo?.lending_type === LENDING_TYPE.Share && lendingInfo?.is_owner ? 'Cancel Borrowed' : 'Cancel Lending'}`} onClickButton={onShowModalCancelLending} btnCancel isLoading={btnLoading} />
                    )
                  }
                  {
                    convert_status_lending(lendingInfo?.lending_status) === LENDING_STATUS.Lending && !lendingInfo?.is_owner &&
                    (
                      <Button buttonName='Borrow' onClickButton={onShowModalBorrow} disabled={isDisable} isLoading={btnLoading} />
                    )
                  }
                </div>
              </div> : ''
            }
          </div>
        )}

        {openInProgressBalanceModal && <InProgressBalanceModal title={`${message?.title} IN PROGRESS`} />}
        {openNotificationModal && (
          <ConfirmOkModal
            toggleIsModalOpen={toggleOpenNotificationModal}
            onCloseButtonClick={toggleOpenNotificationModal}
            onConfirm={toggleOpenNotificationModal}
            message={<span> {message?.body} </span>}
            title={message?.title}
          />
        )}

        {isSendToMarketModal && (
          <ConfirmOkModal
            toggleIsModalOpen={togggleIsSendToMarketModal}
            onCloseButtonClick={togggleIsSendToMarketModal}
            onConfirm={handleSendToMarket}
            message={<span> {message?.body} </span>}
            title={message?.title}
            isLoading={btnLoading}
          />
        )}
        {isCancelLendingModal && (
          <ConfirmOkModal
            toggleIsModalOpen={toggleIsCancelLendingModal}
            onCloseButtonClick={toggleIsCancelLendingModal}
            onConfirm={checkHorseIsInRace}
            message={
              <div className='font-size-18'>
                {t(`${LENDING_MESSAGE}.cancelLendingConfirm`)}
              </div>
            }
            isLoading={btnLoading}
          />
        )}
        {isBorrowModal && (
          <ConfirmOkModal
            toggleIsModalOpen={toggleIsBorrowModal}
            onCloseButtonClick={toggleIsBorrowModal}
            onConfirm={handleHorseRent}
            message={
              <div className='text-start ps-3'>
                <div className='confirm-borrow-question'> {t(`${LENDING_MESSAGE}.reallyRentHorseConfirm`)}</div>
                <div className='font-size-24' style={{ fontSize: '24px' }}>
                  {t(`${LENDING_MESSAGE}.totalRentalDays`)} &nbsp; : &nbsp; {value?.day} day
                </div>
                <div className='font-size-24' style={{ fontSize: '24px' }}>
                  {t(`${LENDING_MESSAGE}.totalRentalPrice`)} &nbsp;: &nbsp; {value?.value}{' '}
                  {lendingInfo?.lending_type === LENDING_TYPE.Available ? (
                    <span className='unit'>
                      <img width={20} src={GAME_TOKEN_E_HTC} alt='e-htc' className='e-htc' />
                    </span>
                  ) : (
                    '%'
                  )}
                </div>
              </div>
            }
            title={message?.title}
            isLoading={btnLoading}
            btnOk='Approved'
            btnCancel='Cancel'
          />
        )}
        {openConfirmWithDrawModal && (
          <ConfirmOkModal
            toggleIsModalOpen={toggleOpenConfirmWithDrawModal}
            onCloseButtonClick={toggleOpenConfirmWithDrawModal}
            onConfirm={handleBtnWithdrawClick}
            message={<div className='font-size-24  farm-Service'>
              {`Metahorse Farm Service

                When farming, racehorse NFTs are transacted to the lending pool.
                A fee (SPC) is required for farming.
                After farming, you will not be able to:
                ・Level up
                ・Participating in races

                Withdraw the transaction from the lending pool to your wallet
                A processing fee (SPC) is also required for withdraw.

                Do you want withdraw horse from farm?`}
            </div>}
          />
        )}
        {openNotificationHorseDisableModal && (
          <ConfirmOkModal
            toggleIsModalOpen={toggleOpenNotificationHorseDisableModal}
            onCloseButtonClick={handleNavigateBack}
            message={<span> {message?.body} </span>}
            title={message?.title}
          />)}
        {openConfirmFarmingModal && (
          <ConfirmOkModal
            toggleIsModalOpen={toggleOpenConfirmFarmingModal}
            onCloseButtonClick={toggleOpenConfirmFarmingModal}
            onConfirm={handleLeaseHorse}
            message={<div className='font-size-24 farm-Service'>
              {`Metahorse Farm Service

                When farming, racehorse NFTs are transacted to the lending pool.
                A fee (SPC) is required for farming.
                After farming, you will not be able to:
                ・Level up
                ・Participating in races

                Withdraw the transaction from the lending pool to your wallet
                A processing fee (SPC) is also required for withdraw.

                Do you want submit(send) horse to farm?`}
            </div>}
          />
        )}
        {isHorseInRace && (
          <ConfirmOkModal
            toggleIsModalOpen={toggleIsHorseInRace}
            onCloseButtonClick={toggleIsHorseInRace}
            onConfirm={handleHorseBackToFarm}
            message={<span> {message?.body} </span>}
            title={message?.title}
            isLoading={btnLoading}
          />
        )}
        {isRequestLoginModalOpen && <RequestLoginModal toggleIsModalOpen={toggleIsRequestLoginModalOpen} />}
      </HorseModalAvailableStyled>
    </div>
  )
}

export default HorseModalAvailable
