import { useState, useEffect } from 'react'
import { FEMALE_ICON, LEVEL_UP, MALE_ICON } from 'assets/images'
import _ from 'lodash'
import { LendingHorse, LendingHorseInfo, LENDING_STATUS } from 'models'
import EnergyBar from '../EnergyBar'
import HorseAvatarStyled from './styled'
import dayjs from 'dayjs'
import { convert_status_lending } from 'utils/helper';
interface HorseAvatarProps {
  horse: LendingHorse
  lendingInfo?: LendingHorseInfo
}

function HorseAvatar({ horse, lendingInfo }: HorseAvatarProps) {
  const [firstTime, setFirstTime] = useState(0)
  const [disableRecovery, setDisableRecovery] = useState<boolean>(false)

  useEffect(() => {
    if (horse.remaining_time_to_next_energy > 0) {
      const start_at = horse.remaining_time_to_next_energy
      setFirstTime(start_at)
    }
  }, [horse])

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
  return (
    <HorseAvatarStyled>
      {!_.isEmpty(horse) &&
        <div className='horse-container'>
          <div className='top-horse'>
            <div className='horse'>
              <div className='horse-info'>
                <div className='horse-name'>
                  {horse.name}
                </div>
                <span className='horse-gender'>
                  <img className='icon-gender' width={30} src={horse.gender === "MALE" ? MALE_ICON : FEMALE_ICON} />
                </span>
                <div className='horse-lending'>
                  {convert_status_lending(lendingInfo?.lending_status)}

                  {lendingInfo?.lending_status === LENDING_STATUS.Available && 
                    <div className='horse-level'>
                      <img src={LEVEL_UP} alt='' />
                      <span className={`horse-level-number ${horse?.level?.level.toString().length > 1 ? 'level-length' : ''}`}>{horse?.level?.level}</span>
                    </div>
                  }
                
                </div>
              </div>
            </div>
          </div>
          <div className='background-container mb-2'>
            <div className='background'>
              <div>
                <img src={horse.avatar} alt={horse.name} className='avatar' />
              </div>
            </div>
          </div>
          <div className='energy-container'>
            <EnergyBar
              maxEnergy={horse?.max_energy || 100}
              currentEnergy={horse?.current_energy || 0}
              firstTime={firstTime}
              disableRecovery={disableRecovery}
            />
          </div>

          {
            lendingInfo?.start_date &&
            <div className='time-container'>
              <div className='time'>
                <div className='title'> Start At: </div>
                {/* <div className='day-time'> {lendingInfo?.start_date} </div> */}
                <div className='day-time'>
                  {dayjs(lendingInfo?.start_date * 1000).format('MM/DD/YYYY')}{' '}
                  {dayjs(lendingInfo?.start_date * 1000).format('HH:mm:ss')}
                </div>
              </div>
              <div className='time'>
                <div className='title'> End At: </div>
                <div className='day-time'>
                  {dayjs(lendingInfo?.end_date * 1000).format('MM/DD/YYYY')}{' '}
                  {dayjs(lendingInfo?.end_date * 1000).format('HH:mm:ss')}
                </div>
              </div>
            </div>
          }

        </div>
      }

    </HorseAvatarStyled >
  )
}

export default HorseAvatar
