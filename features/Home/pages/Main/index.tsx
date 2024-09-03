/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'
import horseApi from 'apis/horseApi'
import raceApi from 'apis/raceApi'
import { configs, links } from 'apps'
import { ARROW_RIGHT, JOIN_NOW_HORSE, JOIN_NOW_HORSE_SHADOW, MINI_LOGO } from 'assets/images'

import { NextRaceBox, OpenRaceBox, TopHorseBox, TopStableBox } from 'features/Home/components'
import { useAppDispatch, useAppSelector, useFetch, useToggle } from 'hooks'
import axiosClient from 'apis/axiosClient'
import {
  AuthState,
  GetRaceListParams,
  GetRaceListResponse,
  GetTopParams,
  notificationTemplate,
  RaceStatus,
  RecordRace,
  TopHorse,
  TopStable
} from 'models'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { OneLineTitle, TwoLineTitle } from 'shared'
import { handleAsyncRequest, isObjectEmptyArray } from 'utils/helper'
import StyledHome from './styled'
import userApi from 'apis/userApi'
import { setCoinUser } from 'features/Balance/coinUser.slice'
import { WS_MANAGER } from 'socket/socketClient'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'

import { ReactComponent as BANNER_META } from 'assets/images/icons/banner-meta.svg'
import { ReactComponent as BANNER_HORSE } from 'assets/images/icons/banner-horse.svg'
import { setAuthState } from 'features/Auth/auth.slice'
import { ResultHorseModal } from 'features/Race/components'

const getOpenRaceListParams: GetRaceListParams = {
  limit: 4,
  page: 1,
  status: RaceStatus.OPEN,
  freeRace: false,
  myHorse: false,
  sort: ['open_at-desc']
}

const getNextRaceListParams: GetRaceListParams = {
  limit: 5,
  page: 1,
  status: RaceStatus.SCHEDULING,
  freeRace: false,
  myHorse: false
}

function moveIndex<T>(array: T[] | undefined, fromIndex: number, toIndex: number): T[] {
  if (!array || isObjectEmptyArray(array)) {
    return []
  }

  if (array.length <= 2) {
    return array
  }

  const element = array[fromIndex]
  array.splice(fromIndex, 1)
  array.splice(toIndex, 0, element)

  return array
}

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1

const defaultGetTopParams: GetTopParams = {
  yearMonth: `${year}-0${month}`
}

const linkTwitch = configs.linkTwitch

function HomeMain() {
  const { WAITING, LIVE, SCHEDULING, OPEN, CLOSED, CANCEL } = RaceStatus
  const [fetchListRace, toggleFetchListRace] = useToggle(false)
  const [fetchListOpenRace, toggleFetchListOpenRace] = useToggle(false)
  const [bannerMeta, setBannerMeta] = useState(false)
  const [bannerHorse, setBannerHorse] = useState(false)

  const [nextRaceListResponseSort, setNextRaceListResponseSort] = useState<RecordRace[]>([])
  const { t } = useTranslation()
  const { data: openRaceListResponse } = useFetch<GetRaceListResponse, GetRaceListParams>(
    {
      fetcher: raceApi.getRaceList,
      params: getOpenRaceListParams
    },
    [fetchListOpenRace]
  )
  const { data: nextRaceListResponse } = useFetch<GetRaceListResponse, GetRaceListParams>(
    {
      fetcher: raceApi.getRaceList,
      params: getNextRaceListParams
    },
    [fetchListRace]
  )

  const { data: topHorseList } = useFetch<TopHorse[], GetTopParams>({
    fetcher: horseApi.getTopHorses,
    params: defaultGetTopParams
  })
  const { data: topStableList } = useFetch<TopStable[], GetTopParams>({
    fetcher: horseApi.getTopStables,
    params: defaultGetTopParams
  })

  const memoizedTopHorseList = useMemo<TopHorse[]>(() => moveIndex(topHorseList, 1, 0), [topHorseList])
  const memoizedTopStableList = useMemo<TopStable[]>(() => moveIndex(topStableList, 1, 0), [topStableList])

  const auth = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()

  const [isModalNotification, setIsModalNotification] = useState(false)
  const [message, setMessage] = useState<notificationTemplate>()

  const getNotificationMessage = async () => {
    const [, result] = await handleAsyncRequest(userApi.getNotificationMessage())
    if (_.isEmpty(result?.data)) return
    setIsModalNotification(true)
    setMessage(!_.isEmpty(result?.data) && result?.data[0].template)
  }

  useEffect(() => {
    if (auth.isFirstLogin) {
      const authState: AuthState = {
        ...auth, isFirstLogin: false
      }
      getNotificationMessage()
      dispatch(setAuthState(authState))
    }
  }, [auth])

  const handleCloseModalJoinRaceOpen = () => {
    return setIsModalNotification(false)
  }




  const fetchCoinUser = async () => {
    const [, resultCoinUser] = await handleAsyncRequest(userApi.getUserItems())
    if (!resultCoinUser) return

    dispatch(setCoinUser(resultCoinUser.data))
  }

  useEffect(() => {
    if (auth.isLogged === false || process.env.MODE === 'DEV') return
    const url = '/user/sync-horse'
    axiosClient.get(url)
    fetchCoinUser()
  }, [auth])

  const handleSocketChange = (message: { body: string }) => {
    const { data } = JSON.parse(message.body)
    const { newStatus } = data[Object.keys(data)[0]]
    if (newStatus === WAITING || newStatus === LIVE || newStatus === SCHEDULING || newStatus === CLOSED) {
      toggleFetchListRace()
    }
    if (newStatus === SCHEDULING || newStatus === OPEN || newStatus === CANCEL) {
      toggleFetchListOpenRace()
    }
  }

  useEffect(() => {
    const subscription = WS_MANAGER.subscribe('/topic/race-status', handleSocketChange)
    return () => {
      subscription.then(sub => sub?.unsubscribe())
    }
  }, [])

  useEffect(() => {
    if (nextRaceListResponse && nextRaceListResponse?.records?.length > 0) {
      const nextRaceRecords = nextRaceListResponse.records
      const raceLive = nextRaceRecords.filter((x: RecordRace) => x.status === LIVE)
      const raceScheduling = nextRaceRecords.filter((x: RecordRace) => x.status === SCHEDULING)
      const raceWaiting = nextRaceRecords.filter((x: RecordRace) => x.status === WAITING)
      setNextRaceListResponseSort([...raceLive, ...raceWaiting, ...raceScheduling])
    } else {
      setNextRaceListResponseSort([])
    }
  }, [nextRaceListResponse])

  const options = {
    scale: 1.2,
    speed: 1000,
    max: 30
  }

  useEffect(() => {
    let timer = 0
    const intervalId = setInterval(() => {
      timer = timer + 1
      if (timer >= 1) {
        setBannerMeta(true)
        setBannerHorse(false)
      }
      if (timer >= 2) {
        setBannerHorse(true)
        setBannerMeta(false)
      }
      if (timer >= 3) {
        setBannerMeta(true)
        setBannerHorse(true)
      }
      if (timer >= 4) {
        setBannerMeta(false)
        setBannerHorse(false)
        timer = 0
      }
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <StyledHome>
      <div className='container'>
        <div className='top-section d-flex flex-column flex-lg-row align-items-center align-items-lg-end'>
          <div className='top-left flex-grow-1'>
            <div className='banner position-relative'>
              <div className='banner-meta d-flex justify-content-center align-items-center'>
                <div className='stream-title font-bold color color-neutral_gray'>
                  <span className='position-relative'>{t(`${NOTIFICATION_MESSAGE}.streamingNow`)}</span>
                </div>
                <div className={`icon-meta ${bannerMeta && 'active'}`}>
                  <BANNER_META />
                </div>
                <div className={`icon-horse ${bannerHorse && 'active'}`}>
                  <BANNER_HORSE />
                </div>
              </div>
            </div>
            <div className='video-container'>
              <div className='video'>
                <iframe
                  className='youtube-video'
                  src={linkTwitch}
                  title='YouTube video player'
                  frameBorder={0}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <div className='top-right'>
            <div className='head d-flex justify-content-between align-items-center'>
              <OneLineTitle text='next race' customClass='title' />
              <Link to={links.race.scheduledRaces()} className='view-btn'>
                <span className='color-white'>{t(`${NOTIFICATION_MESSAGE}.viewAll`)}</span>
                <img src={ARROW_RIGHT} alt='' />
              </Link>
            </div>
            <div className='content'>
              {nextRaceListResponseSort?.map(race => (
                <NextRaceBox key={race.id} race={race} customClass='race-item' isInHomePage={true} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='bg-fluid'>
        <div className='container'>
          <div className='open-race-section'>
            <div className='head d-flex justify-content-between align-items-center align-items-lg-end'>
              <OneLineTitle text='open race' customClass='title' />
              <Link to={links.race.open()} className='view-btn'>
                <span className='color-white'>{t(`${NOTIFICATION_MESSAGE}.viewAll`)}</span>
                <img src={ARROW_RIGHT} alt='' />
              </Link>
            </div>
            <div className='content row'>
              {openRaceListResponse?.records.map(race => (
                <OpenRaceBox
                  key={race.id}
                  race={race}
                  customClass='open-race-item col-12 col-sm-6 col-lg-3'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {!auth.isLogged && (window as any).chrome && (
        <div className='join-now-fluid-bg'>
          <div className='container'>
            <div className='join-now position-relative d-flex justify-content-center justify-content-lg-start'>
              <div className='content d-flex flex-column align-items-center'>
                <div className='title font-bold color-white'>{t(`${NOTIFICATION_MESSAGE}.joinNow`)}</div>
                <Link to={links.auth.index()}>
                  <button className='join-now-btn font-bold color-neutral_gray position-relative'>
                    <span>{t(`${NOTIFICATION_MESSAGE}.start`)}</span>
                    <img src={MINI_LOGO} alt='' className='position-absolute' />
                  </button>
                </Link>
              </div>
              <div className='horse-place d-none d-lg-block'>
                <img src={JOIN_NOW_HORSE_SHADOW} alt='' className='shadow position-absolute d-none d-lg-inline-block' />
                <img src={JOIN_NOW_HORSE} alt='' className='horse position-absolute d-none d-lg-inline-block' />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='top-horse-section'>
        <div className='container'>
          <div className='top-horse'>
            <div className='d-flex justify-content-center'>
              <TwoLineTitle text='top horses' customClass='top-horse-title' />
            </div>
            <div className='content row'>
              {memoizedTopHorseList.map((horse, index) => (
                <TopHorseBox
                  key={horse.id}
                  horse={horse}
                  customClass='col-12 col-sm-4'
                  selfIndex={index}
                  options={options}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='top-stable-section'>
        <div className='container'>
          <div className='top-stable'>
            <div className='d-flex justify-content-center'>
              <TwoLineTitle text='top users' customClass='top-stable-title' />
            </div>
            <div className='content row'>
              {memoizedTopStableList.map((stable, index) => (
                <TopStableBox
                  key={stable.owner_id}
                  stable={stable}
                  customClass='col-12 col-sm-4'
                  selfIndex={index}
                  options={options}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isModalNotification && (
        <ResultHorseModal
          // toggleIsModalOpen={setIsModalNotification}
          onCloseButtonClick={handleCloseModalJoinRaceOpen}
          message={
            <>
              <div className='font-bold font-size-20 color-orange text-uppercase'>
                {message?.title}
              </div>
              <div className='font-size-18'>
                {message?.body}
              </div>
            </>
          }
        />
      )}
    </StyledHome>
  )
}

export default HomeMain
