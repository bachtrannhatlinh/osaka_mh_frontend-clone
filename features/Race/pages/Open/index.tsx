import raceApi from 'apis/raceApi'
import { constants } from 'apps'
import dayjs from 'dayjs'
import { RaceTable, SwitchBtn } from 'features/Race/components'
import { useAppSelector, useDebounce, useToggle, useUpdateEffect } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import {
  GetRaceListParams,
  GetRaceListPopupParams,
  RaceClassNumber,
  RaceFieldType,
  RaceStatus,
  RecordRace
} from 'models'
import { ChangeEvent, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { OneLineTitle, SearchInput } from 'shared'
import Select from 'shared/Select'
import { WS_MANAGER } from 'socket/socketClient'
import { openListColumns } from 'utils/columns'
import { handleAsyncRequest, shortenRaceCourseName } from 'utils/helper'
import OpenStyled from './styled'

export type RaceClassFilter = {
  name: RaceClassNumber | 'All'
  isActive: boolean
}
export type RaceTypeFilter = {
  name: RaceFieldType | 'All'
  isActive: boolean
}

export type ClassFilters = RaceClassFilter[]
export type TypeFilters = RaceTypeFilter[]

const defaultParams: GetRaceListParams = {
  limit: 20,
  page: 1,
  status: RaceStatus.OPEN,
  freeRace: false,
  myHorse: false,
  search: '',
  sort: ['open_at-desc']
}

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

let isRefresh = false
function Open() {
  const defaultTypeFilters: TypeFilters = [
    {
      name: 'All',
      isActive: true
    },
    {
      name: RaceFieldType.Turf,
      isActive: false
    },
    {
      name: RaceFieldType.Dirt,
      isActive: false
    }
  ]
  const defaultClassFilters: ClassFilters = [
    {
      name: 'All',
      isActive: true
    },
    {
      name: RaceClassNumber.Class1,
      isActive: false
    },
    {
      name: RaceClassNumber.Class2,
      isActive: false
    },
    {
      name: RaceClassNumber.Class3,
      isActive: false
    },
    {
      name: RaceClassNumber.Class4,
      isActive: false
    },
    {
      name: RaceClassNumber.Class5,
      isActive: false
    },
    {
      name: RaceClassNumber.Class6,
      isActive: false
    },
    {
      name: RaceClassNumber.Class7,
      isActive: false
    },
    {
      name: RaceClassNumber.ClassFreeStyle,
      isActive: false
    }
  ]

  const [isFreeOn, toggleIsFreeOn] = useToggle(false)
  const [params, setParams] = useState<GetRaceListParams>(defaultParams)
  const [classFilters, setClassFilters] = useState<ClassFilters>(defaultClassFilters)
  const [typeFilters, setTypeFilters] = useState<TypeFilters>(defaultTypeFilters)
  const [searchValue, setSearchValue] = useState<string>('')
  const debounceSearchValue = useDebounce<string>(searchValue, constants.DEBOUNCE_TIME)
  const [races, setRaces] = useState<RecordRace[]>([])
  const [loader, setLoader] = useState(true)
  const [classSelect, setClassSelect] = useState('Class')
  const [typeSelect, setTypeSelect] = useState('Field type')
  const [totalRace, setTotalRace] = useState(0)
  const memoizedOpenListColumns = useMemo(() => openListColumns, [])
  const auth = useAppSelector(state => state.auth)
  const [isMyHorseOn, toggleIsMyHorseOn] = useToggle(false)
  const useRefSwitch = useRef<HTMLButtonElement>(null)
  const { t } = useTranslation()
  const refSwitch = useRefSwitch.current && useRefSwitch.current?.className
  const isRefSwitch = refSwitch?.includes('switch-btn--on')

  useUpdateEffect(() => {
    setRaces([])
    setParams({ ...params, myHorse: isMyHorseOn })
  }, [isMyHorseOn])

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
    const [, result] = await handleAsyncRequest(raceApi.getRaceList({ ...params, myHorse: isRefSwitch || false }))
    const records = result?.data.records
    setTotalRace(result?.data?.total || 0)
    if (records && records.length > 0) {
      isRefresh ? setRaces([...records]) : setRaces([...races, ...records])
    }
    setLoader(true)
    isRefresh = false
  }

  useEffect(() => {
    fetchListRaces()
    const subscription = WS_MANAGER.subscribe('/topic/race-status', handleSocketChange)
    return () => {
      subscription?.then(sub => sub?.unsubscribe())
    }
  }, [params])

  useUpdateEffect(() => {
    setRaces([])
    setParams({ ...params, search: debounceSearchValue, page: 1 })
  }, [debounceSearchValue])

  useUpdateEffect(() => {
    setRaces([])
    setParams({ ...params, freeRace: isFreeOn, page: 1 })
  }, [isFreeOn])

  const updateClassFilters = useCallback((classFilters: ClassFilters, clickedFilter: RaceClassFilter) => {
    const clonedClassFilters = [...classFilters]

    clonedClassFilters.forEach(filter => {
      if (filter.name === clickedFilter.name) {
        filter.isActive = true
        setClassSelect(filter.name)
      } else {
        filter.isActive = false
      }
    })

    return clonedClassFilters
  }, [])

  const updateTypeFilters = useCallback((typeFilters: TypeFilters, clickedFilter: RaceTypeFilter) => {
    const clonedTypeFilters = [...typeFilters]

    clonedTypeFilters.forEach(filter => {
      if (filter.name === clickedFilter.name) {
        filter.isActive = true
        setTypeSelect(filter.name)
      } else {
        filter.isActive = false
      }
    })

    return clonedTypeFilters
  }, [])

  const updateParamsAfterFilterClicked = useCallback((params: GetRaceListParams, clickedFilter: RaceClassFilter) => {
    const clonedParams = { ...params, page: 1 }

    if (clickedFilter.name !== 'All') {
      clonedParams.raceClass = clickedFilter.name
    } else {
      delete clonedParams.raceClass
    }

    return clonedParams
  }, [])

  const updateParamsAfterTypeClicked = useCallback((params: GetRaceListParams, clickedFilter: RaceTypeFilter) => {
    const clonedParams = { ...params, page: 1 }

    if (clickedFilter.name !== 'All') {
      clonedParams.fieldType = clickedFilter.name
    } else {
      delete clonedParams.fieldType
    }

    return clonedParams
  }, [])

  const handleClassFilterClicked = useCallback(
    (filterName: string) => () => {
      const clickedFilter = classFilters.find(filter => filter.name === filterName)

      if (!clickedFilter) return

      const newClassFilters = updateClassFilters(classFilters, clickedFilter)
      const newParams = updateParamsAfterFilterClicked(params, clickedFilter)
      setRaces([])
      setClassFilters(newClassFilters)
      setParams(newParams)
    },
    [classFilters, params]
  )

  const handleTypeFilterClicked = useCallback(
    (filterName: string) => () => {
      const clickedFilter = typeFilters.find(filter => filter.name === filterName)

      if (!clickedFilter) return

      const newTypeFilters = updateTypeFilters(typeFilters, clickedFilter)
      const newParams = updateParamsAfterTypeClicked(params, clickedFilter)

      setRaces([])
      setTypeFilters(newTypeFilters)
      setParams(newParams)
    },
    [classFilters, params]
  )

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

    if (newStatus === 'SCHEDULING' || newStatus === 'OPEN' || newStatus === 'CANCEL') {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      setParams({ ...params, page: 1 })
      // setRaces([])
      isRefresh = true
    }
  }

  return (
    <OpenStyled>
      <div className='head-container'>
        <OneLineTitle text={t(`${NOTIFICATION_MESSAGE}.openRaces`)} customClass='title' />
      </div>
      <div className='search-container d-flex flex-column flex-lg-row align-items-md-start' id='#top'>
        <SearchInput searchValue={searchValue} handleSearchValueChanged={handleSearchValueChanged} />
        <div className='d-flex flex-wrap align-items-center gap-4 dropdown'>
          <Select
            dataSelect={classFilters}
            nameSelect={classSelect}
            onSelected={(filterName: string) => handleClassFilterClicked(filterName)()}
          />
          <Select
            dataSelect={typeFilters}
            nameSelect={typeSelect}
            onSelected={(filterName: string) => handleTypeFilterClicked(filterName)()}
          />
        </div>
        <SwitchBtn title='FREE' isOn={isFreeOn} handleSwitchBtnClicked={toggleIsFreeOn} />
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
          columns={memoizedOpenListColumns}
          data={clonedRates ?? []}
          isRowClickable
          raisePage={setParams}
          loader={loader}
          params={params}
          paramsFilterResult={paramsFilterResult}
          totalRace={totalRace}
        />
      </div>
    </OpenStyled>
  )
}

export default Open
