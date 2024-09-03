import { useState, useEffect } from 'react'
import { Career, Horse } from 'models'
import HorseCareerWinRatesStyled from './styled'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'
import { ClassTag } from 'shared'

interface HorseCareerWinRatesProps {
  horse: Horse
  isLending?: boolean
}
function HorseCareerWinRates({ horse, isLending }: HorseCareerWinRatesProps) {
  const { t } = useTranslation()
  const [winRate, setWinRate] = useState<string>('')
  const [carrer, setCarrer] = useState<string>('')


  const handleCareer = (career: Career) => {
    const totalRace = career?.total_number_of_races
    const firstClass = career?.first_count
    const secondClass = career?.second_count
    const thirdClass = career?.third_count
    const tltClass = (firstClass + secondClass + thirdClass) / totalRace
    const newTltClass = isNaN(tltClass) ? 0 : tltClass * 100
    const totalStatistic = `${totalRace} ${firstClass}/${secondClass}/${thirdClass}`
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

  useEffect(() => {
    handleCareer(horse?.career)
  }, [])


  return (
    <HorseCareerWinRatesStyled>
      {horse && (
        <div className='infor-horse row'>
          <div className='carrer col-4'>
            <div className='color-career'>{t(`${NOTIFICATION_MESSAGE}.career`)}</div>
            <div className='carrer-detail'>
              <span className='total'>{carrer.split(' ').shift()}</span>
              <span className='color-white'>{` - ${carrer.split(' ').pop()}`}</span>
            </div>
          </div>
          <div className='win-rates col-4'>
            <div className='color-win-rates'>{t(`${NOTIFICATION_MESSAGE}.winRates`)}</div>
            <span className='color-white win-rates-count'>{winRate}</span>
          </div>
          {
            isLending && (
              <div className='class col-4'>
                <div className='color-class'>{t(`${NOTIFICATION_MESSAGE}.class`)}</div>
                <ClassTag text={horse?.racing_class ?? ''} isActive={true} />
              </div>)
          }

        </div>
      )}
    </HorseCareerWinRatesStyled>
  )
}

export default HorseCareerWinRates
