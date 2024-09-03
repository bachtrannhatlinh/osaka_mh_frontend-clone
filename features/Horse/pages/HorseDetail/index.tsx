/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactPaginate from 'react-paginate'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


import horseApi from 'apis/horseApi'
import userApi from 'apis/userApi'
import { MAX_HORSE_LEVEL, TIME_CLOSE_MODAL, TIME_CLOSE_STATS_MODAL } from 'apps/constants'
import { DISABLE_LEVEL_PLUS, ENABLE_LEVEL_PLUS, ICON_BORROW, POPUP_EXP } from 'assets/images'
import { setCoinUser } from 'features/Balance/coinUser.slice'
import Animation from 'features/components/Animation'
import { AbilityBox, AttributeBox, EnergyBar, HorseCareerItem, StatsBar } from 'features/Horse/components'
import EnergyExpBar from 'features/Horse/components/EnergyExpBar'
import HorseModalConfirm from 'features/Horse/components/HourseModalConfirm'
import HourseModalConfirmLevelUp from 'features/Horse/components/HourseModalConfirmLevelUp'
import { ResultHorseModal } from 'features/Race/components'
import { useAppDispatch, useToggle } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import {
  ApiResponse,
  Career,
  CurrentUser,
  GetHorseCareerListParams,
  GetHorseCareerResponse,
  Horse,
  HorseCareer,
  Level,
  ListHorseStats,
  UpdateStatsParams,
  HouseStats,
  LENDING_STATUS
} from 'models'
import { ClassTag } from 'shared'
import Button from 'shared/Button'
import OneLineTitleClone from 'shared/OneLineTitleClone'
import { capitalizeOnlyFirstLetter, checkFormatId, handleAsyncRequest, hanldeHorseOwnerName } from 'utils/helper'
import { getCurrentUser } from 'utils/metamask'
import HorseDetailStyled from './styled'

const careerListParams: Omit<GetHorseCareerListParams, 'horseId'> = {
  limit: 999999,
  page: 1,
  sort: ['created-desc']
}
const defaultStats = [
  { stats_type: 'SPEED', point: 0 },
  { stats_type: 'MUSCLE', point: 0 },
  { stats_type: 'STAMINA', point: 0 },
  { stats_type: 'ACCURACY', point: 0 },
  { stats_type: 'SPIRIT', point: 0 },
  { stats_type: 'IQ', point: 0 }
]

const headerRaces = [
  'Time',
  'Race name',
  'Race course',
  'Class',
  'Field type',
  'Distance',
  'Rank',
  'Entry fee',
  'Race pool'
]

const statsType = ['SPEED', 'MUSCLE', 'STAMINA', 'ACCURACY', 'SPIRIT', 'IQ']

function HorseDetail() {
  const dispatch = useAppDispatch()

  const defaultParams: UpdateStatsParams[] = defaultStats
  const { token_id } = useParams<string>()
  const [horseCareerList, setHorseCareerList] = useState<HorseCareer[]>([])
  const [horse, setHorse] = useState<Horse>()
  const [params, setParams] = useState<UpdateStatsParams[]>(defaultParams)
  const [firstTime, setFirstTime] = useState(0)
  const [disableRecovery, setDisableRecovery] = useState<boolean>(false)
  const [levelUp, setLevelUp] = useState<number>(0)
  const [winRate, setWinRate] = useState<string>('')
  const [carrer, setCarrer] = useState<string>('')
  const [point, setPoint] = useState<number>(0)
  const [totalExpHorse, setTotalExpHorse] = useState<number>(0)
  const [messageError, setMessageError] = useState<string>('')
  const [horses, setHorses] = useState<ListHorseStats[]>([])
  const [horsesStats, setHorsesStats] = useState<HouseStats[]>([])
  const [using, setUsing] = useState<number>(0)
  const [expCurrent, setExpCurrent] = useState<number>(0)
  const [isModalOpen, toggleIsModalOpen] = useToggle(false)
  const [itemOffset, setItemOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [currentItems, setCurrentItems] = useState<HorseCareer[]>([])
  const [horseId, setHorseId] = useState<number>(0)
  const [currentUser, setCurrentUser] = useState<CurrentUser>()
  const [canLevelUp, setCanLevelUp] = useState<boolean>(false)
  const [isOpenModalConfirmPickUpLevel, setModalConfirmPickUpLevel] = useState<boolean>(false)
  const [levelHorse, setLevelHorse] = useState<Level>()
  const [animation, setAnimation] = useState(false)
  const [isModalResultHorseOpen, toggleIsModalResultHorseOpen] = useToggle(false)
  const [messageErrorLevelUp, setMessageErrorLevelUp] = useState<string>('')
  const { t } = useTranslation()

  const fetchHorse = async () => {
    const [error, horseResponse] = await handleAsyncRequest<ApiResponse<Horse>>(
      horseApi.getHorseDetailByTokenId({ token_id })
    )

    if (error) {
      console.log(error)
    }

    if (horseResponse) {
      const fetchedHorse = horseResponse.data
      setHorseId(fetchedHorse?.id)
      setHorse(fetchedHorse)
    }
  }

  useEffect(() => {
    checkFormatId(token_id || '')

    fetchHorse()
  }, [token_id])

  const fetchCurrentUser = async () => {
    const [, currentUser] = await handleAsyncRequest(getCurrentUser())
    setCurrentUser(currentUser)
  }

  const fetchHorseStats = async () => {
    const [error, horseStatsResponse]: any = await handleAsyncRequest<ApiResponse<HouseStats>>(
      horseApi.getHouseStats()
    )

    if (error) {
      console.log(error)
    }

    if (horseStatsResponse) {
      const fetchedHorsStats = horseStatsResponse.data
      setHorsesStats(fetchedHorsStats)
    }
  }

  useEffect(() => {
    fetchHorseStats()
    fetchCurrentUser()
  }, [])

  const checkMyHorse = () => {
    if (horse?.owner?.id === currentUser?.id) return true
    else return false
  }

  const handleCareer = (career: Career) => {
    const totalRace = career.total_number_of_races
    const firstClass = career.first_count
    const secondClass = career.second_count
    const thirdClass = career.third_count
    const tltClass = (firstClass + secondClass + thirdClass) / totalRace
    const newTltClass = isNaN(tltClass) ? 0 : tltClass * 100
    const totalStatistic = `${totalRace} - ${firstClass}/${secondClass}/${thirdClass}`
    const winRateResult = `${Number.isInteger((firstClass / totalRace) * 100)
      ? (firstClass / totalRace) * 100
      : ((firstClass / totalRace) * 100).toFixed(2)
      }% - ${Number.isInteger(newTltClass) ? newTltClass : newTltClass.toFixed(2)}%`
    const handleWinRate = () => {
      let valueDisplay = ''
      if (totalRace === 0) {
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
    setCarrer(totalStatistic)
    setWinRate(handleWinRate())
  }

  // get time when access first room horse
  useEffect(() => {
    if (!horse) return
    if (horse.remaining_time_to_next_energy > 0) {
      const start_at = horse.remaining_time_to_next_energy
      setFirstTime(start_at)
    }
    setLevelUp(horse.level.exp_to_level_up - horse.level.total_exp)
    setExpCurrent(horse.level.exp_to_level_up)
    handleCareer(horse.career)
    setTotalExpHorse(horse.level.total_exp)
    setPoint(horse.stats_point_remain)
    setHorses(
      horse?.list_horse_stats.map(object => {
        return { ...object, count: 0 }
      })
    )
    setCanLevelUp(horse.level.can_level_up)
    setLevelHorse(horse.level)

    const fetchCareer = async () => {
      const params = { ...careerListParams, horseId: String(horse?.id) }
      const [error, careerResponse] = await handleAsyncRequest<ApiResponse<GetHorseCareerResponse>>(
        horseApi.getHorseCarrerList(params)
      )

      if (error) {
        console.log(error)
      }

      if (careerResponse) {
        const fetchedHorse = careerResponse.data.records
        setHorseCareerList(fetchedHorse)
      }
    }

    fetchCareer()
  }, [horse])

  // time waiting
  const timer = () => setFirstTime(firstTime - 1000)
  useEffect(() => {
    const id = setInterval(timer, 1000)
    if (firstTime > 0) {
      setDisableRecovery(true)
    }
    if (firstTime <= 0) {
      setDisableRecovery(false)
      clearInterval(id)
    }
    return () => clearInterval(id)
  }, [firstTime])

  const handleDecrease = useCallback(
    (stats: ListHorseStats) => {
      if (point < (horse?.stats_point_remain || 0)) {
        const newArr = params?.map(object => {
          if (stats.stats_type === object.stats_type) {
            setPoint(object.point > 0 ? point + 1 : point)
            setUsing(object.point > 0 ? using - 1 : using)
            return { ...object, point: object.point > 0 ? object.point - 1 : object.point }
          }
          return object
        })
        setParams(newArr)
        const newHorses = horses.map((obj: ListHorseStats) => {
          if (stats.stats_type === obj.stats_type && typeof obj?.count === 'number') {
            return { ...obj, count: obj.count ? obj?.count - 1 : obj.count }
          }
          return obj
        })
        setHorses(newHorses)
      }
    },
    [params, point]
  )

  const handleIncrease = useCallback(
    (stats: ListHorseStats) => {
      if ((stats.current_value + (stats?.count || 0)) >= 100) return
      if (point > 0) {
        const newArr = params?.map(object => {
          if (stats.stats_type === object.stats_type) {
            setPoint(point > 0 ? point - 1 : point)
            setUsing(using >= 0 ? using + 1 : using)
            return { ...object, point: object.point + 1 }
          }
          return object
        })
        setParams(newArr)

        const newHorses = horses.map(obj => {
          if (stats.stats_type === obj.stats_type && typeof obj?.count === 'number') {
            return { ...obj, count: obj?.count + 1 }
          }
          return obj
        })
        setHorses(newHorses)
      }
    },
    [params, point, horses]
  )

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false)
    }, TIME_CLOSE_STATS_MODAL)
  }, [animation])

  const handleConfirmModal = async () => {
    const paramsStats = params.filter((item: UpdateStatsParams) => item.point !== 0)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, result]: any = await handleAsyncRequest(horseApi.postUpdateStats(horseId, [...paramsStats]))
    if (result) {
      fetchHorse()
      setUsing(0)
      setParams(defaultParams)
      setAnimation(true)
      toast.success(
        <div>
          <div className='font-bold font-size-20'> {t(`${NOTIFICATION_MESSAGE}.congratulations`)}</div>{' '}
          <div className='body-content'>{t(`${NOTIFICATION_MESSAGE}.successfullyStats`)}</div>
        </div>,
        {
          position: 'bottom-right',
          autoClose: TIME_CLOSE_MODAL,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        }
      )
    }

    if (error) {
      setMessageError(error?.message || error?.errors[0]?.message)
      toggleIsModalResultHorseOpen(true)
    }
    handleCloseModal()
  }

  const handleCloseModal = () => {
    return toggleIsModalOpen(false)
  }

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + 5
    setCurrentItems(horseCareerList.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(horseCareerList.length / 5))
  }, [itemOffset, 5, horseCareerList])

  // Invoke when user click to request another page.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 5) % horseCareerList.length
    setItemOffset(newOffset)
  }

  const handlePickUpLevel = () => {
    setModalConfirmPickUpLevel(true)
  }

  const handleConfirmLevelUpModal = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, result]: any = await handleAsyncRequest(horseApi.postLevelUpHorse(horseId))
    if (result) {
      // useReloadCurrentPage()
      setAnimation(true)
      fetchHorse()
      const [, resultCoinUser] = await handleAsyncRequest(userApi.getUserItems())
      if (!resultCoinUser) return
      dispatch(setCoinUser(resultCoinUser.data))
      toast.success(
        <div>
          <div className='font-bold font-size-20'>{t(`${NOTIFICATION_MESSAGE}.congratulations`)}</div>{' '}
          <div className='body-content'>{t(`${NOTIFICATION_MESSAGE}.successfullyLeveledUp`)}</div>
        </div>,
        {
          position: 'bottom-right',
          autoClose: TIME_CLOSE_MODAL,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        }
      )
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error) {
      setMessageErrorLevelUp(error?.message || error?.errors[0]?.message)
      toggleIsModalResultHorseOpen(true)
    }
    handleCloseLevelUpModal()
  }

  const handleCloseLevelUpModal = () => {
    return setModalConfirmPickUpLevel(false)
  }

  const handleOk = () => {
    toggleIsModalResultHorseOpen(false)
  }

  const checkHorseActive = (active?: boolean) => {
    if (active === false) {
      return `class-tag`
    }
  }

  return (
    <HorseDetailStyled>
      {
        horse && <div className='horse-detail'>
          <div className='container-horse-detail'>
            <div className='horse-detail-box position-relative'>
              <div className='horse-detail-container d-flex flex-column flex-lg-row'>
                <div className='horse-detail-left'>
                  {animation && <Animation />}
                  <div className='left'>
                    <div className='name color-white font-bold text-uppercase d-block d-lg-none mb-4'> {horse?.name}</div>
                    <div className='background-container mb-4'>
                      <div className='background d-flex align-items-center justify-content-center'>
                        <img src={horse?.avatar} alt={horse?.name} className='avatar' />
                      </div>
                    </div>
                    {(horse?.owner?.id === currentUser?.id ||
                      (horse?.user?.id === currentUser?.id &&
                        horse?.own_status === LENDING_STATUS.Lending)) &&
                      (
                        <div className='energy-container d-flex justify-content-center'>
                          <EnergyBar
                            maxEnergy={horse?.max_energy || 100}
                            currentEnergy={horse?.current_energy || 0}
                            customClass='w-75'
                            firstTime={firstTime}
                            disableRecovery={disableRecovery}
                          />
                        </div>
                      )}
                  </div>
                </div>
                <div className='horse-detail-right flex-grow-1'>
                  <div className='right'>
                    <div className='name color-white d-flex align-items-center'>
                      <div>
                        {' '}
                        <div className='text-uppercase font-bold'> {horse?.name}</div>
                        {horse?.active === false ? (
                          <div className='d-flex justify-content-left color-red font-size-20 mt-2'>Disabled</div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className={`${checkHorseActive(horse?.active)}`}>
                        <ClassTag text={horse?.racing_class ?? ''} isActive={true} customClass='ms-3' />
                      </div>
                      {
                        (horse.own_status === LENDING_STATUS.Lending && horse.user) ?
                          <div className='icon-borrow ms-3'>
                            <img src={ICON_BORROW} alt='' width={55} />
                          </div> : ''
                      }
                    </div>
                    <div className='my-avatar '>
                      <img src='' alt='' className='my-img' />
                      <span className='color-white myName text-uppercase'>
                        {t(`${NOTIFICATION_MESSAGE}.owner`)}: {hanldeHorseOwnerName(horse)}
                      </span>
                    </div>
                    <div className='attribute-container row gy-4 mt-2'>
                      <div className='col-6 col-xl-4'>
                        <AttributeBox
                          title='Bloodline'
                          value={capitalizeOnlyFirstLetter(horse?.bloodline.name ?? 'none')}
                        />
                      </div>
                      <div className='col-6 col-xl-4'>
                        <AttributeBox title='Gender' value={capitalizeOnlyFirstLetter(horse?.gender ?? '')} />
                      </div>
                      <div className='col-6 col-xl-4'>
                        <AttributeBox title='Color' value={capitalizeOnlyFirstLetter(horse?.bloodline.color ?? '')} />
                      </div>
                    </div>
                    <div className='attribute-container row gy-4'>
                      <div className='col-6 col-xl-4'>
                        <AttributeBox title='Characteristic' value={horse?.characteristic_display ?? ''} />
                      </div>
                      <div className='col-6 col-xl-4'>
                        <AttributeBox title='Runtype' value={horse?.run_type ?? ''} />
                      </div>
                    </div>
                    <div className='ability-container row gy-4'>
                      {horse?.list_horse_ability.map(skill => (
                        <div className='col-12 col-sm-6' key={skill.id}>
                          <AbilityBox name={skill.name_en} level={skill.level} customClass="custom-bottom-frame" />
                        </div>
                      ))}
                    </div>
                    {checkMyHorse() && (
                      <div className='point-stats d-flex justify-content-between'>
                        <div className='point'>
                          {t(`${NOTIFICATION_MESSAGE}.point`)}: {point}
                        </div>
                        <div className='using'>
                          {t(`${NOTIFICATION_MESSAGE}.using`)}: {using}
                        </div>
                      </div>
                    )}
                    <div className='level-stats-container d-flex'>
                      {checkMyHorse() && (
                        <div className='level-container'>
                          <div className='level-bg d-flex align-items-center justify-content-center position-relative'>
                            {((horse?.level?.level || 0) < MAX_HORSE_LEVEL) ?
                              (<div className='pick-up-level'>
                                {(canLevelUp === true && horse?.own_status !== LENDING_STATUS.Lending) ? (
                                  <img src={ENABLE_LEVEL_PLUS} alt='' onClick={handlePickUpLevel} className='blink-me' />
                                ) : (
                                  <img src={DISABLE_LEVEL_PLUS} alt='' />
                                )}
                              </div>) : ''
                            }

                            <div className='level font-bold color-white'>{horse?.level.level}</div>
                            <div className='level-text color-yellow font-bold position-absolute'>Lv.</div>
                          </div>
                          <div className='position-absolute info-dropdown'>
                            <div className='popup-exp'>
                              <img src={POPUP_EXP} alt='' />
                            </div>
                          </div>
                          <div className='position-absolute energy-exp-bar'>
                            <EnergyExpBar
                              maxEnergy={expCurrent || 100}
                              currentExp={totalExpHorse || 0}
                              customClass='w-100'
                            />
                          </div>
                          <div className='position-absolute energy-text-horse-detail color-grey'>
                            <span className='current-exp'>{`${totalExpHorse}`}</span>
                            <span>{`/${expCurrent}`}</span>
                          </div>
                          <div className='position-absolute level-up'>
                            <span className='color-white'>
                              {totalExpHorse >= expCurrent ? horse?.level.level === 20 ? (
                                t(`${NOTIFICATION_MESSAGE}.maxLevel`)
                              ) : (
                                t(`${NOTIFICATION_MESSAGE}.canLevelUp`)
                              ) : (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: t(`${NOTIFICATION_MESSAGE}.needToLevelUp`, { levelUp })
                                  }}
                                />
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className='stats-container flex-column flex-grow-1 pb-4'>
                        {horses
                          ?.sort((a, b) => (statsType.indexOf(a.stats_type) > statsType.indexOf(b.stats_type) ? 1 : -1))
                          .map(stats => (
                            <StatsBar
                              listHorsesStats={horsesStats}
                              key={stats.stats_type}
                              statsType={stats.stats_type}
                              statsRank={stats.stat_rank}
                              currentValue={stats.current_value}
                              onDecrease={() => handleDecrease(stats)}
                              onIncrease={() => handleIncrease(stats)}
                              count={stats?.count}
                              point={point}
                              // isMyHorse={false}
                              isMyHorse={checkMyHorse()}
                              horseStatus={horse?.own_status}
                            />
                          ))}
                      </div>
                    </div>
                    {checkMyHorse() && (
                      <div className='d-flex justify-content-end btn-save'>
                        <Button
                          buttonName='Save'
                          onClickButton={() => toggleIsModalOpen(true)}
                          disabled={point === horse?.stats_point_remain}
                        />
                      </div>
                    )}
                    {messageError && <div className='color-red d-flex justify-content-end'> {messageError} </div>}
                  </div>
                </div>
              </div>
            </div>
            <div className='horse-career-container'>
              <div className='horse-career-title d-flex'>
                <OneLineTitleClone text='Career' customClass='title career' contentClass='mt-2' value={carrer} />
                <OneLineTitleClone text='Win rates' customClass='title win-rates' contentClass='mt-2' value={winRate} />
              </div>
              <div className='horse-career'>
                <table className='horse-career-table w-100'>
                  {horseCareerList.length > 0 ? (
                    // <div className='d-flex header-horse text-uppercase'>
                    <thead>
                      <tr>
                        {headerRaces.map((name, index) => (
                          <th key={index} className={`header-name ${index === 0 ? 'ps-4' : ''}`}>
                            {name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  ) : (
                    // </div>
                    ''
                  )}
                  <tbody>
                    {currentItems.map(career => (
                      <HorseCareerItem key={career.race_horses_id} career={career} />
                    ))}
                  </tbody>
                </table>
              </div>
              {currentItems.length > 0 && horseCareerList.length > 5 && (
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
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      }
      {isOpenModalConfirmPickUpLevel && (
        <HourseModalConfirmLevelUp
          onConfirm={handleConfirmLevelUpModal}
          onCloseButtonClick={handleCloseLevelUpModal}
          levelHorse={levelHorse}
          subAvatar={horse?.sub_avatar}
          remainingTimeToNextEnergy={horse?.remaining_time_to_next_energy as number}
        />
      )}

      {isModalResultHorseOpen && (
        <ResultHorseModal title={'failed!'} onOk={handleOk} message={messageErrorLevelUp} exchangeCoin={true} />
      )}

      {isModalOpen && <HorseModalConfirm onConfirm={handleConfirmModal} onCloseButtonClick={handleCloseModal} />}
    </HorseDetailStyled>
  )
}

export default HorseDetail
