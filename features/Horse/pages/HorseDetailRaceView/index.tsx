import horseApi from 'apis/horseApi'
import { POPUP_EXP } from 'assets/images'
import { AbilityBox, AttributeBox, EnergyBar, HorseCareerItem } from 'features/Horse/components'
import EnergyExpBar from 'features/Horse/components/EnergyExpBar'
import StatsBarRaceView from 'features/Horse/components/StatsBarRaceView'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import {
  ApiResponse,
  Career,
  CurrentUser,
  GetHorseCareerListParams,
  GetHorseCareerResponse,
  Horse,
  HorseCareer,
  ListHorseStats
} from 'models'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactPaginate from 'react-paginate'
import { useParams } from 'react-router-dom'
import OneLineTitleClone from 'shared/OneLineTitleClone'
import { checkFormatId, handleAsyncRequest } from 'utils/helper'
import { getCurrentUser } from 'utils/metamask'
import HorseDetailRaceViewStyled from './styled'

const careerListParams: Omit<GetHorseCareerListParams, 'horseId'> = {
  limit: 999999,
  page: 1,
  sort: ['created-desc']
}

const statsType = ['SPEED', 'MUSCLE', 'STAMINA', 'ACCURACY', 'SPIRIT', 'IQ']

function HorseDetailRaceView() {
  const { token_id } = useParams<string>()
  const { raceId } = useParams<string>()
  const [currentUser, setCurrentUser] = useState<CurrentUser>()
  const [horseCareerList, setHorseCareerList] = useState<HorseCareer[]>([])
  const [horse, setHorse] = useState<Horse>()

  const [firstTime, setFirstTime] = useState(0)
  const [disableRecovery, setDisableRecovery] = useState<boolean>(false)
  const [levelUp, setLevelUp] = useState<number>(0)
  const [winRate, setWinRate] = useState<string>('')
  const [carrer, setCarrer] = useState<string>('')
  const [totalExpHorse, setTotalExpHorse] = useState<number>(0)
  const [horses, setHorses] = useState<ListHorseStats[]>([])
  const [expCurrent, setExpCurrent] = useState<number>(0)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [currentItems, setCurrentItems] = useState<HorseCareer[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    checkFormatId(token_id || '')
    const fetchHorse = async () => {
      const [error, horseResponse] = await handleAsyncRequest<ApiResponse<Horse>>(
        horseApi.getHorseDetailRaceView(String(token_id), String(raceId))
      )

      if (error) {
        console.log(error)
      }

      if (horseResponse) {
        const fetchedHorse = horseResponse.data
        setHorse(fetchedHorse)
      }
    }

    fetchHorse()
  }, [token_id])

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const [, currentUser] = await handleAsyncRequest(getCurrentUser())
      setCurrentUser(currentUser)
    }

    fetchCurrentUser()
  }, [])

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
    setHorses(horse?.list_horse_stats)
    setHorses(
      horse?.list_horse_stats.map(object => {
        return { ...object, count: 0 }
      })
    )

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

  return (
    <HorseDetailRaceViewStyled>
      <div className='horse-detail'>
        <div className='container-horse-detail'>
          <div className='horse-detail-box position-relative'>
            <div className='horse-detail-container d-flex flex-column flex-lg-row'>
              <div className='horse-detail-left'>
                <div className='left'>
                  <div className='name color-white font-bold text-uppercase d-block d-lg-none mb-4'>{horse?.name}</div>
                  <div className='background-container mb-4'>
                    <div className='background d-flex align-items-center justify-content-center'>
                      <img src={horse?.avatar} alt={horse?.name} className='avatar' />
                    </div>
                  </div>
                  {horse?.user?.id === currentUser?.id ? (
                    <div className='energy-container d-flex justify-content-center'>
                      <EnergyBar
                        maxEnergy={horse?.max_energy || 100}
                        currentEnergy={horse?.current_energy || 0}
                        customClass='w-75'
                        firstTime={firstTime}
                        disableRecovery={disableRecovery}
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className='horse-detail-right flex-grow-1'>
                <div className='right'>
                  <div className='name color-white font-bold text-uppercase d-none d-lg-block'>{horse?.name}</div>
                  <div className='my-avatar '>
                    <img src='' alt='' className='my-img' />
                    <span className='color-white myName text-uppercase'>{t(`${NOTIFICATION_MESSAGE}.owner`)}: {horse?.user?.name}</span>
                  </div>
                  {/* <div className='attribute-container row gy-4 mt-2'>
                    <div className='col-6 col-xl-4'>
                      <AttributeBox
                        title='Bloodline'
                        value={capitalizeOnlyFirstLetter(horse?.bloodline?.name ?? 'none')}
                      />
                    </div>
                    <div className='col-6 col-xl-4'>
                      <AttributeBox title='Gender' value={capitalizeOnlyFirstLetter(horse?.gender ?? '')} />
                    </div>
                    <div className='col-6 col-xl-4'>
                      <AttributeBox title='Color' value={capitalizeOnlyFirstLetter(horse?.bloodline.color ?? '')} />
                    </div>
                  </div> */}
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
                        <AbilityBox name={skill.name_en} level={skill.level} />
                      </div>
                    ))}
                  </div>
                  <div className='level-stats-container d-flex'>
                    <div className='level-container'>
                      <div className='level-bg d-flex align-items-center justify-content-center position-relative'>
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
                      <div className='position-absolute energy-text color-grey mr-auto'>
                        <span className='current-exp'>{`${totalExpHorse}`}</span>
                        <span>{`/${expCurrent}`}</span>
                      </div>
                      <div className='position-absolute level-up'>
                        <span className='color-white'>{t(`${NOTIFICATION_MESSAGE}.needToLevelUp`, { levelUp })}</span>
                      </div>
                    </div>
                    <div className='stats-container flex-column flex-grow-1 pb-4'>
                      {horses
                        ?.sort((a, b) => (statsType.indexOf(a.stats_type) > statsType.indexOf(b.stats_type) ? 1 : -1))
                        .map(stats => (
                          <StatsBarRaceView
                            key={stats.stats_type}
                            statsType={stats.stats_type}
                            statsRank={stats.stat_rank}
                            currentValue={stats.current_value}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='horse-career-container'>
            <div className='horse-career-title d-flex'>
              <OneLineTitleClone text='Career' customClass='title career' value={carrer} />
              <OneLineTitleClone text='Win rates' customClass='title win-rates' value={winRate} />
              <OneLineTitleClone text='Class' customClass='title class' value={horse?.racing_class.slice(-1)} />
            </div>
            <div className='horse-career'>
              {horseCareerList.length > 0 ? (
                <div className='d-flex header-horse text-uppercase'>
                  <span className='time'>{t(`${NOTIFICATION_MESSAGE}.time`)}</span>
                  <span className='race-name'>{t(`${NOTIFICATION_MESSAGE}.raceName`)}</span>
                  <span className='race-course'>{t(`${NOTIFICATION_MESSAGE}.raceCourse`)}</span>
                  <span className='class'>{t(`${NOTIFICATION_MESSAGE}.class`)}</span>
                  <span className='filed-type'>{t(`${NOTIFICATION_MESSAGE}.fieldType`)}</span>
                  <span className='distance'>{t(`${NOTIFICATION_MESSAGE}.distance`)}</span>
                  <span className='rank'>{t(`${NOTIFICATION_MESSAGE}.rank`)}</span>
                  <span className='entry-fee'>{t(`${NOTIFICATION_MESSAGE}.entryFee`)}</span>
                  <span className='race-pool'>{t(`${NOTIFICATION_MESSAGE}.racePool`)}</span>
                </div>
              ) : (
                ''
              )}
              <table className='horse-career-table w-100'>
                <tbody>
                  {currentItems.map(career => (
                    <HorseCareerItem key={career.race_horses_id} career={career} />
                  ))}
                </tbody>
              </table>
            </div>
            {currentItems.length > 5 && (
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
    </HorseDetailRaceViewStyled>
  )
}

export default HorseDetailRaceView
