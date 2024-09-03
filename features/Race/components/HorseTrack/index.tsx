import { useCallback, useEffect, useState } from 'react'

import { Gate, RankHorse, StepHorse } from 'models'
import HorseTrackStyled, { HorseAvatarStyled, TrackListTransLate } from './styled'
import classNames from 'classnames'
import { useAppSelector } from 'hooks'
import { SPEED_UP } from 'apps/constants'

interface HorseTrackProps {
  horse: StepHorse
  distance: number
  gateNumber: number
  milestoneNumber: number
  rankHorse: RankHorse
  trackListTranslate: number
  isRaceEnd: boolean
  raceResult?: Gate[]
}

function HorseTrack({
  horse,
  distance,
  gateNumber,
  milestoneNumber,
  rankHorse,
  trackListTranslate,
  isRaceEnd,
  raceResult
}: HorseTrackProps) {
  const [distanceHorseMoved, setDistanceHorseMoved] = useState<number>(0)
  const [isHovering, setIsHovering] = useState(false)

  const generateMilestones = useCallback(() => {
    const milestoneList: JSX.Element[] = []

    for (let i = 0; i < milestoneNumber; i++) {
      const milestone = <div className='milestone-block' key={i} />

      milestoneList.push(milestone)
    }

    return milestoneList
  }, [distance])

  useEffect(() => {
    if (!rankHorse) return
    setDistanceHorseMoved(rankHorse.step?.d * SPEED_UP)
  }, [rankHorse])

  const profile = useAppSelector(state => state.profile)

  const isActive = horse?.owner?.id === profile?.id

  const ratingProcessing = (id: number) => {
    const rank = raceResult?.find(item => item?.horse?.id === id)
    if (rank?.race_position) {
      switch (parseInt(rank.race_position)) {
        case 1:
          return 'first-rank'
        case 2:
          return 'second-rank'
        case 3:
          return 'third-rank'
        default:
          return ''
      }
    }
  }

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }

  return (
    <HorseTrackStyled
      className={classNames([isActive && 'active', isRaceEnd && ratingProcessing(horse.id)])}
      distance={distance}
    >
      <div
        className={classNames([
          'horse-track d-flex align-items-center position-relative',
          isActive && 'horse-track-active',
          isRaceEnd && ratingProcessing(horse.id) + '-track'
        ])}
      >
        <TrackListTransLate trackListTranslate={trackListTranslate}>
          <div className='gate-container d-flex align-items-center justify-content-center'>
            <div className='gate-number font-bold color-white'>{gateNumber}</div>
          </div>
        </TrackListTransLate>
        <div className='milestone-list-container position-absolute w-100 d-flex'>{generateMilestones()}</div>
        <HorseAvatarStyled
          src={horse.avatar}
          alt={horse.name}
          className={`position-absolute ${isHovering && `horse-active-${gateNumber}`}`}
          distanceHorseMoved={distanceHorseMoved}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      </div>
    </HorseTrackStyled>
  )
}

export default HorseTrack
