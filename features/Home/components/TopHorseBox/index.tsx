import {
  LEFT_MIDDLE_BAR,
  RIGHT_MIDDLE_BAR,
  TOP_COUNT_BRONZE_MEDAL,
  TOP_COUNT_GOLD_MEDAL,
  TOP_COUNT_SLIVER_MEDAL,
  TOP_HORSE_FIRST_LEFT_FRAME,
  TOP_HORSE_FIRST_RIGHT_FRAME,
  TOP_HORSE_LEFT_STICK_BRONZE,
  TOP_HORSE_LEFT_STICK_GOLD,
  TOP_HORSE_LEFT_STICK_SLIVER,
  TOP_HORSE_RIGHT_STICK_BRONZE,
  TOP_HORSE_RIGHT_STICK_GOLD,
  TOP_HORSE_RIGHT_STICK_SLIVER,
  TOP_HORSE_SECOND_LEFT_FRAME_SLIVER,
  TOP_HORSE_SECOND_RIGHT_FRAME_SLIVER
} from 'assets/images'
import { useGetRankInfo } from 'features/Home/hooks/'
import { Options, TopHorse } from 'models'
import { useEffect, useRef } from 'react'
import { shortenUserName } from 'utils/helper'
import VanillaTilt from 'vanilla-tilt'
import TopHorseBoxStyled from './styled'

interface TopHorseBoxProps {
  horse: TopHorse
  selfIndex: number
  customClass?: string
  options: Options
}

enum Rank {
  FIRST = '1st',
  SECOND = '2nd',
  THIRD = '3rd'
}

function TopHorseBox({ horse, selfIndex, customClass = '', options }: TopHorseBoxProps) {
  const { circle, crown, position } = useGetRankInfo(selfIndex)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tilt = useRef<HTMLElement | any>(null)

  useEffect(() => {
    VanillaTilt.init(tilt.current, options)
  }, [options])

  return (
    <TopHorseBoxStyled circle={circle} position={position} className={customClass}>
      <div className='top-horse d-flex flex-column align-items-center mx-auto position-relative' ref={tilt}>
        <img
          src={
            (position === Rank.FIRST && TOP_HORSE_LEFT_STICK_GOLD) ||
            (position === Rank.SECOND && TOP_HORSE_LEFT_STICK_SLIVER) ||
            (position === Rank.THIRD && TOP_HORSE_LEFT_STICK_BRONZE) ||
            ''
          }
          className='left-stick position-absolute d-none d-md-inline-block'
        />
        <img
          src={
            (position === Rank.FIRST && TOP_HORSE_RIGHT_STICK_GOLD) ||
            (position === Rank.SECOND && TOP_HORSE_RIGHT_STICK_SLIVER) ||
            (position === Rank.THIRD && TOP_HORSE_RIGHT_STICK_BRONZE) ||
            ''
          }
          className='right-stick position-absolute d-none d-md-inline-block'
        />
        <img src={TOP_HORSE_FIRST_LEFT_FRAME} className='first-left-frame position-absolute' />
        <img src={TOP_HORSE_FIRST_RIGHT_FRAME} className='first-right-frame position-absolute' />
        <img src={TOP_HORSE_SECOND_LEFT_FRAME_SLIVER} className='second-left-frame position-absolute' />
        <img src={TOP_HORSE_SECOND_RIGHT_FRAME_SLIVER} className='second-right-frame position-absolute' />
        <div className='avatar-container d-flex align-items-center justify-content-center'>
          <img src={horse.sub_avatar} alt={horse.horse_name} className='avatar' />
        </div>
        <div className='rank-container d-flex flex-column align-items-center'>
          <img src={crown} alt='' className='crown' />
          <div className='rank color-white font-bold'>{position}</div>
        </div>
        <div className='info-container text-center'>
          <div className='horse-name color-white font-bold'>{horse.horse_name.toUpperCase()}</div>
          <div className='owner-name color-grey'>{shortenUserName(horse.owner)}</div>
        </div>
        <div className='d-flex achievement text-center color-white font-bold my-1'>
          <div className='title d-flex align-items-center'>
            <span></span>
            <img src={LEFT_MIDDLE_BAR} alt='total race' className='img-achievement' />
          </div>
          <div className='times total-races mx-3'>{horse.total_number_of_races}</div>
          <div className='title d-flex align-items-center'>
            <span></span>
            <img src={RIGHT_MIDDLE_BAR} alt='total race' className='img-achievement' />
          </div>
        </div>
        <div className='achievement-container d-flex'>
          <div className='achievement text-center color-white font-bold'>
            <div className='title d-flex align-items-center'>
              <img src={TOP_COUNT_GOLD_MEDAL} alt='1' />
            </div>
            <div className='times'>{horse.first_count}</div>
          </div>
          <div className='achievement text-center color-white font-bold'>
            <div className='title d-flex align-items-center'>
              <img src={TOP_COUNT_SLIVER_MEDAL} alt='2' />
            </div>
            <div className='times'>{horse.second_count}</div>
          </div>
          <div className='achievement text-center color-white font-bold'>
            <div className='title d-flex align-items-center'>
              <img src={TOP_COUNT_BRONZE_MEDAL} alt='3' />
            </div>
            <div className='times'>{horse.third_count}</div>
          </div>
        </div>
      </div>
    </TopHorseBoxStyled>
  )
}

export default TopHorseBox
