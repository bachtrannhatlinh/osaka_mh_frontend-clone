/* eslint-disable @typescript-eslint/no-explicit-any */
import lendingApi from 'apis/lending'
import { constants } from 'apps'
import { BTN_PROFIT } from 'assets/images'
import HorseItem from 'features/Market/components/HorseItem'
import { RaceTable, RequestLoginModal } from 'features/Race/components'
import { useDebounce, useToggle, useUpdateEffect } from 'hooks'
import { GetProfit, LendingFilterType, LendingHorse, MyAssetSortType, MyHorseListParams, TypeSorts } from 'models'
import { useEffect, useState, useMemo } from 'react'
import { OneLineTitle, SearchInput, TwoLineTitle } from 'shared'
import SelectCustom from 'shared/SelectCustom'
import { profitListColumns } from 'utils/columns'
import { handleAsyncRequest } from 'utils/helper'
import MyLendingStyled from './styled'
import BtnBack from 'shared/BtnBack'

export type IMyLendingProps = {
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
    name: LendingFilterType.LENDING,
    isActive: false
  },
  {
    name: LendingFilterType.BORROWED,
    isActive: false
  },

]
const profitParams: MyHorseListParams = {
  limit: 20,
  page: 1,
}

export default function MyLending() {
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
  const [classFilter, setClassFilter] = useState('All')
  const [isRequestLoginModalOpen, toggleIsRequestLoginModalOpen] = useToggle(false)

  // profit
  const [typeProfit, setTypeProfit] = useState('')
  const memoizedResultListColumns = useMemo(() => profitListColumns, [])
  const [profits, setProfits] = useState<GetProfit[]>([])
  const [totalProfits, setTotalProfits] = useState(0)
  const [paramsProfit, setParamsProfit] = useState<MyHorseListParams>(profitParams)
  const [firstProfit, setFirstProfit] = useState(false)

  const fetchProfitActive = async () => {
    setIsLoading(true)
    const [error, result]: any = await handleAsyncRequest(lendingApi.getProfitActive({ ...paramsProfit }))
    if (error) {
      console.log(error)
    }
    if (result) {
      setProfits(firstProfit ? result?.data?.records : [...profits, ...result?.data?.records || []])
      setTotalProfits(result?.data?.total)
      setFirstProfit(false)
    }
    setIsLoading(false)
  }
  const fetchProfitHistory = async () => {
    setIsLoading(true)
    const [error, result]: any = await handleAsyncRequest(lendingApi.getProfitHistory({ ...paramsProfit }))
    if (error) {
      console.log(error)
    }
    if (result) {
      setProfits(firstProfit ? result?.data?.records : [...profits, ...result?.data?.records || []])
      setTotalProfits(result?.data?.total)
      setFirstProfit(false)
    }
    setIsLoading(false)
  }


  const fetchListRaces = async () => {
    setIsLoading(true)
    const [error, result]: any = await handleAsyncRequest(lendingApi.getHorseMyLending({ ...params }))
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

  const handleFilterClicked = (item: string) => {
    setParams({
      ...params, page: 1, lendingStatus: item === LendingFilterType.ALL ? null : item.toUpperCase()
    })
    setClassFilter(item)
  }

  const hanldeViewMore = () => {
    setParams({ ...params, page: params.page + 1 })
  }

  const onProfitClicked = () => {
    setTypeProfit('active')
    setParamsProfit({ ...paramsProfit, page: 1 })
  }

  useEffect(() => {
    if (typeProfit === 'active') {
      fetchProfitActive()
    }
    if (typeProfit === 'history') {
      fetchProfitHistory()
    }
  }, [paramsProfit])

  const hanldeClickTab = (type: string) => {
    if (typeProfit === type) return
    setTypeProfit(type)
    setParamsProfit({ ...paramsProfit, page: 1 })
    setFirstProfit(true)
  }

  const handleBtnBackClick = () => {
    setTypeProfit('')
    setFirstProfit(false)
    setProfits([])
  }

  const handleNameHorse = () => {
    if (total === 0 || total === 1) {
      return 'Horse'
    } else return 'Horses'
  }

  return (
    <MyLendingStyled>
      <div className='my-lending-container'>
        {(typeProfit) ?
          <div>
            <div className='profit-container'>
              <BtnBack onBack={handleBtnBackClick} />
              <div className='tab-lend'>
                <div className='tab-link text-center' onClick={() => hanldeClickTab('active')}>
                  {typeProfit === 'active' ?
                    <TwoLineTitle text={'ACTIVE LENDING'} /> : <span className='color-white'> ACTIVE LENDING </span>
                  }
                </div>
                <div className='tab-link text-center' onClick={() => hanldeClickTab('history')}>
                  {typeProfit === 'history' ?
                    <TwoLineTitle text={'LENDING HISTORY'} /> : <span className='color-white'> LENDING HISTORY </span>
                  }
                </div>
              </div>
              <RaceTable
                columns={memoizedResultListColumns}
                data={profits ?? []}
                raisePage={setParamsProfit}
                loader={true}
                params={paramsProfit}
                // checkLoadingPage={false}
                totalRace={totalProfits}
              />
            </div>
          </div> :
          <div>
            <div className='top-lending'>
              <OneLineTitle text={handleNameHorse()} total={total} isLending />
              <div className='lending-search'>
                <div className='btn-profit' onClick={onProfitClicked}>
                  <img src={BTN_PROFIT} alt='profit' width={103} height={29} />
                </div>
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
                <SelectCustom
                  dataSelect={defaultTypeFilter}
                  nameSelect={classFilter}
                  onSelected={handleFilterClicked}
                  isFiltered
                />
              </div>
            </div>
            <HorseItem isLoading={isLoading} total={total} listHorse={listHorse} onViewMore={hanldeViewMore} />
          </div>
        }
      </div>
      {isRequestLoginModalOpen && <RequestLoginModal toggleIsModalOpen={toggleIsRequestLoginModalOpen} />}
    </MyLendingStyled >
  )
}
