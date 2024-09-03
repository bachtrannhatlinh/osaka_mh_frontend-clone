import { CROWN_BRONZE_BORDER, CROWN_GOLD_BORDER, CROWN_SILVER_BORDER } from 'assets/images'
import classNames from 'classnames'
import { useAppSelector } from 'hooks'
import HorseRankBoxStyled from './styled'

interface HorseRankBoxProps {
  horseName: string
  subAvatar: string
  currentRank: number
  gate: number
  ownerId?: number
}

function HorseRankBox({ horseName, subAvatar, currentRank, gate, ownerId }: HorseRankBoxProps) {
  const profile = useAppSelector(state => state.profile)
  const isActive = ownerId === profile?.id

  const topRankLayout = () => {
    switch (currentRank) {
      case 0:
        return (
          <div className='rank-bg position-absolute '>
            <img src={CROWN_GOLD_BORDER} />
          </div>
        )
      case 1:
        return (
          <div className='rank-bg position-absolute '>
            <img src={CROWN_SILVER_BORDER} />
          </div>
        )
      case 2:
        return (
          <div className='rank-bg position-absolute '>
            <img src={CROWN_BRONZE_BORDER} />
          </div>
        )
      default:
        return ''
    }
  }

  return (
    <HorseRankBoxStyled
      className={classNames(['position-absolute', isActive && 'active'])}
      currentRank={currentRank}
      isHover={document.querySelector(`.horse-active-${gate}`) ? true : false}
    >
      <div
        className={classNames([
          'horse-rank-box d-flex align-items-center top-rank position-relative',
          isActive && 'horse-rank-box-active'
        ])}
      >
        <div className='avatar-container d-flex align-items-center justify-content-center'>
          <img src={subAvatar} alt={horseName} className='avatar rounded-circle' />
        </div>
        <div className='gate'>
          <span className='gate-rank'>#</span>
          <span>{gate}</span>
        </div>
        <div className='name-container p-0 m-0'>
          <div className='horse-name color-white'>{horseName}</div>
        </div>
        {topRankLayout()}
      </div>
    </HorseRankBoxStyled>
  )
}

export default HorseRankBox
