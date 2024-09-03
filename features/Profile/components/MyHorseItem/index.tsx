import { Horse } from 'models'
import { ClassTag } from 'shared'
import { capitalizeOnlyFirstLetter } from 'utils/helper'
import MyHorseItemStyled from './styled'

interface MyHorseItemProps {
  horse: Horse
  openHorseModal: boolean
  closeHorseModal: () => void
  handleOpenModalHorse: () => void
  myName: string
  atProfile: boolean
  idBeChoose: number
  stt: number
}

function MyHorseITem({ horse, handleOpenModalHorse, stt }: MyHorseItemProps) {
  return (
    <MyHorseItemStyled onClick={handleOpenModalHorse} isActive={horse?.active}>
      <td className='color-white stt width-5'>{stt + 1}</td>
      <td className='color-white width-15'>
        <img src={horse.sub_avatar} alt='list-horse' className='horse-avatar' />
      </td>
      <td className='color-white padding-left-5 width-15-name'>{capitalizeOnlyFirstLetter(horse.name)}</td>
      <td className='color-white padding-left-5 width-20'>{horse.bloodline.name}</td>
      <td className='color-white padding-left-4 width-15 gender'>{horse.gender}</td>
      <td className='color-white padding-left-59 width-18'>
        <ClassTag text={horse.racing_class} isActive={true} customClass='horse-class position-relative' />
      </td>
      <td >
        <div className='color-red'>
          {horse.active === false ? 'Disabled' : ''}
        </div>
        {horse?.own_status === 'LENDING' ? <div className='color-white'>Borrowed</div> : ''}

      </td>
    </MyHorseItemStyled>
  )
}

export default MyHorseITem
