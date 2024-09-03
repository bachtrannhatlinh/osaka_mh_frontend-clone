import userApi from 'apis/userApi'
import { constants } from 'apps'
import { CLOSE_BTN, GAME_TOKEN_E_HTC } from 'assets/images'
import { useDebounce, useFetch, useIsFirstRender, useIsMounted } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { HorseAvailable, OWNER_STATUS, Race, TypeSorts, UserAvailableHorses } from 'models'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ClassTag, Modal, SearchInput } from 'shared'
import SelectCustom from 'shared/SelectCustom'
import ChooseHorseItem from '../ChooseHorseItem'
import ChooseHorseModalStyled from './styled'

interface ChooseHorseModalProps {
  race: Race
  joiningGate: number
  toggleIsModalOpen: (value?: boolean) => void
  setTriggerFetchRaceDetail: Dispatch<SetStateAction<boolean>>
  hadJoined: boolean
  onCloseButtonClick: () => void
  onConfirmHorse: (id: number) => void
}


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

function ChooseHorseModal({
  race,
  toggleIsModalOpen,
  onCloseButtonClick,
  onConfirmHorse,
  hadJoined,
  joiningGate
}: ChooseHorseModalProps) {
  const defaultHorseListParams: UserAvailableHorses = {
    raceId: race.id,
    ownStatus: null
  }
  const horseListRef = useRef<HTMLDivElement>(null)
  const [horseListParams, setHorseListParams] = useState<UserAvailableHorses>(defaultHorseListParams)
  const [horseList, setHorseList] = useState<HorseAvailable[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const isMounted = useIsMounted()
  const isFirstRender = useIsFirstRender()
  const debounceSearchValue = useDebounce<string>(searchValue, constants.DEBOUNCE_TIME)
  const { t } = useTranslation()
  const [classSelect, setClassSelect] = useState('All')

  const { data: horseListResponse } = useFetch(
    { fetcher: userApi.getUserAvailableHorses, params: horseListParams },
    [horseListParams]
  )

  useEffect(() => {
    if (isFirstRender) return
    setHorseList([])
    const filteredData = horseListResponse?.records.filter(el => {
      if (el.active === true) {
        if (searchValue === '') {
          return el
        } else {
          return el.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
        }
      }
    })
    return setHorseList(filteredData || [])
  }, [debounceSearchValue])

  useEffect(() => {
    if (!horseListResponse || !isMounted()) {
      return
    }
    const cloneHorseListResponse = horseListResponse.records?.filter(item => item.active === true)
    const newHorseList: HorseAvailable[] = horseList.concat(cloneHorseListResponse)

    setHorseList(newHorseList)
  }, [horseListResponse])

  const handleSearchValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleChooseHorse = (horseId: number) => {
    onConfirmHorse(horseId)
    toggleIsModalOpen()
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
    setHorseList([])
    setSearchValue('')
    setHorseListParams({ ...horseListParams, ownStatus: handleKeyFilter(item) })
    setClassSelect(item)
  }
  return (
    <Modal onOverlayClick={toggleIsModalOpen}>
      <ChooseHorseModalStyled>
        <div className='choose-horse-modal'>
          <button className='close-btn p-0 position-absolute' role='button' onClick={onCloseButtonClick}>
            <img src={CLOSE_BTN} alt='close' />
          </button>
          <div className='race-name-container d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center'>
              <div className='race-name color-white font-bold text-uppercase'>{race.name}</div>
              <div className='race-class ps-2'>
                <ClassTag text={race.racing_class.name} isActive />
              </div>
            </div>
            <div className='pe-3'>
              <span className='race-info-item d-flex align-items-center gate-no'>
                <span className='race-info-title color-white'>{t(`${NOTIFICATION_MESSAGE}.gateNo`)}</span>
                <span className='race-info-content color-white ps-1'> {joiningGate}</span>
              </span>
            </div>
          </div>
          <div className='race-info-container d-flex align-items-center justify-content-between pe-3'>
            <div className='race-info-item d-flex align-items-center'>
              <span className='race-info-title color-grey'>{t(`${NOTIFICATION_MESSAGE}.racecourse`)}</span>
              <span className='race-info-content color-white'>{race.course.name}</span>
            </div>
            <div className='race-info-item d-flex align-items-center'>
              <span className='race-info-title color-grey'>{t(`${NOTIFICATION_MESSAGE}.fieldType`)}</span>
              <span className='race-info-content color-white'>{race.field_type.type}</span>
            </div>
            <div className='race-info-item d-flex align-items-center'>
              <span className='race-info-title color-grey'>{t(`${NOTIFICATION_MESSAGE}.distance`)}</span>
              <span className='race-info-content color-white'>{race.distance?.distance.toLocaleString()}m</span>
            </div>
            <div className='race-info-item d-flex align-items-center'>
              <span className='race-info-title color-grey'>{t(`${NOTIFICATION_MESSAGE}.entryFee`)}</span>
              {race.entry_fee === 0 ? (
                <span className='race-info-content font-bold color-primary'>{t(`${NOTIFICATION_MESSAGE}.free`)}</span>
              ) : (
                <span className='race-info-content font-bold color-e-htc'>
                  {race.entry_fee}
                  <img src={GAME_TOKEN_E_HTC} alt='e-htc' />
                </span>
              )}
            </div>
          </div>
          {((horseList.length > 0 && !hadJoined) || searchValue.length > 0 || classSelect !== 'All') && (
            <div className='search-horse-container d-flex align-items-center justify-content-between'>
              <>
                <div className='search-title color-white'>{t(`${NOTIFICATION_MESSAGE}.selectHorseRace`)}</div>
                <SearchInput
                  onAutoFocus={true}
                  searchValue={searchValue}
                  handleSearchValueChanged={handleSearchValueChanged}
                  customClass='search-input'
                />
                <SelectCustom
                  dataSelect={defaultTypeFilter}
                  nameSelect={classSelect}
                  onSelected={handleClassFilterClicked}
                  isFiltered
                />
              </>
            </div>)}
          {/* )} */}
          {horseList.length === 0 && !hadJoined && !searchValue && (
            <div className='search-title no-horse '>{t(`${NOTIFICATION_MESSAGE}.noHorseThisRace`)}</div>
          )}

          {horseList.length === 0 && searchValue && (
            <div>
              <div
                className='search-title no-horse'
                dangerouslySetInnerHTML={{
                  __html: t(`${NOTIFICATION_MESSAGE}.noHorseSearchThisRace`, { search: searchValue })
                }}
              />
            </div>
          )}

          {horseList.length > 0 && hadJoined ? (
            <div className='no-horse'>{t(`${NOTIFICATION_MESSAGE}.horseJoinedRace`)}</div>
          ) : (
            horseList && (
              <div className='horse-list-container d-flex flex-column' ref={horseListRef}>
                {horseList.map((horse, index) => (
                  <ChooseHorseItem key={index} horse={horse} onHorseClick={handleChooseHorse} />
                ))}
              </div>
            )
          )}
        </div>
      </ChooseHorseModalStyled>
    </Modal>
  )
}

export default ChooseHorseModal
