import horseApi from 'apis/horseApi'
import { links } from 'apps'
import { CLOSE_BTN, ICON_BORROW, LEVEL_UP } from 'assets/images'
import { EnergyBar } from 'features/Horse/components'
import { useToggle } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { ApiResponse, Horse, LENDING_STATUS } from 'models'
import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ClassTag, Modal } from 'shared'
import { handleAsyncRequest, hanldeHorseOwnerName } from 'utils/helper'
import HorseBodyInfo from '../HorseBodyInfo'
import HorseModalStyled from './styled'

interface HorseModalProps {
  token_id: number
  onOverlayClick?: () => void
  onCloseButtonClick?: () => void
  myName: string | number
  atProfile: boolean
}


function HorseModal({ token_id, onOverlayClick, onCloseButtonClick, myName, atProfile }: HorseModalProps) {
  const [horse, setHorse] = useState<Horse>()
  const [isLoading, setIsLoading] = useToggle(false)
  const [firstTime, setFirstTime] = useState(0)
  const [disableRecovery, setDisableRecovery] = useState<boolean>(false)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchHorse = async () => {
      setIsLoading(true)

      const [error, horseResponse] = await handleAsyncRequest<ApiResponse<Horse>>(
        horseApi.getHorseDetailByTokenId({ token_id })
      )

      if (error) {
        console.log(error)
      }

      if (horseResponse) {
        const fetchedHorse = horseResponse.data
        setHorse(fetchedHorse)
      }

      setIsLoading(false)
    }

    fetchHorse()
  }, [token_id])

  // get time when access first room horse
  useEffect(() => {
    if (horse && horse?.remaining_time_to_next_energy > 0) {
      const start_at = horse?.remaining_time_to_next_energy
      setFirstTime(start_at)
    }
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

  const checkHorseActive = (active: boolean) => {
    if (active === false) {
      return `class-tag`
    }
  }

  const checkHorseActiveLevelup = (active: boolean) => {
    if (active === false) {
      return `level-up-disable`
    }
    return `level-up`
  }

  const checkHorseOwner = () => {
    if (!horse?.owner) {
      if (horse?.user?.id === myName || horse?.user?.name === myName) return true
    }
    if (horse?.owner?.id === myName || horse?.owner?.name === myName) return true
    else return false
  }

  return (
    <Modal onOverlayClick={onOverlayClick}>
      <HorseModalStyled>
        {horse && !isLoading && (
          <Fragment>
            <button className='close-btn p-0 position-absolute' role='button' onClick={onCloseButtonClick}>
              <img src={CLOSE_BTN} alt='close' />
            </button>
            <div className='quick-view'>
              <div className='container'>
                <div className='quick-view-box position-relative'>
                  <div className='quick-view-container d-flex flex-column flex-lg-row align-items-lg-center'>
                    <div className='quick-view-left'>
                      <div className='left'>
                        <div className='name color-white font-bold text-uppercase d-block d-lg-none mb-4'>
                          {horse.name}
                        </div>
                        <div className='background-container mb-2'>
                          <div className='background d-flex align-items-center justify-content-center'>
                            <Link to={atProfile ? links.horse.detail(token_id) : ''}>
                              <img src={horse.avatar} alt={horse.name} className='avatar' />
                            </Link>
                          </div>
                        </div>

                        <div className='energy-container'>
                          {horse?.user?.name === myName || horse?.user?.id === myName ? (
                            <EnergyBar
                              maxEnergy={horse.max_energy}
                              currentEnergy={horse.current_energy}
                              customClass='custom-energy mx-auto'
                              firstTime={firstTime}
                              disableRecovery={disableRecovery}
                            />
                          ) : (
                            ''
                          )}
                        </div>
                        {atProfile && (
                          <div className='d-flex justify-content-center'>
                            <div className='detail-btn-container align-items-center mt-4'>
                              <Link to={atProfile ? links.horse.detail(token_id) : ''}>
                                <button className='detail-btn font-bold w-100 h-100'>
                                  <span className='color-primary'>{t(`${NOTIFICATION_MESSAGE}.details`)}</span>
                                </button>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='quick-view-right'>
                      <div className='right'>
                        <div className='d-flex right-title'>
                          <div className='title'>
                            <div className='name color-white d-flex align-items-center'>
                              <div className='block-content'>
                                <div className='text-uppercase font-bold'> {horse.name}</div>
                                {horse.active === false ? (
                                  <div className='d-flex justify-content-left color-red font-size-20 mt-2'>
                                    Disabled
                                  </div>
                                ) : (
                                  ''
                                )}
                              </div>
                              <div className={`${checkHorseActive(horse.active)}`}>
                                <ClassTag text={horse?.racing_class ?? ''} isActive={true} customClass='ms-3' />
                              </div>
                              {
                                checkHorseOwner() ?
                                  <div className={`${checkHorseActiveLevelup(horse.active)}`}>
                                    <img src={LEVEL_UP} alt='' width={50} />
                                    <span className={`color-white text-uppercase ${horse.level.level.toString().length > 1 ? 'horse-level' : ''}`}>{horse.level.level} </span>
                                  </div> : ''
                              }
                              {
                                (horse.own_status === LENDING_STATUS.Lending && horse.user) ?
                                  <div className='icon-borrow ms-3'>
                                    <img src={ICON_BORROW} alt='' width={55} />
                                  </div> : ''
                              }
                            </div>
                            <div className='name-user color-white text-uppercase'>
                              {t(`${NOTIFICATION_MESSAGE}.owner`)}: {hanldeHorseOwnerName(horse)}
                            </div>
                          </div>
                        </div>
                        <HorseBodyInfo horse={horse} customClass="custom-bottom-frame" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </HorseModalStyled>
    </Modal>
  )
}

export default HorseModal
