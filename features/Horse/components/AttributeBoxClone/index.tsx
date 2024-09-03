import { YELLOW_LINE } from 'assets/images'
import AttributeBoxCloneStyled from './styled'
import { Career } from 'models/horse'

interface AttributeBoxCloneProps {
  title: string
  value: Career
  customClass?: string
  career: string
}

function AttributeBoxClone({ title, value, customClass = '', career }: AttributeBoxCloneProps) {
  const handleInformationRank = () => {
    let result = null
    if (value.total_number_of_races === 0 && (career === 'win_rates' || career === 'statistics')) {
      career === 'win_rates'
        ? (result = (
            <div className='attribute-box position-relative'>
              <div className='title color-yellow'>{title}</div>
              <div className='value color-white'>100%</div>
              <img src={YELLOW_LINE} alt='' className='position-absolute line' />
            </div>
          ))
        : (result = (
            <div className='attribute-box position-relative'>
              <div className='title color-yellow'>{title}</div>
              <div className='value color-white'>
                {0} | {0}
              </div>
              <img src={YELLOW_LINE} alt='' className='position-absolute line' />
            </div>
          ))
    }

    if (value.total_number_of_races !== 0 && career === 'win_rates') {
      result = (
        <div className='attribute-box position-relative'>
          <div className='title color-yellow'>{title}</div>
          <div className='value color-white'>{`${(value.first_count / value.total_number_of_races).toFixed(2)}% -
       ${((value.first_count + value.second_count + value.third_count) / value.total_number_of_races).toFixed(
         2
       )}%`}</div>
        </div>
      )
    }

    if (value.total_number_of_races !== 0 && career === 'statistics') {
      result = (
        <div className='attribute-box position-relative'>
          <div className='title color-yellow'>{title}</div>
          <div className='value color-white'>{`${value.first_count} | ${value.first_count} - ${value.second_count} - ${value.third_count} `}</div>
        </div>
      )
    }

    return result
  }

  return <AttributeBoxCloneStyled className={customClass}>{handleInformationRank()}</AttributeBoxCloneStyled>
}

export default AttributeBoxClone
