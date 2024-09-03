/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from 'apis/axiosClient'
import userApi from 'apis/userApi'
import { constants, links, paths } from 'apps'
import { AVATAR_DEFAULT, BAR_PRIMARY, DISABLE_H2H, SETTING, UNDISABLE_H2H } from 'assets/images'
import { AttributeBox } from 'features/Horse/components'
import HorseModal from 'features/Horse/components/HorseModal'
import { MyHorseItem } from 'features/Profile/components'
import ConnectH2hModal from 'features/Profile/components/ConnectH2Hmodal'
import UpdateInforModal from 'features/Profile/components/UpdateInforModal'
import { useAppDispatch, useAppSelector, useDebounce, useToggle, useFetch, useIsMounted } from 'hooks'
import { setCurrentUser } from 'features/Profile/profile.slice'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { CurrentUser, Horse, MyHorseListParams, OWNER_STATUS, TypeSorts } from 'models'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SearchInput } from 'shared'
import { handleAsyncRequest, shortenUserName } from 'utils/helper'
import { getCurrentUser, getSigner } from 'utils/metamask'
import ProfileCloneStyled from './styled'
import ReactPaginate from 'react-paginate'
import SelectCustom from 'shared/SelectCustom'

const defaultTypeFilter: TypeSorts = [
  {
    name: OWNER_STATUS.All,
    key: OWNER_STATUS.AllKey,
    isActive: false
  },
  {
    name: OWNER_STATUS.Owner,
    key: OWNER_STATUS.OwnerKey,
    isActive: false
  },
  {
    name: OWNER_STATUS.Lending,
    key: OWNER_STATUS.OwnerKey,
    isActive: false
  }
]


export default function ProfileClone() {
  const myHorseListParams: MyHorseListParams = {
    limit: 5,
    page: 1,
    ownStatus: null,
    search: null
  }

  const profile = useAppSelector(state => state.profile)
  const [searchValue, setSearchValue] = useState<string>('')
  const debounceSearchValue = useDebounce<string>(searchValue, constants.DEBOUNCE_TIME)

  const [horseListParams, setHorseListParams] = useState<MyHorseListParams>(myHorseListParams)
  const [listHorse, setListHorse] = useState<Horse[]>([])
  const [isOpenHorseModal, setOpenHorseModal] = useState<boolean>(false)
  const [idBeChoose, setIdBeChoose] = useState<number>(0)
  const myName = profile.name
  const [openUpdateInforModal, setUpdateInforModal] = useToggle(false)
  const [openConnectH2hModal, setOpenConnectH2hModal] = useToggle(false)
  const [career, setCareer] = useState<string>('')
  const [numberHorse, setNumberHorse] = useState<string>('')
  const [winRate, setWinRate] = useState<string>('')
  const [isH2H, setIsH2H] = useState<boolean>(false)
  const [h2HId, setH2HId] = useState<string>('')
  const [total, setTotal] = useState<number>(0)
  const [pageCount, setPageCount] = useState<number>(0)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)
  const isMounted = useIsMounted()

  const [classSelect, setClassSelect] = useState('All')
  const [searchParams, setSearchParams] = useSearchParams() as any
  const paramsSearch = Object.fromEntries(searchParams.entries())

  const { data: horseListResponse } = useFetch(
    {
      fetcher: userApi.getUserHorseList,
      params: { ...horseListParams, page: paramsSearch.page ? +paramsSearch.page : horseListParams.page }
    }, [horseListParams])

  const handleTotalStatistic = (currentUser: CurrentUser) => {
    const totalRace = currentUser.total_race
    setTotal(totalRace)
    const firstClass = currentUser.first_count
    const secondClass = currentUser.second_count === null ? 0 : currentUser.second_count
    const thirdClass = currentUser.third_count === null ? 0 : currentUser.third_count
    const tltClass = (firstClass + secondClass + thirdClass) / totalRace
    const newTltClass = isNaN(tltClass) ? 0 : tltClass * 100
    const totalStatistic = ` - ${firstClass}/${secondClass}/${thirdClass}`
    const winRateResult = `${Number.isInteger((firstClass / totalRace) * 100)
      ? (firstClass / totalRace) * 100
      : ((firstClass / totalRace) * 100).toFixed(2)
      }% - ${Number.isInteger(newTltClass) ? newTltClass : newTltClass.toFixed(2)}%`
    const handleWinRate = () => {
      let valueDisplay = ''
      if (totalRace === 0 && firstClass === 0 && secondClass === 0 && thirdClass === 0) {
        valueDisplay = '---'
      }
      if (totalRace > 0 && firstClass === 0 && secondClass === 0 && thirdClass === 0) {
        valueDisplay = '0.00% - 0.00%'
      }
      if (totalRace !== 0 && (firstClass !== 0 || secondClass !== 0 || thirdClass !== 0)) {
        valueDisplay = winRateResult
      }
      return valueDisplay
    }
    setCareer(totalStatistic)
    setWinRate(handleWinRate())
    if (currentUser?.h2h_id) {
      setIsH2H(true)
      setH2HId(currentUser?.h2h_id)
    }
  }
  const { t } = useTranslation()

  const handleSearchValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    setSearchParams({ page: 1 })
    setHorseListParams({ ...horseListParams, page: 1, search: searchValue })
  }, [debounceSearchValue])


  const closeHorseModal = () => {
    setOpenHorseModal(false)
  }

  const handleOpenModalHorse = (id: number) => {
    setIdBeChoose(id)
    setOpenHorseModal(true)
  }

  const fetchListRaces = async () => {
    const [error]: any = await handleAsyncRequest(userApi.getUserHorseList(myHorseListParams))
    if (error?.code === 403) {
      window.location.href = paths.auth.login()
    }
  }

  const fetchCurrent = async () => {
    const [error, currentUser]: any = await handleAsyncRequest(getCurrentUser())
    if (error?.code === 403) {
      window.location.href = paths.auth.login()
    }
    if (!currentUser) return

    handleTotalStatistic(currentUser)
    setNumberHorse(currentUser.total_horse)
  }

  useEffect(() => {
    const checkSignerProfile = async () => {
      const [signerError] = await handleAsyncRequest(getSigner())
      if (signerError) {
        navigate(links.home.index())
      }
    }

    const checkCurrentUser = async () => {
      const [, currentUser]: any = await handleAsyncRequest(getCurrentUser())
      if (!currentUser) return

      dispatch(setCurrentUser(currentUser))
    }

    checkSignerProfile()
    checkCurrentUser()
    fetchListRaces()
  }, [])

  useEffect(() => {
    if (auth.isLogged === false || process.env.MODE === 'DEV') return
    const url = '/user/sync-horse'
    axiosClient.get(url)
  }, [auth])

  useEffect(() => {
    fetchCurrent()
  }, [])

  useEffect(() => {
    if (!horseListResponse || !isMounted()) {
      return
    }
    setListHorse(horseListResponse.records)
    setPageCount(horseListResponse.total_page)
    setNumberHorse(horseListResponse.total.toString())
  }, [horseListResponse])

  const handleSetting = () => {
    setUpdateInforModal(true)
  }

  const handleCancelUpdate = () => {
    setUpdateInforModal(false)
  }
  const handleOpenConnectH2hModal = () => {
    setOpenConnectH2hModal(true)
  }
  const handleCancelConnectH2hModal = () => {
    setOpenConnectH2hModal(false)
  }

  const handlePageClick = (event: any) => {
    setSearchParams({ page: event.selected + 1 })
    setHorseListParams({ ...horseListParams, page: event.selected })
  }

  const handleKeyFilter = (status: string) => {
    switch (status) {
      case OWNER_STATUS.All:
        return null
      case OWNER_STATUS.Owner:
        return OWNER_STATUS.OwnerKey
      case OWNER_STATUS.Lending:
        return OWNER_STATUS.LendingKey
      default:
        return null
    }
  }
  const handleClassFilterClicked = (item: string) => {
    setSearchParams({ page: 1 })
    setListHorse([])
    setSearchValue('')
    setHorseListParams({ ...horseListParams, ownStatus: handleKeyFilter(item), search: '' })
    setClassSelect(item)
  }

  return (
    <ProfileCloneStyled total={total}>
      <div className='avatar'>
        <img src={profile.avatar ?? AVATAR_DEFAULT} alt='' className='avatar' />
      </div>
      <div className='name-profile'>
        <span className='color-white text-uppercase'>{shortenUserName(profile.name)}</span>
      </div>
      <div className='address-wallet'>
        <span className='color-white text-uppercase'>{profile.public_address}</span>
      </div>
      <div className='disableH2H mt-2'>
        <img src={DISABLE_H2H} alt='' />
        <span className='color-white '>H2H ID: {h2HId || t(`${NOTIFICATION_MESSAGE}.notConnected`)}</span>
      </div>
      <div className='undisableH2H mt-3'>
        {!isH2H && (
          <span className='connect-h2h'>
            <button onClick={handleOpenConnectH2hModal}>
              <img src={UNDISABLE_H2H} alt='' />
              <span className='color-white '>{t(`${NOTIFICATION_MESSAGE}.connectH2H`)}</span>
            </button>
          </span>
        )}
        <span className='setting'>
          <button onClick={handleSetting}>
            <img src={SETTING} alt='' />
            <span className='color-white '>{t(`${NOTIFICATION_MESSAGE}.settings`)}</span>
          </button>
        </span>
      </div>
      <div className='attribute-container mt-3 d-flex justify-content-center'>
        <div className='width-attributeBox'>
          <AttributeBox title='HORSE NUM' value={numberHorse ?? ''} />
        </div>
        <div className='width-attributeBox'>
          <AttributeBox title='CAREER' value={career ?? ''} total={total} />
        </div>
        <div className='width-attributeBox'>
          <AttributeBox title='WIN RATE' value={winRate ?? ''} />
        </div>
      </div>
      <div className='mt-1'>
        <img src={BAR_PRIMARY} alt='' />
      </div>
      <div className='search-my-horse'>
        <span className='color-white title'>{t(`${NOTIFICATION_MESSAGE}.myHorses`)}</span>
        <span className='search-container'>
          <SearchInput
            searchValue={searchValue}
            handleSearchValueChanged={handleSearchValueChanged}
            customClass='search-horse-input'
            placeholder={t(`${NOTIFICATION_MESSAGE}.horseName`)}
          />
          <SelectCustom
            dataSelect={defaultTypeFilter}
            nameSelect={classSelect}
            onSelected={handleClassFilterClicked}
            isFiltered
          />
        </span>
      </div>
      <div className='my-horse-container'>
        <div className='d-flex header-horse text-uppercase'>
          <span className='horse width-20'>{t(`${NOTIFICATION_MESSAGE}.horse`)}</span>
          <span className='name width-15'>{t(`${NOTIFICATION_MESSAGE}.name`)}</span>
          <span className='blood-line width-20'>{t(`${NOTIFICATION_MESSAGE}.bloodline`)}</span>
          <span className='gender width-20'>{t(`${NOTIFICATION_MESSAGE}.gender`)}</span>
          <span className='classes'>{t(`${NOTIFICATION_MESSAGE}.classes`)}</span>
          <span className='status'>{t(`${NOTIFICATION_MESSAGE}.status`)}</span>
        </div>
        <table className='my-horse-table'>
          {listHorse.length === 0 && debounceSearchValue.length > 0 && (
            <span className='color-white font-size-20'>
              There is no horse <span className='color-orange'>{debounceSearchValue}</span> in your stable
            </span>
          )}
          {
            listHorse.length > 0 && (
              <tbody>
                {listHorse.map((horse, index) => {
                  return (
                    <MyHorseItem
                      key={horse.id}
                      stt={index + (paramsSearch.page || 1) * 5 - 5}
                      horse={horse}
                      openHorseModal={isOpenHorseModal}
                      closeHorseModal={closeHorseModal}
                      handleOpenModalHorse={() => handleOpenModalHorse(horse.token_id)}
                      myName={myName}
                      atProfile={false}
                      idBeChoose={idBeChoose}
                    />
                  )
                })}
              </tbody>
            )
          }
        </table>
        {listHorse.length > 0 && parseInt(numberHorse) > 5 && (
          <div className='paginate'>
            <ReactPaginate
              nextLabel='>'
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel='<'
              pageClassName='page-item'
              pageLinkClassName='page-link'
              previousClassName='page-item'
              previousLinkClassName='page-link'
              nextClassName='page-item'
              nextLinkClassName='page-link'
              breakLabel='...'
              breakClassName='page-item'
              breakLinkClassName='page-link'
              containerClassName='pagination'
              activeClassName='active'
              forcePage={paramsSearch.page ? +paramsSearch.page - 1 : 0}
            />
          </div>
        )}
      </div>
      {openConnectH2hModal && (
        <ConnectH2hModal
          onIsH2H={setIsH2H}
          toggleIsModalOpen={setOpenConnectH2hModal}
          onCancelModal={handleCancelConnectH2hModal}
          onUpdateId={fetchCurrent}
        />
      )}
      {openUpdateInforModal && (
        <UpdateInforModal
          toggleIsModalOpen={setUpdateInforModal}
          onCancelUpdate={handleCancelUpdate}
        ></UpdateInforModal>
      )}
      {isOpenHorseModal && (
        <HorseModal token_id={idBeChoose} onCloseButtonClick={closeHorseModal} myName={myName} atProfile={true} />
      )}
    </ProfileCloneStyled>
  )
}
