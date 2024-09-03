import AbilityBoxStyled from './styled'
import { NEXT_RACE_BOTTOM_FRAME } from 'assets/images'
import classNames from 'classnames'
import { RateStar } from 'features/Horse/components'
import { useCallback } from 'react'

interface AbilityBoxProps {
  customClass?: string
  name: string
  level?: number
}

function AbilityBox({ customClass = '', name, level = 1 }: AbilityBoxProps) {
  const abilityBoxClass = classNames('position-relative', customClass)

  const generateRateLevel = useCallback(
    (maxLevel: number, currentLevel: number): JSX.Element[] => {
      const rateStars: JSX.Element[] = []

      for (let i = 0; i < maxLevel; i++) {
        rateStars.push(<RateStar key={i} isActive={i < currentLevel} />)
      }

      return rateStars
    },
    [level]
  )

  const rateLevel = generateRateLevel(3, level)

  return (
    <AbilityBoxStyled className={abilityBoxClass}>
      <div className='ability-box-container'>
        <div className='ability-box d-flex justify-content-between align-items-center'>
          <div className='title color-white'>{name}</div>
          <div className='level d-flex'>{rateLevel}</div>
        </div>
      </div>
      <img src={NEXT_RACE_BOTTOM_FRAME} alt='' className='position-absolute bottom-frame d-none d-xl-inline-block' />
    </AbilityBoxStyled>
  )
}

export default AbilityBox
