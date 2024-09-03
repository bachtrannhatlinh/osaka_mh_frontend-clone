/* eslint-disable @typescript-eslint/no-explicit-any */
import lendingApi from 'apis/lending'
import { constants } from 'apps'
import HorseItem from 'features/Market/components/HorseItem'
import { RequestLoginModal } from 'features/Race/components'
import { useDebounce, useToggle, useUpdateEffect } from 'hooks'
import { LendingHorse, MyAssetSortType, MyHorseListParams, TypeSorts } from 'models'
import { useEffect, useState } from 'react'
import { OneLineTitle, SearchInput } from 'shared'
import SelectCustom from 'shared/SelectCustom'
import { handleAsyncRequest } from 'utils/helper'
import MyBorrowStyled from './styled'

export type IMyBorrowProps = {
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

export default function MyBorrow() {
  const myHorseListParams: MyHorseListParams = {
    limit: 20,
    page: 1,
    sort: 'horse_id-asc'
  }
  const [total, setTotal] = useState()
  const [searchValue, setSearchValue] = useState<string>('')
  const [classSelect, setClassSelect] = useState('Sorted by...')
  const [listHorse, setListHorse] = useState<LendingHorse[]>([])
  const debounceSearchValue = useDebounce<string>(searchValue, constants.DEBOUNCE_TIME)

  const [params, setParams] = useState<MyHorseListParams>(myHorseListParams)
  const [isFetch, setIsFetch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRequestLoginModalOpen, toggleIsRequestLoginModalOpen] = useToggle(false)

  const fetchListRaces = async () => {
    setIsLoading(true)
    const [error, result]: any = await handleAsyncRequest(lendingApi.getHorseMyBorrow({ ...params }))
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

  const handleClassFilterClicked = (item: string) => {
    setParams({
      ...params, page: 1, sort: item === MyAssetSortType.Decrease ? 'horse_id-desc' : 'horse_id-asc'
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
    <MyBorrowStyled>
      <div className='my-borrow-container'>
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
              nameSelect={classSelect}
              onSelected={handleClassFilterClicked}
            />
          </div>
        </div>
        <HorseItem isLoading={isLoading} total={total} listHorse={listHorse} onViewMore={hanldeViewMore} />
      </div>
      {isRequestLoginModalOpen && <RequestLoginModal toggleIsModalOpen={toggleIsRequestLoginModalOpen} />}
    </MyBorrowStyled>
  )
}
