import { GAME_TOKEN_E_HTC, GAME_TOKEN_E_PRZ, GAME_TOKEN_Z_PRZ } from 'assets/images'
import dayjs from 'dayjs'
import { encodeURI } from 'js-base64'

import { HorseCareer } from 'models'
import { ClassTag } from 'shared'
import { ordinalSuffixOf } from 'utils/helper'
import HorseCareerItemStyled from './styled'

interface HorseCareerItemProps {
  career: HorseCareer
}

function HorseCareerItem({ career }: HorseCareerItemProps) {
  return (
    <HorseCareerItemStyled
      className='horse-career color-white w-100'
      onClick={() => window.open(`/race/detail/${encodeURI(career.race_id.toString())}`, '_blank')}
    >
      <td className='time-table font-bold ps-4'>
        {dayjs.unix(parseInt(career.race_date)).format('YYYY-MM-DD')}{' '}
        {dayjs.unix(parseInt(career.race_date)).format('HH:mm')}
      </td>
      <td className='place-table position-relative'>{career.race_name}</td>
      <td className='race-course-table'>
        {career.race_course.country} - {career.race_course.city}
      </td>
      <td className='class-table'>
        <ClassTag text={career.race_class} isActive={true} />
      </td>
      <td className='field-table'>{career.field_type}</td>
      <td className='distance-table font-bold'>{career.distance.toLocaleString()}m</td>
      <td className='rank-table font-bold color-yellow'>{ordinalSuffixOf(career.race_position)}</td>
      <td className='total-prize-table font-bold'>
        {career.entry_fee === 0 ? (
          <span className='color-primary font-bold'>FREE</span>
        ) : (
          <>
            <span className='color-e-htc'>{career.entry_fee} </span>
            <img src={GAME_TOKEN_E_HTC} alt='e-htc' className='e-htc' />
          </>
        )}
      </td>
      <td className='entry-fee-table font-bold'>
        {!career?.total_prize ? (
          <span className='font-bold'> --- </span>
        ) : career?.entry_fee === 0 ? (
          <>
            <span className='color-z-prz'>{career.total_prize} </span>
            <img src={GAME_TOKEN_Z_PRZ} alt='z-prz' />
          </>
        ) : (
          <>
            <span className='color-e-prz'>{career.total_prize} </span>
            <img src={GAME_TOKEN_E_PRZ} alt='e-prz' />
          </>
        )}
      </td>
    </HorseCareerItemStyled>
  )
}

export default HorseCareerItem
