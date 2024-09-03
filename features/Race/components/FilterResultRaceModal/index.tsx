/* eslint-disable @typescript-eslint/no-explicit-any */
// import { DATE_FORMAT } from 'apps/constants'
import { CLOSE_BTN, DISTANCE, ROW_YELLOW } from 'assets/images'
import dayjs from 'dayjs'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { GetRaceListPopupParams, RaceClassNumber, RaceFieldType } from 'models'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'shared'
import { isoDateFormat } from 'utils/helper'
import ButtonFitter from '../btnFilter'
import CustomDropDown from '../CustomDropdown'
import SelectDatePicker from '../SelectDatePicker'
import FilterResultRaceModalStyled from './styled'

import { useSearchParams } from 'react-router-dom'
import ClassTagResult from 'shared/ClassTagResult'

interface FilterResultRaceModalProps {
  toggleIsModalOpen?: (value?: boolean) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRacesPopup: (value: any) => void
  handleCLoseModal: () => void
  isOpen: boolean
  setParamsFilter: (value: GetRaceListPopupParams) => void
  paramsFilter: GetRaceListPopupParams
}

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

function FilterResultRaceModal({
  toggleIsModalOpen,
  setRacesPopup,
  handleCLoseModal,
  isOpen,
  setParamsFilter,
  paramsFilter
}: FilterResultRaceModalProps) {
  const date = new Date()
  const defaultParams: GetRaceListPopupParams = {
    limit: 20,
    page: 1,
    startAt: isoDateFormat(new Date(new Date().setHours(0, 0, 0, 0))),
    endAt: isoDateFormat(date),
    startInstance: '1000',
    endInstance: '3200',
    sort: ['close_at-desc']
  }

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

  const [classFilters, setClassFilters] = useState<ClassFilters>(defaultClassFilters)
  const [filedTypes, setFiledTypes] = useState<TypeFilters>(defaultTypeFilters)
  const [params, setParams] = useState<GetRaceListPopupParams>(defaultParams)
  const [startAt, setStartAt] = useState<string>(defaultParams.startAt)
  const [endAt, setEndAt] = useState<string>(isoDateFormat(date))
  const [startInstance, setStartInstance] = useState<string | null>('1000')
  const [endInstance, setEndInstance] = useState<string | null>('3200')
  const { t } = useTranslation()
  const [, setSearchParams] = useSearchParams()

  const updateClassFilters = useCallback((classFilters: ClassFilters, clickedFilter: RaceClassFilter) => {
    const clonedClassFilters = [...classFilters]

    clonedClassFilters.forEach(filter => {
      if (filter.name === clickedFilter.name) {
        filter.isActive = true
      } else {
        filter.isActive = false
      }
    })

    return clonedClassFilters
  }, [])

  // filed type
  const updateFiledTypes = useCallback((classFilters: TypeFilters, clickedFilter: RaceTypeFilter) => {
    const clonedClassFilters = [...classFilters]

    clonedClassFilters.forEach(filter => {
      if (filter.name === clickedFilter.name) {
        filter.isActive = true
      } else {
        filter.isActive = false
      }
    })

    return clonedClassFilters
  }, [])

  const updateParamsAfterFilterClicked = useCallback(
    (params: GetRaceListPopupParams, clickedFilter: RaceClassFilter) => {
      const clonedParams = { ...params, page: 1 }

      if (clickedFilter.name !== 'All') {
        clonedParams.raceClass = clickedFilter.name
      } else {
        delete clonedParams.raceClass
      }

      return clonedParams
    },
    []
  )

  // filed type
  const updateParamsAfterFiledTypeClicked = useCallback(
    (params: GetRaceListPopupParams, clickedFilter: RaceTypeFilter) => {
      const clonedParams = { ...params, page: 1 }

      if (clickedFilter.name !== 'All') {
        clonedParams.fieldType = clickedFilter.name
      } else {
        delete clonedParams.fieldType
      }

      return clonedParams
    },
    []
  )

  const handleClassFilterClicked = useCallback(
    (filterName: RaceClassFilter['name']) => () => {
      const clickedFilter = classFilters.find(filter => filter.name === filterName)

      if (!clickedFilter) return

      const newClassFilters = updateClassFilters(classFilters, clickedFilter)
      const newParams = updateParamsAfterFilterClicked(params, clickedFilter)

      // setRaces([])
      setClassFilters(newClassFilters)
      setParams(newParams)
    },
    [classFilters, params]
  )

  // filed type
  const handleFieldTypeClicked = useCallback(
    (filterName: RaceTypeFilter['name']) => () => {
      const clickedFilter = filedTypes.find(filter => filter.name === filterName)

      if (!clickedFilter) return

      const newClassFilters = updateFiledTypes(filedTypes, clickedFilter)
      const newParams = updateParamsAfterFiledTypeClicked(params, clickedFilter)

      // setRaces([])
      setFiledTypes(newClassFilters)
      setParams(newParams)
    },
    [filedTypes, params]
  )

  useEffect(() => {
    setParams({
      ...params,
      startAt: dayjs(startAt).toISOString(),
      endAt: dayjs(endAt).toISOString(),
      startInstance: startInstance,
      endInstance: endInstance
    })
  }, [startAt, endAt, startInstance, endInstance])

  const handleFilterResult = async () => {
    setRacesPopup([])
    setParams(params)
    if (params.raceClass === undefined) {
      setSearchParams(params as any)
      setParamsFilter(params)
    } else {
      setParamsFilter({ ...paramsFilter, ...params })
      setSearchParams({ ...paramsFilter, ...params } as any)
    }
    handleCLoseModal()
  }
  function handleActiveDefault(arr: any[]) {
    return arr?.map((item, index) => {
      if (index === 0) return { ...item, isActive: true }
      else return { ...item, isActive: false }
    })
  }

  const handleReset = () => {
    setParams(defaultParams)
    setStartAt(defaultParams.startAt)
    setEndAt(defaultParams.endAt)
    setStartInstance(defaultParams.startInstance)
    setEndInstance(defaultParams.endInstance)
    setClassFilters(handleActiveDefault(classFilters))
    setFiledTypes(handleActiveDefault(filedTypes))
  }

  const handleEndDate = () => {
    if (new Date(endAt) > new Date()) {
      return new Date()
    } else return new Date(endAt)
  }
  const handleStartDate = () => {
    if (new Date(startAt) > new Date()) {
      return new Date()
    } else return new Date(startAt)
  }

  const styleFieldType = 'style-field-type'
  return isOpen ? (
    <Modal onOverlayClick={toggleIsModalOpen}>
      <FilterResultRaceModalStyled>
        <div className='choose-horse-modal'>
          <button className='close-btn p-0 position-absolute' role='button' onClick={handleCLoseModal}>
            <img src={CLOSE_BTN} alt='close' />
          </button>
          <div className='race-name-container'>
            <div className='race-name color-white text-uppercase'>{t(`${NOTIFICATION_MESSAGE}.date`)}</div>
          </div>
          <div className='d-flex select-date'>
            <SelectDatePicker
              onStartAt={setStartAt}
              maxDate={handleEndDate()}
              startAt={new Date(startAt)}
              endTime={new Date(endAt)}
            />
            <div className='row-yellow'>
              <img src={ROW_YELLOW} alt='' />
            </div>
            <SelectDatePicker
              customClass={`45px`}
              onEndAt={setEndAt}
              minDate={handleStartDate()}
              maxDate={new Date()}
              endAt={new Date(endAt)}
              startTime={new Date(startAt)}
            />
          </div>
          <div className='race-name-container class'>
            <div className='race-name color-white text-uppercase'>{t(`${NOTIFICATION_MESSAGE}.class`)}</div>
            <div className='class-filter-container flex-wrap align-items-center gap-3 class-filter'>
              {classFilters.map(filter => (
                <ClassTagResult
                  key={filter.name}
                  text={filter.name}
                  isActive={filter.isActive}
                  onTagClicked={handleClassFilterClicked(filter.name)}
                />
              ))}
            </div>
          </div>
          <div className='race-name-container class'>
            <div className='race-name color-white text-uppercase'>{t(`${NOTIFICATION_MESSAGE}.fieldType`)}</div>
            <div className='class-filter-container flex-wrap align-items-center gap-3 filed-type'>
              {filedTypes.map(filed => (
                <ClassTagResult
                  key={filed.name}
                  text={filed.name}
                  isActive={filed.isActive}
                  onTagClicked={handleFieldTypeClicked(filed.name)}
                  customClass={styleFieldType}
                />
              ))}
            </div>
          </div>
          <div className='race-name-container distance'>
            <div className='race-name color-white text-uppercase'>{t(`${NOTIFICATION_MESSAGE}.distance`)}</div>
            <div className='distance-block'>
              <div className='dropdown-left'>
                <CustomDropDown
                  onStartInstance={setStartInstance}
                  defaultInstace='1000'
                  maxInstace={endInstance}
                  startInstance={startInstance}
                />
              </div>
              <img src={DISTANCE} alt='' />
              <img src={ROW_YELLOW} alt='' className='img-row-yellow' />
              <div className='dropdown-right'>
                <CustomDropDown
                  onEndInstance={setEndInstance}
                  defaultInstace='3200'
                  minInstace={startInstance}
                  endInstance={endInstance}
                />
              </div>
            </div>
          </div>
          <div className='btn-reset-filter d-flex flex-row-reverse'>
            <ButtonFitter onFilter={handleFilterResult} />
            <button className='reset' onClick={handleReset}>
              {t(`${NOTIFICATION_MESSAGE}.reset`)}
            </button>
          </div>
        </div>
      </FilterResultRaceModalStyled>
    </Modal>
  ) : (
    <></>
  )
}

export default FilterResultRaceModal
