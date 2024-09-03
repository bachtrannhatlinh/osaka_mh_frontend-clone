import { useCallback } from 'react'

import { RankHorse, StepHorse } from 'models'
import { ordinalSuffixOf } from 'utils/helper'
import HorseRankBox from '../HorseRankBox'
import HorseRankListStyled from './styled'

interface HorseRankListProps {
  horses: StepHorse[]
  sortingRankHorseList: RankHorse[]
}

const HORSE_NUMBER_IN_RACE = 12

function HorseRankList({ horses, sortingRankHorseList }: HorseRankListProps) {
  const generateRankNumber = useCallback((): number[] => {
    const rankNumberList: number[] = []
    for (let i = 1; i <= HORSE_NUMBER_IN_RACE; i++) {
      rankNumberList.push(i)
    }
    return rankNumberList
  }, [])

  const getHorseRankFromSortingList = useCallback(
    (index: number): number | undefined => {
      const horseRank = sortingRankHorseList.findIndex(horse => index === horse.horseIndex)

      return horseRank === -1 ? undefined : horseRank
    },
    [sortingRankHorseList]
  )

  return (
    <HorseRankListStyled className='d-flex'>
      <div className='rank-list-container d-flex flex-column'>
        {generateRankNumber().map(rank => (
          <div key={rank} className='rank-box d-flex align-items-center'>
            <span className='rank color-white font-bold d-inline-block'>{ordinalSuffixOf(rank)}</span>
          </div>
        ))}
      </div>
      <div className='horse-list-container position-relative'>
        {horses.map((horse, index) => (
          <HorseRankBox
            gate={index + 1}
            key={horse.id}
            horseName={horse.name}
            subAvatar={horse?.sub_avatar || horse?.subAvatar}
            currentRank={getHorseRankFromSortingList(index) ?? index}
            ownerId={horse.owner?.id}
          />
        ))}
      </div>
    </HorseRankListStyled>
  )
}

export default HorseRankList
