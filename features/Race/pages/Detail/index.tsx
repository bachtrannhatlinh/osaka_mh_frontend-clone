/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'
import { Input } from 'antd'
import raceApi from 'apis/raceApi'
import userApi from 'apis/userApi'
import { constants, links } from 'apps'
import { TIME_CLOSE_MODAL } from 'apps/constants'
import {
  CARET_LEFT,
  CROWN_BRONZE,
  CROWN_BRONZE_BORDER,
  CROWN_GOLD,
  CROWN_GOLD_BORDER,
  CROWN_SILVER,
  CROWN_SILVER_BORDER,
  FEMALE_ICON,
  GAME_TOKEN_E_HTC,
  GAME_TOKEN_E_PRZ,
  GAME_TOKEN_Z_PRZ,
  MALE_ICON
} from 'assets/images'
import dayjs from 'dayjs'
import { setCoinUser } from 'features/Balance/coinUser.slice'
import HorseModalRaceView from 'features/Horse/components/HorseModalRaceView'
import { setDataCancelRace } from 'features/ModalCancelRace/cancelRaceData.slice'
import {
  BoardViewTime,
  ChooseHorseModal,
  ConfirmChooseHorseModal,
  FollowRace,
  RaceTable,
  RequestLoginModal,
  ResultHorseModal,
  SchedulingLiveSocket,
  SchedulingLiveStarIn,
  TimeRace
} from 'features/Race/components'
import ConfirmOkModal from 'features/Race/components/ConfirmOkModal'
import { useAppDispatch, useAppSelector, useFetch, usePreventBodyScroll, useToggle } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { decode } from 'js-base64'
import {
  EnterRaceError,
  Gate,
  GetRaceListParams,
  GetRaceListPopupParams,
  JoinRaceBody,
  Race,
  RaceClassNumber,
  RaceStatus
} from 'models'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { ClassTag } from 'shared'
import { WS_MANAGER } from 'socket/socketClient'
import { openAndSchedulingDetailColumns, resultDetailColumns } from 'utils/columns'
import {
  capitalizeOnlyFirstLetter,
  formatTimeV2,
  handleAsyncRequest,
  ordinalSuffixOf,
  shortenUserName
} from 'utils/helper'
import DetailStyled from './styled'

const getRegisteredQuantity = (gates: Gate[]) => gates.filter(gate => gate.horse !== null).length

function SchedulingLive() {
  const [joiningGate, setJoiningGate] = useState<number>(0)
  const { raceId } = useParams()
  const [triggerFetchRaceDetail, setTriggerFetchRaceDetail] = useState(false)
  const [isModalChooseHorseOpen, toggleIsChooseHorseModalOpen] = useToggle(false)
  const [isModalConfirmChooseHorseOpen, toggleConfirmIsChooseHorseModalOpen] = useToggle(false)
  const [isModalJoinRaceOpen, toggleIsModalJoinRaceOpen] = useToggle(false)
  const [isModalResultHorseOpen, toggleIsModalResultHorseOpen] = useToggle(false)
  const [isRequestLoginModalOpen, toggleIsRequestLoginModalOpen] = useToggle(false)
  const [isModalConfirmCancelOpen, toggleIsModalConfirmCancelOpen] = useToggle(false)
  usePreventBodyScroll(isModalChooseHorseOpen)
  usePreventBodyScroll(isRequestLoginModalOpen)
  const [viewRace2D, setViewRace2D] = useState(false)
  const [disableRaceTable, setDisableRaceTable] = useState(true)
  const [firstTime, setFirstTime] = useState(0)
  const [timeCancelRace, setTimeCancelRace] = useState(0)
  const { data: raceDetail } = useFetch<Race, string>({ fetcher: raceApi.getRace, params: raceId || '' }, [
    raceId,
    triggerFetchRaceDetail
  ])
  const registeredGateQuantity = useMemo(() => getRegisteredQuantity(raceDetail?.gates ?? []), [raceDetail])
  const auth = useAppSelector(state => state.auth)
  const ownerName = useAppSelector(state => state.profile)
  const status = raceDetail?.status
  const [triggerReplay, toggleTriggerReplay] = useToggle(false)
  const [isRaceEnd, toggleIsRaceEnd] = useToggle(false)
  const [isRaceInProcess, toggleIsRaceInProcess] = useToggle(false)
  const [isRacePassword, toggleIsRacePassword] = useToggle(false)

  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')

  const memoizedOpenAndSchedulingDetailColumns = useMemo(() => openAndSchedulingDetailColumns, [])
  const memoizedResultDetailColumns = useMemo(() => resultDetailColumns, [])
  const [isFinishedRace, toggleFinishedRace] = useState<boolean>(false)
  const [isRaceStatusClosed, toggleIsRaceStatusClosed] = useState<boolean>(false)
  const [isOpenHorseModal, setOpenHorseModal] = useState(false)
  const [horseId, setHorseId] = useState(0)
  const [horseConfirmId, setHorseConfirmId] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [messageError, setMessageError] = useState('not_enough')
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const date = new Date()
  const paramsFilterResult: GetRaceListPopupParams = {
    limit: 10,
    page: 1,
    startAt: dayjs(date).format('YYYY-MM-DD[T]HH:mm:ss.SSS+07:00'),
    endAt: dayjs(date).format('YYYY-MM-DD[T]HH:mm:ss.SSS+07:00'),
    startInstance: '1000',
    endInstance: '1000',
    raceClass: RaceClassNumber.Class1
    // sort: ['id-desc']
  }

  const convertToRaceGate = (race?: Race) => {
    if (!race) {
      return []
    }

    const { gates, race_prizes, id, entry_fee } = race

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gates.sort((gate1: any, gate2: any) => gate1?.race_position - gate2?.race_position)

    return gates.map((gate, index) => {
      if (gate.horse === null) {
        return { ...gate, gate: parseInt(gate.gate.slice(-2)) }
      }

      const htmlHorseString = `
          <div class="d-flex align-items-center justify-content-center gap-4">
            <img src=${gate.horse.sub_avatar} className='horse-avatar' width="40px" />
            <span <span class="font-bold ">${capitalizeOnlyFirstLetter(gate.horse.name)}</span>
          </div>
        `

      const positionHorseHaveTop = (url_img: string, imgHorseTopBorder: string) => {
        return `
            <div class="d-flex align-items-center justify-content-center gap-2">
                <img src=${imgHorseTopBorder} class='prize-border position-absolute' />
                <img src=${url_img} />
                <span class="font-bold">${ordinalSuffixOf(parseInt(gate.race_position))}</span>
            `
      }

      const positionHorseNoTop = () => {
        return `
            <div class="d-flex align-items-center justify-content-center gap-2">
              <span class="font-bold">${ordinalSuffixOf(parseInt(gate.race_position))}</span>
            `
      }

      const handlePositionHorse = () => {
        if (parseInt(gate.race_position) === 1) {
          return positionHorseHaveTop(CROWN_GOLD, CROWN_GOLD_BORDER)
        }
        if (parseInt(gate.race_position) === 2) {
          return positionHorseHaveTop(CROWN_SILVER, CROWN_SILVER_BORDER)
        }
        if (parseInt(gate.race_position) === 3) {
          return positionHorseHaveTop(CROWN_BRONZE, CROWN_BRONZE_BORDER)
        }
        return positionHorseNoTop()
      }

      const handleShowBloodline = () => {
        if (gate.horse?.bloodline.name) {
          return gate.horse.gender
            ? ` <img src=${gate.horse.gender === 'MALE' ? MALE_ICON : FEMALE_ICON} class='horse-gender' width="40px" /> 
              <span class="font-bold">${gate.horse.bloodline.name} </span>
              `
            : `<span class="font-bold">${gate.horse.bloodline.name}</span>`
        } else if (gate.horse?.gender) {
          return `<span class="font-bold">${capitalizeOnlyFirstLetter(gate.horse.gender)}</span>`
        } else {
          return `<span class="font-bold">---</span>`
        }
      }

      const styleFirstCount = `<span class="font-bold">${gate.horse.career.first_count}/</span>`
      const styleSecondCount = `<span class="font-bold">${gate.horse.career.second_count}/</span>`
      const styleThirdCount = `<span class="font-bold">${gate.horse.career.third_count}</span>`

      const handleShowOwnerName = () => {
        return `<span className='font-bold'>${shortenUserName(gate.horse?.user.name)}</span>`
      }

      return {
        cancel_count_down: id,
        experience_received: gate.experience_received,
        detailHorse: gate.horse.id,
        race_position: handlePositionHorse(),
        gate: `<span class="font-bold table-gate-no">${parseInt(gate.gate.slice(-2))}</span>`,
        horse: htmlHorseString,
        blood_line: handleShowBloodline(),
        statistic: `<span class="font-bold career-horse">${gate.horse.career.total_number_of_races}</span> ${styleFirstCount}${styleSecondCount}${styleThirdCount}`,
        owner_name: handleShowOwnerName(),
        user_id: gate.horse.user.id,
        race_prize: race_prizes[index]?.prize,
        getEntryFee: entry_fee
      }
    })
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const passwordInput = e.target.value
    setPassword(passwordInput)
  }

  const checkRacePassword = async () => {
    const [error, result]: any = await handleAsyncRequest(raceApi.postRacePassword(raceId as string, { password: !_.isEmpty(password) ? password : null }))
    if (error) {
      setPasswordMessage(error.message)
      setCheckPassword(false)
    }
    if (result) {
      toggleIsChooseHorseModalOpen()
      toggleIsRacePassword(false)
      setPasswordMessage('')
      setCheckPassword(true)
    }
  }

  const handleRegisterButtonClick = (gateNumber: number) => {
    if (!auth.isLogged) {
      toggleIsRequestLoginModalOpen(true)
      return
    }
    setJoiningGate(gateNumber)

    if (raceDetail && raceDetail.protected_race) {
      if (raceDetail.had_joined) {
        toggleIsChooseHorseModalOpen()
        toggleIsRacePassword(false)
        return
      }
      if (checkPassword) {
        toggleIsChooseHorseModalOpen()
        toggleIsRacePassword(false)
        return
      }
      toggleIsRacePassword(true)
      return
    } else {
      toggleIsChooseHorseModalOpen()
      toggleIsRacePassword(false)
    }

  }

  // count down cancel race
  const timerCancel = () => setTimeCancelRace(timeCancelRace - 1000)
  useEffect(() => {
    if (timeCancelRace <= 0) {
      return
    }
    const id = setInterval(timerCancel, 1000)
    return () => clearInterval(id)
  }, [timeCancelRace])

  // get time when access first room horse
  useEffect(() => {
    if (raceDetail && parseInt(raceDetail?.count_down) > 0) {
      const start_at = parseInt(raceDetail?.count_down)
      setFirstTime(start_at)
    }
    setTimeCancelRace(raceDetail?.count_down_cancel || 0) // prepare count down cancel race
  }, [raceDetail])

  // time waiting
  const timer = () => setFirstTime(firstTime - 1000)
  useEffect(() => {
    if (firstTime <= 0) {
      toggleTriggerFetchRaceDetail()
      return
    }
    const id = setInterval(timer, 1000)
    return () => clearInterval(id)
  }, [firstTime])

  // handle room have status pending
  const handleDisplayColumn = () => {
    let displayColumns = null
    if (status === 'OPEN' || status === 'WAITING' || status === 'SCHEDULING') {
      displayColumns = memoizedOpenAndSchedulingDetailColumns
    } else {
      displayColumns = memoizedResultDetailColumns
    }
    return displayColumns
  }

  const gates = useMemo(() => convertToRaceGate(raceDetail), [raceDetail])
  const navigate = useNavigate()
  const openRace = links.race.open()
  const cancelRaceNotFound = links.notFound.index()

  // handle room have status pending
  useEffect(() => {
    function handleStatusRoom() {
      if (status === 'PENDING') return navigate(openRace)
      if (status === 'CANCEL') return navigate(cancelRaceNotFound)
    }
    handleStatusRoom()
  }, [status])

  const toggleTriggerFetchRaceDetail = () => setTriggerFetchRaceDetail(value => !value)
  const [timeLive, setTimeLive] = useState<number>(0)

  const onChangeTimeLive = (time: number) => {
    if (time === 0) {
      setIsLoading(true)
    } else setIsLoading(false)
    setTimeLive(time)
  }

  // handle room have status LIVE
  useEffect(() => {
    if (status === 'LIVE') {
      setDisableRaceTable(false)
    }
  }, [status])

  const fetchCoinUser = async () => {
    const [, resultCoinUser] = await handleAsyncRequest(userApi.getUserItems())
    if (!resultCoinUser) return

    dispatch(setCoinUser(resultCoinUser.data))
  }

  const fetchDataCancelRace = async () => {
    const [, resultCancelRace] = await handleAsyncRequest(raceApi.getRaceCancel({ page: 1, limit: 20 }))
    if (!resultCancelRace) return
    dispatch(setDataCancelRace(resultCancelRace.data))
  }

  const TimeRaceResult = useCallback(() => {
    if (!raceDetail || status !== CLOSED) return null
    const timeElapsed = +(raceDetail.end_at || 0) - +(raceDetail.real_start_at || 0)
    return (
      <>
        <div className='info-left-item d-flex align-items-center'>
          <span className='title'>{t(`${NOTIFICATION_MESSAGE}.runAt`)}</span>
          <span className='value color-white'>
            {dayjs(parseInt(raceDetail.start_at)).format('YYYY-MM-DD')}{' '}
            {dayjs(parseInt(raceDetail.start_at)).format('HH:mm')}
          </span>
        </div>
        {viewRace2D ? (
          ''
        ) : (
          <div className='info-left-item d-flex align-items-center'>
            <span className='title'>{t(`${NOTIFICATION_MESSAGE}.timeElapsed`)}</span>
            <span className='value color-white'>{dayjs(timeElapsed).format('mm:ss')}</span>
          </div>
        )}
      </>
    )
  }, [raceDetail, status, viewRace2D])

  // funtion handle display view time & live star in 2d
  function handleDisplayViewTimeRace() {
    let scheduledRaces = null

    if (status === 'LIVE') {
      scheduledRaces = (
        <SchedulingLiveSocket
          isRaceEnd={isRaceEnd}
          toggleIsRaceEnd={toggleIsRaceEnd}
          toggleIsRaceInProcess={toggleIsRaceInProcess}
          toggleTriggerFetchRaceDetail={toggleTriggerFetchRaceDetail}
          toggleFinishedRace={toggleFinishedRace}
          onChangeTimeLive={onChangeTimeLive}
          onDisableRaceTable={setDisableRaceTable}
          disableRaceTable={disableRaceTable}
          raceDetail={raceDetail as Race}
        />
      )
    }

    if (status === 'WAITING' || status === 'SCHEDULING') {
      scheduledRaces =
        viewRace2D === false ? (
          <BoardViewTime
            viewRace2D={setViewRace2D}
            idRaceDetail={raceDetail?.id}
            disableRaceTable={setDisableRaceTable}
            firstTime={firstTime}
            status={status}
            toggleIsRaceEnd={toggleIsRaceEnd}
          />
        ) : (
          <SchedulingLiveStarIn
            detailResult={raceDetail}
            triggerReplay={triggerReplay}
            isRaceEnd={isRaceEnd}
            toggleIsRaceEnd={toggleIsRaceEnd}
            toggleIsRaceInProcess={toggleIsRaceInProcess}
            status={status}
          />
        )
    }

    const open = ''
    const result =
      viewRace2D === false ? (
        <BoardViewTime
          viewRace2D={setViewRace2D}
          idRaceDetail={raceDetail?.id}
          disableRaceTable={setDisableRaceTable}
          firstTime={firstTime}
          status={status ?? 'CLOSED'}
          toggleIsRaceEnd={toggleIsRaceEnd}
        />
      ) : (
        <SchedulingLiveStarIn
          detailResult={raceDetail}
          triggerReplay={triggerReplay}
          isRaceEnd={isRaceEnd}
          toggleIsRaceEnd={toggleIsRaceEnd}
          toggleIsRaceInProcess={toggleIsRaceInProcess}
          status={status}
        />
      )

    let displayViewRace = null

    if (status === 'OPEN') {
      displayViewRace = open
    }

    if (status === 'SCHEDULING' || status === 'WAITING' || status === 'LIVE') {
      displayViewRace = scheduledRaces
    }

    if (status === 'CLOSED') {
      displayViewRace = result
      fetchCoinUser()
    }

    return displayViewRace
  }

  const handleQuickView = (gateNumber: number) => {
    status === 'OPEN' || status === 'CLOSED'
      ? (() => {
        setOpenHorseModal(true)
        setHorseId(gateNumber)
      })()
      : ''
  }

  const handleCloseHorseModal = () => {
    setOpenHorseModal(false)
  }

  // function handle display racetable
  function handleDisplayRaceTable() {
    let displayRaceTable = null
    if (!disableRaceTable) {
      displayRaceTable = ''
    }

    const clonedGates = gates.map(gate => {
      return gate
    })

    const defaultParams: GetRaceListParams = {
      limit: 10,
      page: 1,
      status: RaceStatus.SCHEDULING,
      freeRace: false,
      myHorse: false,
      search: ''
    }

    if (disableRaceTable) {
      displayRaceTable = (
        <RaceTable
          data={clonedGates}
          columns={handleDisplayColumn()}
          onRegisterButtonClick={handleRegisterButtonClick}
          loader={true}
          params={defaultParams}
          raisePage={defaultParams}
          status={status}
          onQuickView={handleQuickView}
          ownerName={ownerName}
          paramsFilterResult={paramsFilterResult}
          timeCancelRace={timeCancelRace}
          toggleIsModalConfirmCancelOpen={toggleIsModalConfirmCancelOpen}
          isModalConfirmCancelOpen={isModalConfirmCancelOpen}
        />
      )
    }

    return displayRaceTable
  }

  // handle replay button
  const handleReplayBtnClick = () => {
    toggleTriggerReplay()

    if (isRaceEnd) {
      toggleIsRaceEnd(false)
      toggleIsRaceInProcess(false)
      return
    }

    toggleIsRaceInProcess(true)
  }

  const handleRaceDetailStatus = (status?: string) => {
    if (status && status === 'RESULT') {
      return (status = 'CLOSED')
    }
    return status
  }

  const displayTotalPrizes = (raceDetail: Race) => {
    if (raceDetail?.entry_fee === 0) {
      if (raceDetail?.total_prize === 0) {
        return <div className='value font-bold color-white'>---</div>
      } else {
        return (
          <div className='value font-bold color-z-prz'>
            {raceDetail?.total_prize}
            <img src={GAME_TOKEN_Z_PRZ} alt='' className='game-token-e-prz' />
          </div>
        )
      }
    } else {
      if (raceDetail?.total_prize === 0) {
        return <div className='value font-bold color-e-prz'>---</div>
      } else {
        return (
          <div className='value font-bold color-e-prz'>
            {raceDetail?.total_prize}
            <img src={GAME_TOKEN_E_PRZ} alt='' className='game-token-e-prz' />
          </div>
        )
      }
    }
  }
  //function handle StarIn Live Result
  const handleStarInLiveResult = () => {
    let displayResult = null
    if (status === 'LIVE' || (viewRace2D && status === 'WAITING')) {
      displayResult = <FollowRace status={status} firstTime={firstTime} />
    } else if (viewRace2D && status === 'CLOSED') {
      displayResult = (
        <div className='replay-btn-container d-flex align-items-center'>
          <button onClick={handleReplayBtnClick} className='replay-btn font-bold w-100 h-100'>
            <span className='color-primary'>
              {isRaceEnd ? 'Replay' : triggerReplay ? 'Stop' : isRaceInProcess ? 'Resume' : 'Play'}
            </span>
          </button>
        </div>
      )
    } else {
      displayResult = (
        <div className='info-right d-flex align-items-center'>
          <div className='info-right-item text-center'>
            <div className='title'>{t(`${NOTIFICATION_MESSAGE}.raceStatus`)}</div>
            <div className='value color-yellow'>{handleRaceDetailStatus(raceDetail?.status)}</div>
          </div>
          <div className='info-right-item text-center'>
            <div className='title'>{t(`${NOTIFICATION_MESSAGE}.entryFee`)}</div>
            {raceDetail?.entry_fee === 0 ? (
              <span className='font-bold color-primary'>{t(`${NOTIFICATION_MESSAGE}.free`)}</span>
            ) : (
              <div className='value font-bold color-e-htc'>
                {raceDetail?.entry_fee}
                <img src={GAME_TOKEN_E_HTC} alt='e-htc' className='e-htc' />
              </div>
            )}
          </div>
          <div className='info-right-item text-center'>
            <div className='title'>{t(`${NOTIFICATION_MESSAGE}.totalPrizes`)}</div>
            {displayTotalPrizes(raceDetail as Race)}
          </div>
          {status === 'RESULT' ? (
            <div className='info-right-item text-center'>
              <div className='title'>{t(`${NOTIFICATION_MESSAGE}.horseNum`)}</div>
              <div className='value color-white'>12</div>
            </div>
          ) : (
            <div className='info-right-item text-center'>
              <div className='title'>{t(`${NOTIFICATION_MESSAGE}.horseNumber`)}</div>
              <div className='value color-white'>{registeredGateQuantity}</div>
            </div>
          )}
        </div>
      )
    }

    return displayResult
  }

  const handleCloseModal = () => {
    return toggleIsChooseHorseModalOpen(false)
  }

  const handleCloseModalConfirm = () => {
    return toggleConfirmIsChooseHorseModalOpen(false)
  }

  const handleCloseModalJoinRaceOpen = () => {
    return toggleIsModalJoinRaceOpen(false)
  }

  const handleCloseModalResult = () => toggleIsModalResultHorseOpen(false)

  const handleConfirmHorse = (id: number) => {
    setHorseConfirmId(id)
    toggleConfirmIsChooseHorseModalOpen(true)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isEnterRaceError = (candidate: any): candidate is EnterRaceError => {
    const isValid: boolean =
      candidate.code === constants.HTTP_STATUS.BAD_REQUEST && typeof candidate.message === 'string'

    return isValid
  }

  const onChooseHorse = async () => {
    if (raceDetail) {
      const joinRaceBody: JoinRaceBody = {
        horse_id: horseConfirmId,
        gate: joiningGate,
        password: !_.isEmpty(password) ? password : null
      }
      let message = ''
      const [error, responseData] = await handleAsyncRequest(raceApi.joinRace(raceDetail.id, joinRaceBody))
      if (error && isEnterRaceError(error)) {
        if (!error.message.includes('enough')) {
          message = error.message
        } else {
          if (error.message === 'Horse has not enough energy') {
            message = 'Horse has not enough energy'
          } else {
            message = 'not_enough'
          }
        }
      }
      if (responseData) {
        setTriggerFetchRaceDetail(value => !value)
        message = 'completed'
        fetchCoinUser()
        fetchDataCancelRace()
      }
      setMessageError(message)
      toggleIsModalJoinRaceOpen(false)
      toggleIsModalResultHorseOpen(true)
    }
  }

  const renderResultHorseModal = () => {
    if (isModalResultHorseOpen && raceDetail) {
      const title = messageError === 'completed' ? 'completed' : 'warning'
      const message =
        messageError === 'completed' ? (
          <p>{t(`${NOTIFICATION_MESSAGE}.enterRaceSuccess`)}</p>
        ) : messageError === 'not_enough' ? (
          <p
            dangerouslySetInnerHTML={{
              __html: t(`${NOTIFICATION_MESSAGE}.notHaveEnough`, { fee: raceDetail.entry_fee })
            }}
          />
        ) : (
          messageError
        )
      const handleOk = () => {
        toggleIsModalResultHorseOpen(false)
      }

      setTimeout(handleCloseModalResult, TIME_CLOSE_MODAL)
      return (
        <ResultHorseModal
          toggleIsModalOpen={toggleIsModalResultHorseOpen}
          title={title}
          onCloseButtonClick={handleCloseModalResult}
          onOk={handleOk}
          message={message}
        />
      )
    }
  }

  const handleConfirmChooseHorse = () => {
    toggleConfirmIsChooseHorseModalOpen(false)
    if (raceDetail?.entry_fee === 0) {
      onChooseHorse()
    } else toggleIsModalJoinRaceOpen()
  }

  useEffect(() => {
    if (isFinishedRace && isRaceStatusClosed && disableRaceTable) {
      toggleTriggerFetchRaceDetail()
    }
  }, [isFinishedRace, isRaceStatusClosed, disableRaceTable])

  const { CLOSED, WAITING, SCHEDULING, LIVE } = RaceStatus

  const handleSocketChange = (message: { body: string }) => {
    const { data } = JSON.parse(message.body)
    const { newStatus, raceId: raceIdSocket } = data[Object.keys(data)[0]]
    if (raceIdSocket == decode(raceId as string)) {
      if (newStatus === CLOSED) {
        toggleIsRaceStatusClosed(true)
        setDisableRaceTable(true)
        setViewRace2D(false)
      }
      if (newStatus === WAITING || newStatus === SCHEDULING || newStatus === LIVE) {
        toggleTriggerFetchRaceDetail()
      }
    }
  }

  const handleSocketChangeRaceGate = () => {
    setTriggerFetchRaceDetail(value => !value)
  }

  useEffect(() => {
    const subscriptionRaceGate = WS_MANAGER.subscribe(
      `/topic/race-gate/${decode(raceId as string)}`,
      handleSocketChangeRaceGate
    )
    const subscriptionRaceStatus = WS_MANAGER.subscribe('/topic/race-status', handleSocketChange)
    return () => {
      subscriptionRaceGate?.then(sub => sub?.unsubscribe())
      subscriptionRaceStatus?.then(sub => sub?.unsubscribe())
    }
  }, [])

  const timeElapsed = +(raceDetail?.end_at || 0) - +(raceDetail?.real_start_at || 0)
  const handleBtnBack = () => {
    setViewRace2D(false)
    setDisableRaceTable(true)
  }
  return (
    <DetailStyled>
      <div className='open-detail'>
        <div className='container'>
          <div className='name-container d-flex align-items-center'>
            {viewRace2D &&
              <div className='btn-back  me-5'>
                <div onClick={handleBtnBack} className='img-text-btn'>
                  <img src={CARET_LEFT} alt='' />
                  <span className='text-btn font-bold'>BACK</span>
                </div>
              </div>
            }
            <div className='name font-bold color-white text-uppercase'>{raceDetail?.name}</div>

            <ClassTag text={raceDetail?.racing_class.name ?? ''} isActive={true} customClass='ms-3' />
          </div>
          <div className='race-info-container d-flex flex-column flex-lg-row justify-content-between align-items-lg-center'>
            <div className='info-left'>
              <div className='left d-flex align-items-center'>
                <div className='info-left-item d-flex align-items-center'>
                  <span className='title'>Racecourse</span>
                  <span className='value color-white'>{capitalizeOnlyFirstLetter(raceDetail?.course.name)}</span>
                </div>
                <div className='info-left-item d-flex align-items-center'>
                  <span className='title'>Field type</span>
                  <span className='value color-white'>{capitalizeOnlyFirstLetter(raceDetail?.field_type.type)}</span>
                </div>
                <div className='info-left-item d-flex align-items-center'>
                  <span className='title'>Distance</span>
                  <span className='value color-white'>{raceDetail?.distance?.distance.toLocaleString() ?? '0'}m</span>
                </div>
                <TimeRaceResult />
                {status === CLOSED && viewRace2D && (
                  <div className='info-left-item d-flex align-items-center'>
                    <span className='title'>{t(`${NOTIFICATION_MESSAGE}.timeElapsed`)}</span>
                    <span className='value color-white'>
                      <TimeRace
                        toggleIsRaceEnd={toggleIsRaceEnd}
                        reset={isRaceEnd && isRaceInProcess}
                        isStopped={isRaceEnd ? isRaceEnd : !triggerReplay}
                        timeElapsed={timeElapsed}
                        isRaceInProcess={isRaceInProcess}
                        isRaceEnd={isRaceEnd}
                      />
                    </span>
                  </div>
                )}
                {status === LIVE && (
                  <div>
                    <span className='title'> {t(`${NOTIFICATION_MESSAGE}.timeElapsed`)}: </span>
                    <span className='color-primary time-race'>
                      {isLoading ? '00:00:0' : formatTimeV2(timeLive, true)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {handleStarInLiveResult()}
          </div>
        </div>
        <div className='line-grey'></div>
        <div className='container'>
          {handleDisplayViewTimeRace()}

          {status !== 'LIVE' && handleDisplayRaceTable()}
        </div>
      </div>
      {isModalChooseHorseOpen && raceDetail && (
        <ChooseHorseModal
          race={raceDetail}
          toggleIsModalOpen={toggleIsChooseHorseModalOpen}
          joiningGate={joiningGate}
          setTriggerFetchRaceDetail={setTriggerFetchRaceDetail}
          hadJoined={raceDetail.had_joined}
          onCloseButtonClick={handleCloseModal}
          onConfirmHorse={handleConfirmHorse}
        />
      )}
      {isModalJoinRaceOpen && raceDetail && (
        <ResultHorseModal
          toggleIsModalOpen={toggleIsModalJoinRaceOpen}
          onCloseButtonClick={handleCloseModalJoinRaceOpen}
          onOk={onChooseHorse}
          message={
            <p
              dangerouslySetInnerHTML={{
                __html: t(`${NOTIFICATION_MESSAGE}.needGetEHtc`, { fee: raceDetail.entry_fee })
              }}
            />
          }
          btnCancel={true}
        />
      )}
      {renderResultHorseModal()}
      {isModalConfirmChooseHorseOpen && raceDetail && (
        <ConfirmChooseHorseModal
          race={raceDetail}
          toggleIsModalOpen={toggleConfirmIsChooseHorseModalOpen}
          toggleIsChooseHorseModal={toggleIsChooseHorseModalOpen}
          joiningGate={joiningGate}
          setTriggerFetchRaceDetail={setTriggerFetchRaceDetail}
          hadJoined={raceDetail.had_joined}
          onCloseButtonClick={handleCloseModalConfirm}
          horseConfirmId={horseConfirmId}
          onConfirm={handleConfirmChooseHorse}
        />
      )}
      {isRequestLoginModalOpen && <RequestLoginModal toggleIsModalOpen={toggleIsRequestLoginModalOpen} />}
      {isOpenHorseModal && (
        <HorseModalRaceView
          horseId={horseId}
          onCloseButtonClick={handleCloseHorseModal}
          myName={auth.user_id}
          atProfile={true}
          raceId={raceId as string}
        />
      )}
      {isRacePassword && (
        <ConfirmOkModal
          onCloseButtonClick={toggleIsRacePassword}
          onConfirm={checkRacePassword}
          title='Race Password'
          message={
            <div>
              <Input.Password placeholder="Password" value={password} onChange={handleChangePassword} />
              {passwordMessage?.length > 0 && <div className='message-error'> {passwordMessage}</div>}

            </div>
          }
          btnOk='Join race'
          btnCancel='Cancel'
        // isLoading={btnLoading}
        />
      )}
    </DetailStyled>
  )
}

export default SchedulingLive
