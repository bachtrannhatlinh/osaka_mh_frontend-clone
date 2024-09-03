import {
  AVATAR_DEFAULT,
  LEFT_MIDDLE_BAR,
  RIGHT_MIDDLE_BAR,
  TOP_COUNT_BRONZE_MEDAL,
  TOP_COUNT_GOLD_MEDAL,
  TOP_COUNT_SLIVER_MEDAL
} from 'assets/images'
import { useGetRankInfo } from 'features/Home/hooks'
import { Options, TopStable } from 'models'
import { useEffect, useRef } from 'react'
import { shortenUserName } from 'utils/helper'
import VanillaTilt from 'vanilla-tilt'
import TopStableBoxStyled from './styled'

interface TopStableBoxProps {
  stable: TopStable
  selfIndex: number
  customClass?: string
  options: Options
}

function TopStableBox({ stable, selfIndex, customClass = '', options }: TopStableBoxProps) {
  const { medal, position, topFrame, boderFrame, boderAvt } = useGetRankInfo(selfIndex)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tilt = useRef<HTMLElement | any>(null)

  useEffect(() => {
    VanillaTilt.init(tilt.current, options)
  }, [options])

  return (
    <TopStableBoxStyled
      position={position}
      topFrame={topFrame}
      boderFrame={boderFrame}
      boderAvt={boderAvt}
      className={customClass}
    >
      <div className='top-stable d-flex flex-column align-items-center mx-auto position-relative' ref={tilt}>
        <div className='top-frame position-absolute w-100 d-none d-lg-block' />
        <img src={medal} alt='' className='medal position-absolute' />
        <div className='avatar-container d-flex align-items-center justify-content-center'>
          <img src={stable.owner_avatar ?? AVATAR_DEFAULT} alt={stable.owner_name} className='avatar' />
        </div>
        <div className='name color-white font-bold'>{shortenUserName(stable.owner_name)}</div>
        <div className='d-flex achievement text-center color-white font-bold my-1'>
          <div className='title d-flex align-items-center'>
            <span></span>
            <img src={LEFT_MIDDLE_BAR} alt='total race' className='img-achievement' />
          </div>
          <div className='times total-races mx-3'>{stable.total_number_of_races}</div>
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
            <div className='times'>{stable.first_count}</div>
          </div>
          <div className='achievement text-center color-white font-bold'>
            <div className='title d-flex align-items-center'>
              <img src={TOP_COUNT_SLIVER_MEDAL} alt='2' />
            </div>
            <div className='times'>{stable.second_count}</div>
          </div>
          <div className='achievement text-center color-white font-bold'>
            <div className='title d-flex align-items-center'>
              <img src={TOP_COUNT_BRONZE_MEDAL} alt='3' />
            </div>
            <div className='times'>{stable.third_count}</div>
          </div>
        </div>
      </div>
    </TopStableBoxStyled>
  )
}

export default TopStableBox
