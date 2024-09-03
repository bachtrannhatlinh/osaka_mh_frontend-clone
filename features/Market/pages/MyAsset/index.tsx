/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import HorseItem from 'features/Market/components/HorseItem'
import { OneLineTitle, SearchInput } from 'shared'
import MyAssetStyled from './styled'
import { LendingFilterType, LendingHorse, MyAssetSortType, MyHorseListParams, TypeSorts } from 'models'
import { handleAsyncRequest } from 'utils/helper'
import { constants } from 'apps'
import SelectCustom from 'shared/SelectCustom'
import { useDebounce, useToggle, useUpdateEffect } from 'hooks'
import lendingApi from 'apis/lending'
import { RequestLoginModal } from 'features/Race/components'

export type IMyAssetProps = {
  isActive: boolean
}

const defaultTypeSort: TypeSorts = [
  {
    name: MyAssetSortType.Decrease,
    isActive: false
  },
  {
    name: MyAssetSortType.Ascending,
    isActive: false
  }
]

const defaultTypeFilter: TypeSorts = [
  {
    name: LendingFilterType.ALL,
    isActive: false
  },
  {
    name: LendingFilterType.AVAILABLE,
    isActive: false
  },
  {
    name: LendingFilterType.IN_FARM,
    isActive: false
  },
  {
    name: LendingFilterType.LENDING,
    isActive: false
  },
  {
    name: LendingFilterType.BORROWED,
    isActive: false
  },

]


export default function MyAsset() {
  const myHorseListParams: MyHorseListParams = {
    limit: 20,
    page: 1,
    sort: 'horse_id-asc'
  }
  const [params, setParams] = useState<MyHorseListParams>(myHorseListParams)
  const [searchValue, setSearchValue] = useState<string>('')
  const [total, setTotal] = useState()
  const [classSort, setClassSort] = useState('Sorted by...')
  const [classFilter, setClassFilter] = useState('All')

  // const [isFarmingModal, setIsFarmingModal] = useState(false)
  const [listHorse, setListHorse] = useState<LendingHorse[]>([])

  const debounceSearchValue = useDebounce<string>(searchValue, constants.DEBOUNCE_TIME)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetch, setIsFetch] = useState(false)
  const [isRequestLoginModalOpen, toggleIsRequestLoginModalOpen] = useToggle(false)

  const fetchListRaces = async () => {
    setIsLoading(true)
    const [error, result]: any = await handleAsyncRequest(lendingApi.getHorseMyAsset({ ...params }))
    if (error) {
      setIsLoading(false)
      if (error.code === 403) {
        toggleIsRequestLoginModalOpen(true)
      }
      return
    }
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

  useEffect(() => {
    fetchListRaces()
  }, [params])

  const handleSearchValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSortClicked = (item: string) => {
    setParams({
      ...params, page: 1, sort: item === MyAssetSortType.Decrease ? 'horse_id-desc' : 'horse_id-asc'
    })
    setClassSort(item)
  }

  const handleFilterClicked = (item: string) => {
    setParams({
      ...params, page: 1, lendingStatus: item === LendingFilterType.ALL ? null : item.toUpperCase()
    })
    setClassFilter(item)
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
    <MyAssetStyled>
      <div className='top-lending'>
        <OneLineTitle text={handleNameHorse()} total={total} isLending />
        <div className='lending-search'>
          <SearchInput
            searchValue={searchValue}
            handleSearchValueChanged={handleSearchValueChanged}
            customClass='search-horse-input'
            placeholder={'Search'}
          />
          <SelectCustom
            dataSelect={defaultTypeSort}
            nameSelect={classSort}
            onSelected={handleSortClicked}
          />
          <SelectCustom
            dataSelect={defaultTypeFilter}
            nameSelect={classFilter}
            onSelected={handleFilterClicked}
            isFiltered
          />
        </div>
      </div>
      <HorseItem isLoading={isLoading} total={total} listHorse={listHorse} onViewMore={hanldeViewMore}
      />
      {isRequestLoginModalOpen && <RequestLoginModal toggleIsModalOpen={toggleIsRequestLoginModalOpen} />}
    </MyAssetStyled>
  )
}
