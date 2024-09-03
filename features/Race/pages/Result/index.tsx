import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import raceApi from 'apis/raceApi'
import userApi from 'apis/userApi'
import { FILTER_ICON } from 'assets/images'
import dayjs from 'dayjs'
import { setCoinUser } from 'features/Balance/coinUser.slice'
import { RaceTable, SwitchBtn } from 'features/Race/components'
import FilterResultRaceModal from 'features/Race/components/FilterResultRaceModal'
import { useAppDispatch, useAppSelector, usePreventBodyScroll, useToggle, useUpdateEffect } from 'hooks'
import { GetRaceListParams, GetRaceListPopupParams, RaceStatus, RecordRace } from 'models'
import { OneLineTitle } from 'shared'
import { resultListColumns } from 'utils/columns'
import { handleAsyncRequest, shortenRaceCourseName } from 'utils/helper'
import ResultStyled from './styled'
import { WS_MANAGER } from 'socket/socketClient'
import { useTranslation } from 'react-i18next'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useSearchParams } from 'react-router-dom'

const defaultParams: GetRaceListParams = {
  limit: 20,
  page: 1,
  status: RaceStatus.RESULT,
  freeRace: false,
  myHorse: false,
  sort: ['close_at-desc']
}

const date = new Date()
const defaultParamsFilterResult: GetRaceListPopupParams = {
  limit: 20,
  page: 1,
  startAt: dayjs(date).format('YYYY-MM-DD[T]HH:mm:ss.SSS+07:00'),
  endAt: dayjs(date).format('YYYY-MM-DD[T]HH:mm:ss.SSS+07:00'),
  startInstance: '1000',
  endInstance: '3200',
  sort: ['close_at-desc']
}

let isRefresh = false

function Result() {
  const [params, setParams] = useState<GetRaceListParams>(defaultParams)
  const [paramsFilterResult, setParamsFilterResult] = useState<GetRaceListPopupParams>(defaultParamsFilterResult)
  const [isMyHorseOn, toggleIsMyHorseOn] = useToggle(false)
  const [races, setRaces] = useState<RecordRace[]>([])
  const [loader, setLoader] = useState(true)
  const auth = useAppSelector(state => state.auth)
  const [openModalFilter, setOpenModalFilter] = useState(false)
  usePreventBodyScroll(openModalFilter)
  const [checkLoadingPage, setCheckLoadingPage] = useState<boolean>(false)
  const [totalRace, setTotalRace] = useState(0)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const memoizedResultListColumns = useMemo(() => resultListColumns, [])
  const [searchParams] = useSearchParams()
  const paramsSearch = Object.fromEntries(searchParams.entries())

  useLayoutEffect(() => {
    const handleLoadingRaces = () => {
      if (races.length < 20 && races.length > 0) {
        setLoader(true)
      }
    }

    handleLoadingRaces()
  }, [])

  const fetchListRaces = async () => {
    setLoader(false)
    const [, result] = await handleAsyncRequest(raceApi.getRaceList({ ...params, myHorse: isMyHorseOn }))
    const records = result?.data.records
    setTotalRace(result?.data?.total || 0)

    if (records && records.length > 0) {
      isRefresh ? setRaces([...records]) : setRaces([...races, ...records])
    }
    setLoader(true)
    isRefresh = false
  }

  const fetchListRacesFilter = async () => {
    setLoader(false)
    const [, result] = await handleAsyncRequest(
      raceApi.getRaceResultPopup({ ...paramsSearch, myHorse: isMyHorseOn, page: paramsFilterResult.page })
    )
    setTotalRace(result?.data?.total || 0)
    const records = result?.data.records
    if (records && records.length > 0) {
      isRefresh ? setRaces([...records]) : setRaces([...races, ...records])
    }
    if (records && result.data.total === 0) {
      setRaces([])
    }
    setLoader(true)
    isRefresh = false
  }

  useEffect(() => {
    if (Object.keys(paramsSearch).length === 0) {
      fetchListRaces()
    } else {
      fetchListRacesFilter()
    }
  }, [params, paramsFilterResult])

  useUpdateEffect(() => {
    setRaces([])
    setParams({ ...params, myHorse: isMyHorseOn, page: 1 })
    setParamsFilterResult({ ...paramsFilterResult, myHorse: isMyHorseOn, page: 1 })
  }, [isMyHorseOn])

  const clonedRates = races.map(race => {
    race.course.name = shortenRaceCourseName(race.course.name)
    return race
  })

  const handleOpenModalFilter = () => {
    setOpenModalFilter(true)
  }

  const handleCloseModal = () => {
    setOpenModalFilter(false)
    setCheckLoadingPage(true)
  }

  const handleCheckLoading = useCallback(() => {
    if (checkLoadingPage === true) return setParamsFilterResult
    return setParams
  }, [checkLoadingPage])

  const fetchCoinUser = async () => {
    const [, resultCoinUser] = await handleAsyncRequest(userApi.getUserItems())
    if (!resultCoinUser) return

    dispatch(setCoinUser(resultCoinUser.data))
  }

  const handleSocketChange = (message: { body: string }) => {
    const { data } = JSON.parse(message.body)
    const { newStatus } = data[Object.keys(data)[0]]
    if (newStatus === 'CLOSED') {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      fetchCoinUser()
      setRaces([])
      setParams({ ...params, page: 1 })
      setParamsFilterResult({ ...paramsFilterResult, myHorse: isMyHorseOn, page: 1 })
      isRefresh = true
    }
  }

  useEffect(() => {
    const subscription = WS_MANAGER.subscribe('/topic/race-status', handleSocketChange)
    return () => {
      subscription?.then(sub => sub?.unsubscribe())
    }
  }, [])

  return (
    <ResultStyled>
      <div className='head-container'>
        <OneLineTitle text='results' customClass='title' />
        <FilterResultRaceModal
          isOpen={openModalFilter}
          setRacesPopup={setRaces}
          handleCLoseModal={handleCloseModal}
          setParamsFilter={setParamsFilterResult}
          paramsFilter={paramsFilterResult}
        />
      </div>
      <div className='search-container d-flex align-items-cente'>
        <div className='filter-container d-flex align-items-center justify-content-center'>
          <div className='filter d-flex align-items-center justify-content-center'>
            <button onClick={handleOpenModalFilter} className='button-filter' disabled={!loader}>
              <img src={FILTER_ICON} alt='' className='filter-icon' />
              <span className='filter-text color-grey'>{t(`${NOTIFICATION_MESSAGE}.filter`)}</span>
            </button>
          </div>
        </div>
        {auth.isLogged ? (
          <SwitchBtn
            title={t(`${NOTIFICATION_MESSAGE}.myHorse`)}
            isOn={isMyHorseOn}
            handleSwitchBtnClicked={toggleIsMyHorseOn}
            disabled={!loader}
          />
        ) : null}
      </div>
      <div className='content-container pt-0'>
        <RaceTable
          columns={memoizedResultListColumns}
          data={clonedRates ?? []}
          isRowClickable
          raisePage={handleCheckLoading()}
          loader={loader}
          params={params}
          paramsFilterResult={paramsFilterResult}
          checkLoadingPage={checkLoadingPage}
          totalRace={totalRace}
        />
      </div>
    </ResultStyled>
  )
}

export default Result
