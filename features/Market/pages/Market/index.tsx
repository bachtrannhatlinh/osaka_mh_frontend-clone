/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react'
import HorseItem from 'features/Market/components/HorseItem'
import { OneLineTitle, SearchInput } from 'shared'
import MarketStyled from './styled'
import { LendingHorse, LendingSortType, MyAssetSortType, MyHorseListParams, TypeSorts } from 'models'
import SelectCustom from 'shared/SelectCustom'
import { useDebounce, useUpdateEffect, useToggle } from 'hooks'
import { handleAsyncRequest } from 'utils/helper'
import lendingApi from 'apis/lending'
import { constants } from 'apps'
import { SwitchBtn } from 'features/Race/components'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'

export type IMyLendingProps = {
  isActive: boolean
}


const defaultTypeFilters: TypeSorts = [
  {
    name: LendingSortType.Newest,
    isActive: false
  },
  {
    name: LendingSortType.Oldest,
    isActive: false
  },
  {
    name: MyAssetSortType.Ascending,
    isActive: false
  },
  {
    name: MyAssetSortType.Decrease,
    isActive: false
  }
]

export default function Market() {
  const myHorseListParams: MyHorseListParams = {
    limit: 20,
    page: 1,
    myHorse: false,
    sort: 'lending_date-desc'
  }
  const [total, setTotal] = useState()
  const [searchValue, setSearchValue] = useState<string>('')
  const [classSelect, setClassSelect] = useState('Sorted by...')
  const [listHorse, setListHorse] = useState<LendingHorse[]>([])
  const debounceSearchValue = useDebounce<string>(searchValue, constants.DEBOUNCE_TIME)
  const [params, setParams] = useState<MyHorseListParams>(myHorseListParams)
  const [isFetch, setIsFetch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const useRefSwitch = useRef<HTMLButtonElement>(null)
  const { t } = useTranslation()
  const [isMyHorseOn, toggleIsMyHorseOn] = useToggle(false)

  const fetchListRaces = async () => {
    const refSwitch = useRefSwitch.current && useRefSwitch.current?.className
    const isRefSwitch = refSwitch?.includes('switch-btn--on')
    setIsLoading(true)
    const [, result]: any = await handleAsyncRequest(lendingApi.getHorseMarket({ ...params, myHorse: isRefSwitch || null }))
    const records = result?.data.records
    setListHorse(params.page > 1 ? [...listHorse, ...records] : records)
    setTotal(result?.data.total)
    setIsFetch(false)
    if (records && records.length === 0) {
      // setLoader(true)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (isFetch) {
      setListHorse([])
      setSearchValue('')
      setParams({ ...params, page: 1 })
    }
  }, [isFetch])

  useUpdateEffect(() => {
    setListHorse([])
    setParams({ ...params, page: 1, horseName: debounceSearchValue })
  }, [debounceSearchValue])

  useUpdateEffect(() => {
    setListHorse([])
    setParams({ ...params, myHorse: isMyHorseOn, page: 1 })
  }, [isMyHorseOn])

  useEffect(() => {
    fetchListRaces()
  }, [params])

  const handleSearchValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleClassFilterClicked = (item: string) => {
    const handleKeySort = () => {
      switch (item) {
        case LendingSortType.Newest:
          return 'lending_date-desc'
        case LendingSortType.Oldest:
          return 'lending_date-asc'
        case MyAssetSortType.Ascending:
          return 'horse_id-asc'
        case MyAssetSortType.Decrease:
          return 'horse_id-desc'
        default:
          return 'lending_date-desc'
      }
    }
    setParams({
      ...params, page: 1, sort: handleKeySort()
    })
    setClassSelect(item)
  }

  const hanldeViewMore = () => {
    setParams({ ...params, page: params.page + 1 })
  }

  const handleNameHorse = () => {
    if (total === 0 || total === 1) {
      return 'Horse'
    } else return 'Horses'
  }


  return (
    <MarketStyled>
      <div className='top-lending'>
        <OneLineTitle text={handleNameHorse()} total={total} isLending />
        <div className='lending-search'>
          <div className='mt-1'>
            <SwitchBtn
              title={t(`${NOTIFICATION_MESSAGE}.myHorse`)}
              isOn={isMyHorseOn}
              handleSwitchBtnClicked={toggleIsMyHorseOn}
              refSwitch={useRefSwitch}
            />
          </div>
          <SearchInput
            searchValue={searchValue}
            handleSearchValueChanged={handleSearchValueChanged}
            customClass='search-horse-input'
            placeholder={'Search'}
          />
          <SelectCustom
            dataSelect={defaultTypeFilters}
            nameSelect={classSelect}
            onSelected={handleClassFilterClicked}
          />
        </div>
      </div>
      <HorseItem isLoading={isLoading} total={total} listHorse={listHorse} onViewMore={hanldeViewMore} />
    </MarketStyled>
  )
}
