import _ from 'lodash'
import axiosClient from 'apis/axiosClient'
import raceApi from 'apis/raceApi'
import { SPEED_UP, timeLineEndAt } from 'apps/constants'
import { HorseRankList, HorseTrackList } from 'features/Race/components'
import { useFetch, useUpdateEffect } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { decode, encode } from 'js-base64'
import { Gate, Race, RankHorse, StepHorse } from 'models'
import { handleAsyncRequest } from 'utils/helper'
import { SetStateAction } from 'react'
import { Dispatch, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import Countdown from 'shared/Countdown'
import Loading from 'shared/Loading'
import { WS_MANAGER } from 'socket/socketClient'
import SchedulingLiveStarInStyled from './styled'
import InforHorseWinnerModal from '../InforHorseWinnerModal'

const HORSE_NUMBER_IN_RACE = 12

interface SchedulingLiveStarInProps {
  isRaceEnd: boolean
  toggleIsRaceEnd: (value?: boolean) => void
  toggleIsRaceInProcess: (value?: boolean) => void
  toggleTriggerFetchRaceDetail?: (value?: boolean) => void
  toggleFinishedRace: Dispatch<SetStateAction<boolean>>
  onChangeTimeLive: (value: number) => void
  onDisableRaceTable: Dispatch<SetStateAction<boolean>>
  disableRaceTable: boolean
  raceDetail: Race
}

const TIME_EVERY_FRAME = 100

function SchedulingLiveSocket({
  isRaceEnd,
  toggleIsRaceEnd,
  toggleIsRaceInProcess,
  toggleFinishedRace,
  onChangeTimeLive,
  onDisableRaceTable,
  disableRaceTable,
  raceDetail
}: SchedulingLiveStarInProps) {
  const raceId = decode(useParams<string>().raceId as string)
  const [blockListHorseRun, setBlockListHorseRun] = useState<boolean>(true)
  const [dataHorseWinner, setDataHorseWinner] = useState<Gate[]>([])

  const { data: raceResult, loading: raceResultLoading } = useFetch({
    fetcher: raceApi.getRaceLive,
    params: encode(raceId)
  })
  const { t } = useTranslation()
  const firstFetchWs = useRef(false)
  const stepTime = useRef(0)
  const positions = useRef<number[]>([])
  const onReceivedData = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    frameData: { frame: number; horseSteps: any; positions: number[]; horseStepsUrl: string; currentTime: number },
    horses: StepHorse[]
  ) => {
    /* fetch from OSS */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const horseSteps: any = await axiosClient.get(frameData.horseStepsUrl)

    if (!firstFetchWs.current) {
      firstFetchWs.current = true
      for (let i = 0; i < HORSE_NUMBER_IN_RACE; i++) {
        horses[i].stepsByTime = []
      }
    }

    if (stepTime.current <= frameData.currentTime * 1_000) {
      stepTime.current = frameData.currentTime * 1_000
    }

    // todo update Horse -> stepsByTime
    for (let i = 0; i < HORSE_NUMBER_IN_RACE; i++) {
      const steps = horses[i].stepsByTime
      const resSteps = horseSteps[i]
      for (let j = 0; j < resSteps.length; j++) {
        steps[resSteps[j].t] = resSteps[j] // todo map to stepsByTime
        if (!horses[i].finishStepTime && resSteps[j].d >= (raceResult?.distance ?? 3200)) {
          // update finishStepTime
          horses[i].finishStepTime = resSteps[j].t
        }
      }
    }
    positions.current = frameData.positions
    for (let i = 0; i < positions.current.length; i++) {
      positions.current[i] === -1 && (positions.current[i] = 9999)
    }

    // todo need to store more
  }
  const [horses, setHorses] = useState<StepHorse[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refSubscriptionLiveRace = useRef<any>(null)

  const handleSocketLiveCurrent = (message: { body: string }) => {
    const frameData = JSON.parse(message.body)
    onReceivedData(frameData, horses)
  }
  const handleSocketLive = (message: { body: string }) => {
    const frameData = JSON.parse(message.body)
    onReceivedData(frameData, horses)
    if (frameData.lastFrame) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      refSubscriptionLiveRace.current?.then((sub: any) => sub?.unsubscribe())
      toggleIsRaceEnd(true)
      toggleFinishedRace(true)
      onDisableRaceTable(true)
      setBlockListHorseRun(false)
      // fetchRevealPositions()
    }
  }

  useEffect(() => {
    if ((horses?.length ?? 0) === 0) return
    WS_MANAGER.send('/app/live-race/current-data', {}, raceId)
    const subscriptionCurrentData = WS_MANAGER.subscribe(
      `/user/topic/live-race/current-data/${raceId}`,
      handleSocketLiveCurrent
    )
    const subscriptionLiveRace = WS_MANAGER.subscribe(`/topic/live-race/${raceId}`, handleSocketLive)
    refSubscriptionLiveRace.current = subscriptionLiveRace
    return () => {
      subscriptionLiveRace.then(sub => sub?.unsubscribe())
      subscriptionCurrentData.then(sub => sub?.unsubscribe())
    }
  }, [horses])

  useEffect(() => {
    if (raceDetail.end_at - timeLineEndAt <= raceDetail.current_time) {
      toggleIsRaceEnd(true)
      toggleFinishedRace(true)
      onDisableRaceTable(true)
      setBlockListHorseRun(false)
    }
  }, [])

  // todo here
  const defaultSortingRankHorseList = useMemo(() => {
    if ((horses?.length ?? 0) === 0 || !firstFetchWs.current) return []
    const sortingRankHorseList: RankHorse[] = []

    for (let i = 0; i < horses.length; i++) {
      const rankHorse: RankHorse = {
        horseIndex: i,
        step: horses[i].stepsByTime[stepTime.current],
        reachFinishLine: false
      }
      sortingRankHorseList.push(rankHorse)
    }

    return sortingRankHorseList
  }, [horses]) // todo initialize...


  const [sortingRankHorseList, setSortingRankHorseList] = useState<RankHorse[]>(defaultSortingRankHorseList)
  const schedulingLiveStarInRef = useRef<HTMLDivElement>(null)

  const fetchRevealPositions = async () => {
    const [, result] = await handleAsyncRequest(raceApi.getRevealPositions(raceDetail.id))

    if (!result) return
    setDataHorseWinner(raceDetail.gates.filter(item => item.gate === result?.data.winner.gate))
  }

  useEffect(() => {
    isRaceEnd && fetchRevealPositions()
  }, [isRaceEnd])


  useEffect(() => {
    if (!raceResult) return

    const { horses } = raceResult.race_data
    setHorses(horses)
  }, [raceResult]) // todo update steps horse [raceResult from socket]

  useUpdateEffect(() => {
    if (isRaceEnd) return

    setSortingRankHorseList(defaultSortingRankHorseList)
  }, [isRaceEnd])

  useUpdateEffect(() => {
    setSortingRankHorseList(defaultSortingRankHorseList)
  }, [defaultSortingRankHorseList])

  useEffect(() => {
    if ((horses?.length ?? 0) === 0) return

    const intervalId = setInterval(() => {
      if (stepTime.current % 500 === 0) {
        if (doAllHorsesReachFinishLine()) {
          toggleIsRaceEnd(true)
          toggleIsRaceInProcess(false)
          toggleFinishedRace(true)
          setBlockListHorseRun(false)
          stepTime.current = 0
          firstFetchWs.current = false
          clearInterval(intervalId)
          return
        }

        const currentSortingRankHorseList = getSortingRankHorseList()

        setSortingRankHorseList(currentSortingRankHorseList)
      }
      if (
        (raceResultLoading && !raceResult) ||
        (!raceResultLoading && !raceResult) ||
        !(raceResult && (horses?.length ?? 0) > 0 && firstFetchWs.current && sortingRankHorseList.length > 0)
      ) {
        onChangeTimeLive(0)
        return
      }

      onChangeTimeLive(stepTime.current)
      stepTime.current += TIME_EVERY_FRAME
    }, TIME_EVERY_FRAME)

    return () => {
      clearInterval(intervalId)
    }
  }, [horses, sortingRankHorseList])

  const getCurrentStep = (horse: StepHorse) => {
    if (horse.stepsByTime[stepTime.current]) return horse.stepsByTime[stepTime.current]
    // todo return last position
    // ...
    if (horse.finishStepTime) {
      return horse.stepsByTime[horse.finishStepTime]
    }

    return {
      // in case: missing frame having this-finish-horse
      phase: '',
      t: stepTime.current,
      v: 0,
      mv: 0,
      d: raceResult?.distance ?? 1000,
      a: 0.0,
      s: 0,
      sps: 0,
      ask: [],
      dask: []
    }
  }

  const getFinishTime = (horse: RankHorse, distance: number) => {
    if (horse.preLastStep === null) {
      // in-case ws received horse-steps having length = 1 (only lastStep)
      return (horse.lastStep?.t ?? 0) - (((horse.lastStep?.d ?? distance) - distance) * 3.6) / (horse.lastStep?.v ?? 1)
    }

    const d0 = horse.preLastStep?.d ?? 0
    const d1 = horse.lastStep?.d ?? 0
    const p = (distance - d0) / (d1 - distance)
    const v0 = (horse.preLastStep?.v ?? 0) / 3.6
    const v1 = (horse.lastStep?.v ?? 0) / 3.6
    const v = (p * v1 + v0) / (1 + p)
    const dt = (distance - d0) / v
    return Math.round((horse.preLastStep?.t ?? 0) + dt * 1_000)
  }

  const getSortingRankHorseList = useCallback(() => {
    if (!firstFetchWs.current) return []

    const notReachFinishLineHorseList: RankHorse[] = []

    for (let i = 0; i < horses.length; i++) {
      const currentStep = getCurrentStep(horses[i])

      const rankHorse: RankHorse = {
        horseIndex: i,
        step: currentStep,
        reachFinishLine: false,
        lastStep: horses[i].finishStepTime
          ? horses[i].stepsByTime[horses[i].finishStepTime ?? 0] ?? currentStep
          : currentStep,
        preLastStep: horses[i].finishStepTime
          ? horses[i].stepsByTime[(horses[i].finishStepTime ?? 100) - 100] ?? currentStep
          : currentStep
      }

      notReachFinishLineHorseList.push(rankHorse)
    }

    notReachFinishLineHorseList.sort((firstHorse, secondHorse) => {
      if (positions.current[firstHorse.horseIndex] != positions.current[secondHorse.horseIndex]) {
        console.log(positions.current[firstHorse.horseIndex], positions.current[secondHorse.horseIndex], 'compare sort')
        return positions.current[firstHorse.horseIndex] - positions.current[secondHorse.horseIndex]
      }

      if (firstHorse.step.t === secondHorse.step.t) {
        const distance = raceResult?.distance ?? 0

        if (firstHorse.step.d >= distance && secondHorse.step.d >= distance) {
          return getFinishTime(firstHorse, distance) - getFinishTime(secondHorse, distance)
        }
        return secondHorse.step.d - firstHorse.step.d
      }
      return firstHorse.step.t - secondHorse.step.t
    })

    const newSortingRankHorseList: RankHorse[] = notReachFinishLineHorseList

    if (raceResult) {
      for (let i = 0; i < 12; i++) {
        const horse = newSortingRankHorseList[i]
        const doesHorseReachFinishLine = horse.step.d >= raceResult.distance
        horse.reachFinishLine = doesHorseReachFinishLine
      }
    }

    return newSortingRankHorseList
  }, [horses])

  const doAllHorsesReachFinishLine = (): boolean | undefined => {
    if (!raceResult || sortingRankHorseList.length === 0) return

    return sortingRankHorseList.every(horse => horse.reachFinishLine)
  }

  if (raceResultLoading && !raceResult) {
    return <div className='color-white mt-4'>{t(`${NOTIFICATION_MESSAGE}.loading`)}...</div>
  }

  if (!raceResultLoading && !raceResult) {
    return (
      <div
        className='color-white mt-4'
        dangerouslySetInnerHTML={{ __html: t(`${NOTIFICATION_MESSAGE}.errorTryAgain`) }}
      />
    )
  }


  if (!(raceResult && (horses?.length ?? 0) > 0 && firstFetchWs.current && sortingRankHorseList.length > 0)) {
    const date = new Date()
    const timestamp = date.getTime()
    const timer = Math.floor(((raceResult?.real_start_at || 0) - timestamp) / 1000)

    if (timer <= 10 && timer >= -2) {
      return (
        <div className='color-white mt-4'>
          <Loading />
          <Countdown startTime={timer} />
        </div>
      )
    } else {
      if (disableRaceTable && !_.isEmpty(dataHorseWinner)) {
        return <>
          {/* <Loading content={t(`${NOTIFICATION_MESSAGE}.blockListHorseRun`)} /> */}
          <InforHorseWinnerModal infoWinner={dataHorseWinner[0]} raceDetail={raceDetail} />
        </>
      } else {
        if (blockListHorseRun == false && !_.isEmpty(dataHorseWinner)) {
          return <InforHorseWinnerModal infoWinner={dataHorseWinner[0]} raceDetail={raceDetail} />
        }
        return <Loading content={t(`${NOTIFICATION_MESSAGE}.screenLoading`)} />
      }
    }
  }

  return (
    <SchedulingLiveStarInStyled className='d-flex align-items-end flex-row-reverse' ref={schedulingLiveStarInRef}>
      {blockListHorseRun ? (
        <>
          <div className='horse-rank-list-container'>
            <HorseRankList horses={horses} sortingRankHorseList={sortingRankHorseList} />
          </div>
          <div className='horse-track-list-container flex-grow-1'>
            {raceResult && (horses?.length ?? 0) > 0 && firstFetchWs.current && sortingRankHorseList.length > 0 && (
              <HorseTrackList
                horses={horses}
                distance={raceResult.distance * SPEED_UP}
                sortingRankHorseList={sortingRankHorseList}
                isRaceEnd={isRaceEnd}
              />
            )}
          </div>
        </>
      ) : (
        <Loading content={t(`${NOTIFICATION_MESSAGE}.blockListHorseRun`)} />
      )}
    </SchedulingLiveStarInStyled>
  )
}

export default SchedulingLiveSocket
