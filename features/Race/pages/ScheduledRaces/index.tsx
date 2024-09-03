import raceApi from 'apis/raceApi'
import { RaceTable, SwitchBtn } from 'features/Race/components'
import { useAppSelector, useDebounce, useToggle, useUpdateEffect } from 'hooks'
import { GetRaceListParams, GetRaceListPopupParams, RaceClassNumber, RaceStatus, RecordRace } from 'models'
import { ChangeEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { OneLineTitle, SearchInput } from 'shared'
import { handleAsyncRequest, shortenRaceCourseName } from 'utils/helper'
import ScheduledRacesStyled from './styled'
import { schedulingListColumns } from 'utils/columns'
import dayjs from 'dayjs'
import { useSearchParams } from 'react-router-dom'
import { WS_MANAGER } from 'socket/socketClient'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'

const { SCHEDULING, WAITING, CLOSED, LIVE } = RaceStatus

const defaultParams: GetRaceListParams = {
  limit: 20,
  page: 1,
  status: SCHEDULING,
  freeRace: false,
  myHorse: false,
  search: ''
}

function ScheduledRaces() {
  const [, setSearchParams] = useSearchParams()
  const [params, setParams] = useState<GetRaceListParams>({ ...defaultParams })
  const [searchValue, setSearchValue] = useState<string>('')
  const [isMyHorseOn, toggleIsMyHorseOn] = useToggle(false)
  const debounceSearchValue = useDebounce<string>(searchValue, 500)
  const [races, setRaces] = useState<RecordRace[]>([])
  const [loader, setLoader] = useState(true)
  const auth = useAppSelector(state => state.auth)
  const [totalRace, setTotalRace] = useState(0)
  const { t } = useTranslation()
  const useRefSwitch = useRef<HTMLButtonElement>(null)
  const memoizedSchedulingListColumns = useMemo(() => schedulingListColumns, [])

  useLayoutEffect(() => {
    const handleLoadingRaces = () => {
      if (races.length < 20 && races.length > 0) {
        setLoader(true)
      }
    }

    handleLoadingRaces()
  })

  const fetchListRaces = async () => {
    const refSwitch = useRefSwitch.current && useRefSwitch.current?.className
    const isRefSwitch = refSwitch?.includes('switch-btn--on')
    setLoader(false)
    const [, result] = await handleAsyncRequest(
      raceApi.getRaceList({ ...params, myHorse: isRefSwitch || false, search: searchValue })
    )
    const records = result?.data.records
    setTotalRace(result?.data.total || 0)
    if (records && records.length > 0) {
      const totalRaces = [...races, ...records]
      const raceLive = totalRaces.filter(x => x.count_down === 0 && x.status === LIVE)
      const raceScheduling = totalRaces.filter(x => x.count_down === 0 && x.status === SCHEDULING)
      const raceWaiting = totalRaces.filter(x => x.count_down !== 0)
      setRaces([...raceLive, ...raceWaiting, ...raceScheduling])
    }
    setLoader(true)
  }

  useEffect(() => {
    fetchListRaces()
  }, [params])

  useUpdateEffect(() => {
    setRaces([])
    setParams({ ...params, search: debounceSearchValue, page: 1 })
  }, [debounceSearchValue])

  useUpdateEffect(() => {
    setRaces([])
    setParams({ ...params, myHorse: isMyHorseOn, page: 1 })
    setSearchParams({ myHorse: isMyHorseOn ? '1' : '0' })
  }, [isMyHorseOn])

  const handleSearchValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const clonedRates = races.map(race => {
    race.course.name = shortenRaceCourseName(race.course.name)
    return race
  })

  const handleSocketChange = (message: { body: string }) => {
    const { data } = JSON.parse(message.body)
    const { newStatus } = data[Object.keys(data)[0]]
    if (newStatus === SCHEDULING || newStatus === LIVE || newStatus === WAITING || newStatus === CLOSED) {
      setRaces([])
      setParams({ ...params, search: searchValue })
    }
  }

  useEffect(() => {
    const subscription = WS_MANAGER.subscribe('/topic/race-status', handleSocketChange)
    return () => {
      subscription?.then(sub => sub?.unsubscribe())
    }
  }, [])

  const date = new Date()
  const paramsFilterResult: GetRaceListPopupParams = {
    limit: 20,
    page: 1,
    startAt: dayjs(date).format('YYYY-MM-DD[T]HH:mm:ss.SSS+07:00'),
    endAt: dayjs(date).format('YYYY-MM-DD[T]HH:mm:ss.SSS+07:00'),
    startInstance: '1000',
    endInstance: '1000',
    raceClass: RaceClassNumber.Class1
    // sort: ['id-desc']
  }

  return (
    <ScheduledRacesStyled>
      <div className='head-container'>
        <OneLineTitle text='scheduled races' customClass='title' />
      </div>
      <div className='search-container d-flex flex-column flex-sm-row align-items-sm-center'>
        <SearchInput searchValue={searchValue} handleSearchValueChanged={handleSearchValueChanged} />
        {auth.isLogged && (
          <SwitchBtn
            title={t(`${NOTIFICATION_MESSAGE}.myHorse`)}
            isOn={isMyHorseOn}
            handleSwitchBtnClicked={toggleIsMyHorseOn}
            refSwitch={useRefSwitch}
          />
        )}
      </div>
      <div className='content-container'>
        <RaceTable
          columns={memoizedSchedulingListColumns}
          data={clonedRates ?? []}
          isRowClickable
          raisePage={setParams}
          loader={loader}
          params={params}
          paramsFilterResult={paramsFilterResult}
          totalRace={totalRace}
        />
      </div>
    </ScheduledRacesStyled>
  )
}

export default ScheduledRaces
