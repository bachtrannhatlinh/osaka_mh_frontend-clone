import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import raceApi from 'apis/raceApi'
import { HorseRankList, HorseTrackList } from 'features/Race/components'
import { useFetch, useUpdateEffect } from 'hooks'
import { Race, RaceStatus, RankHorse, StepHorse } from 'models'
import SchedulingLiveStarInStyled from './styled'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'
import { SPEED_UP } from 'apps/constants'

interface SchedulingLiveStarInProps {
  detailResult?: Race
  triggerReplay: boolean
  isRaceEnd: boolean
  toggleIsRaceEnd: (value?: boolean) => void
  toggleIsRaceInProcess: (value?: boolean) => void
  triggerFetchRaceDetail?: boolean
  status?: string
}

const TIME_EVERY_FRAME = 500
const STEP_EXTENT = 5

function SchedulingLiveStarIn({
  detailResult,
  triggerReplay,
  isRaceEnd,
  toggleIsRaceInProcess,
  triggerFetchRaceDetail,
  status
}: SchedulingLiveStarInProps) {
  const { WAITING } = RaceStatus
  const { raceId } = useParams<string>()
  const { data: raceResult, loading: raceResultLoading } = useFetch({
    fetcher: status === WAITING ? raceApi.getRaceLive : raceApi.getRaceResult,
    params: raceId
  })
  const [horses, setHorses] = useState<StepHorse[]>([])
  const { t } = useTranslation()
  const defaultSortingRankHorseList = useMemo(() => {
    const sortingRankHorseList: RankHorse[] = []

    for (let i = 0; i < horses?.length; i++) {
      const rankHorse: RankHorse = { horseIndex: i, step: horses[i].steps?.[0], reachFinishLine: false }

      sortingRankHorseList.push(rankHorse)
    }

    return sortingRankHorseList
  }, [horses])
  const [sortingRankHorseList, setSortingRankHorseList] = useState<RankHorse[]>(defaultSortingRankHorseList)
  const stepIndex = useRef(0)
  const schedulingLiveStarInRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!raceResult) return
    const fetchRaceData = async () => {
      const response = await raceApi.getRaceData(raceResult.data_url)
      setHorses(response.horses)
    }
    const fetchHorses = async () => {
      const response = await raceApi.getRaceLive(raceId?.toString() || '')
      response.data.race_data.horses && setHorses(response.data.race_data.horses)
    }
    if (raceResult.data_url) {
      fetchRaceData()
    } else {
      fetchHorses()
    }
  }, [raceResult, triggerFetchRaceDetail])

  useUpdateEffect(() => {
    if (isRaceEnd) return

    setSortingRankHorseList(defaultSortingRankHorseList)
  }, [isRaceEnd])

  useUpdateEffect(() => {
    setSortingRankHorseList(defaultSortingRankHorseList)
  }, [defaultSortingRankHorseList])

  useEffect(() => {
    if (!triggerReplay) return

    const intervalId = setInterval(() => {
      if (doAllHorsesReachFinishLine()) {
        // toggleIsRaceEnd(true)
        toggleIsRaceInProcess(false)
        stepIndex.current = 0
        clearInterval(intervalId)

        return
      }

      const currentSortingRankHorseList = getSortingRankHorseList()

      setSortingRankHorseList(currentSortingRankHorseList)
      stepIndex.current += STEP_EXTENT
    }, TIME_EVERY_FRAME)

    return () => {
      clearInterval(intervalId)
    }
  }, [triggerReplay, horses, sortingRankHorseList])

  const updateReachFinishLineHorseList = useCallback((): RankHorse[] => {
    return sortingRankHorseList.map(horse => {
      if (!detailResult) {
        return horse
      }

      const doesHorseReachFinishLine = horse.step.d >= detailResult?.distance.distance
      const newHorse: RankHorse = { ...horse, reachFinishLine: doesHorseReachFinishLine }

      return newHorse
    })
  }, [sortingRankHorseList])

  const getCurrentStep = (horse: StepHorse) => horse.steps[stepIndex.current] ?? horse.steps[horse.steps.length - 1]

  const getFinishTime = (horse: RankHorse, distance: number) => {
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
    updateReachFinishLineHorseList()

    const notReachFinishLineHorseList: RankHorse[] = []

    for (let i = 0; i < horses?.length; i++) {
      const currentStep = getCurrentStep(horses[i])
      const rankHorse: RankHorse = {
        horseIndex: i,
        step: currentStep,
        reachFinishLine: false,
        lastStep: horses[i].steps[horses[i].steps.length - 1],
        preLastStep: horses[i].steps[horses[i].steps.length - 2]
      }

      notReachFinishLineHorseList.push(rankHorse)
      raceResult?.distance && rankHorse.step.d >= (raceResult?.distance ?? 0) && (rankHorse.reachFinishLine = true)
    }

    notReachFinishLineHorseList.sort((firstHorse, secondHorse) => {
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

    return newSortingRankHorseList
  }, [horses, updateReachFinishLineHorseList])

  const doAllHorsesReachFinishLine = (): boolean | undefined => {
    if (!detailResult || sortingRankHorseList.length === 0) return

    return sortingRankHorseList.every(horse => horse.reachFinishLine)
  }

  if ((raceResultLoading && !raceResult) || horses?.length === 0) {
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

  if (!horses) return null

  return (
    <SchedulingLiveStarInStyled className='d-flex align-items-end flex-row-reverse' ref={schedulingLiveStarInRef}>
      <div className='horse-rank-list-container'>
        <HorseRankList horses={horses} sortingRankHorseList={sortingRankHorseList} />
      </div>
      <div className='horse-track-list-container flex-grow-1'>
        {detailResult && (
          <HorseTrackList
            horses={horses}
            distance={detailResult.distance.distance * SPEED_UP}
            sortingRankHorseList={sortingRankHorseList}
            isRaceEnd={isRaceEnd}
            raceResult={detailResult?.gates}
          />
        )}
      </div>
    </SchedulingLiveStarInStyled>
  )
}

export default SchedulingLiveStarIn
