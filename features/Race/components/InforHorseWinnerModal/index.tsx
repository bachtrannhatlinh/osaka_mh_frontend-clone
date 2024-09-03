import _ from 'lodash'
import { FEMALE_ICON, GAME_TOKEN_E_PRZ, GAME_TOKEN_Z_PRZ, HORSE_WINNER, MALE_ICON } from 'assets/images'
import { Gate, HorseInGate, Race } from 'models'
import InforHorseWinnerModalStyled from './styled'
import { shortenRaceCourseNameClone } from 'utils/helper'

interface ChooseHorseItemProps {
  infoWinner?: Gate
  raceDetail?: Race
}

export default function InforHorseWinnerModal({ infoWinner, raceDetail }: ChooseHorseItemProps) {
  const { horse } = infoWinner as Gate
  const { sub_avatar, name, gender, user } = horse as HorseInGate
  const handlePrize = () => {
    if (_.isEmpty(raceDetail?.race_prizes)) return '---'
    if (raceDetail?.entry_fee === 1 && raceDetail?.total_prize > 0) {
      return (
        <>
          <span className='e-prz'>{raceDetail?.race_prizes[0]?.prize}</span>
          <img src={GAME_TOKEN_E_PRZ} alt='' width={12} />
        </>
      )
    }
    if (raceDetail?.entry_fee === 0 && raceDetail?.total_prize > 0) {
      return (
        <>
          <span className='free-e-prz'>{raceDetail?.race_prizes[0]?.prize}</span>
          <img src={GAME_TOKEN_Z_PRZ} alt='' width={12} />
        </>
      )

    }
    return '---'
  }
  return (
    <InforHorseWinnerModalStyled>
      <div className='winner-container'>
        <div className='winner-background'>
          <div className='winner-top'>
            <img src={HORSE_WINNER} alt='' className='first-winner' />
            <div className='avatar-horse'>
              <img src={sub_avatar} alt='avatar' className='avatar' />
            </div>
          </div>
          <div className='infor-horse'>
            <div className='infor-horse-owner'>
              <div className='title'>OWNER</div>
              <div className='content'>{shortenRaceCourseNameClone(user?.name)}</div>
            </div>
            <div className='infor-horse-infor'>
              <div className='title'>HORSE INFO</div>
              <div className='content'>{name} -
                <img width={20} src={gender === "MALE" ? MALE_ICON : FEMALE_ICON} />
              </div>
            </div>
            <div>
              <div className='title'>
                Prize
              </div>
              <div className='content'>
                {handlePrize()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </InforHorseWinnerModalStyled>
  )
}
