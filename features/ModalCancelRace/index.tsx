/* eslint-disable @typescript-eslint/no-explicit-any */
import raceApi from 'apis/raceApi'
import userApi from 'apis/userApi'
import { links } from 'apps'
import { setCoinUser } from 'features/Balance/coinUser.slice'
import { ResultHorseModal } from 'features/Race/components'
import { useAppDispatch, useAppSelector } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { decode } from 'js-base64'
import { RaceStatus } from 'models'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { WS_MANAGER } from 'socket/socketClient'
import { handleAsyncRequest } from 'utils/helper'
import { setDataCancelRace } from './cancelRaceData.slice'

const ModalCancelRace = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [cancelRaceId, setCancelRaceId] = useState<number | string>('')
  const [message, setMessage] = useState<string>('')
  const { raceId } = useParams()
  const onCloseModalCancelRace = () => {
    const hasJoinRace = cancelRaceData?.records?.find((x: any) => x?.race_dto.id == cancelRaceId)
    setMessage('')
    if (hasJoinRace.race_dto?.id == decode(raceId || '')) {
      navigate(links.race.open());
      return
    }
  }

  const auth = useAppSelector(state => state.auth)
  const cancelRaceData = useAppSelector(state => state.cancelRaceData)
  const dispatch = useAppDispatch()
  const fetchDataCancelRace = async () => {
    const [, resultCancelRace] = await handleAsyncRequest(raceApi.getRaceCancel({ page: 1, limit: 20 }))
    if (!resultCancelRace) return
    dispatch(setDataCancelRace(resultCancelRace.data))
  }
  const fetchCoinUser = async () => {
    const [, resultCoinUser] = await handleAsyncRequest(userApi.getUserItems())
    if (!resultCoinUser) return

    dispatch(setCoinUser(resultCoinUser.data))
  }

  const handleSocketChange = (message: { body: string }) => {
    const { data } = JSON.parse(message.body)
    const { newStatus, raceId: raceIdSocket } = data[Object.keys(data)[0]]
    if (newStatus === RaceStatus.CANCEL) {
      setCancelRaceId(raceIdSocket)
    }
  }

  useEffect(() => {
    auth.isLogged && fetchDataCancelRace()
    const subscription = WS_MANAGER.subscribe('/topic/race-status', handleSocketChange)
    return () => {
      subscription.then(sub => sub?.unsubscribe())
    }
  }, [])

  useEffect(() => {
    const hasJoinRace = cancelRaceData?.records?.find((x: any) => x?.race_dto.id == cancelRaceId)

    let messageCancel = ''
    if (cancelRaceId == raceId && !hasJoinRace) {
      messageCancel = t(`${NOTIFICATION_MESSAGE}.cancelNotJoinRace`)
    }
    if (hasJoinRace) {
      messageCancel = t(`${NOTIFICATION_MESSAGE}.cancelJoinRace`, {
        name: hasJoinRace?.race_dto?.name
      })
      fetchCoinUser()
    }
    setMessage(messageCancel)
  }, [cancelRaceId, cancelRaceData])

  if (!message) return null

  return (
    <ResultHorseModal
      toggleIsModalOpen={onCloseModalCancelRace}
      onCloseButtonClick={onCloseModalCancelRace}
      onOk={onCloseModalCancelRace}
      message={<p dangerouslySetInnerHTML={{ __html: message }} />}
    />
  )
}

export default ModalCancelRace
