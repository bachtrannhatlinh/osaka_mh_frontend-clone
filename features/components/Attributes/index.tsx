
import { AttributeBox } from 'features/Horse/components'
import { Horse } from 'models'

import AttributesStyle from './styled'
import { capitalizeOnlyFirstLetter } from 'utils/helper'

interface AttributesProps {
  customClass?: string
  horse: Horse
}

function Attributes({ customClass = '', horse }: AttributesProps) {

  return (
    <AttributesStyle className={customClass}>
      <div className='attribute-container row  gy-4'>
        <div className='attribute-horse col-4'>
          <AttributeBox title='Bloodline' value={horse.bloodline.name} />
        </div>
        <div className='attribute-horse col-4'>
          <AttributeBox title='Gender' value={capitalizeOnlyFirstLetter(horse.gender)} />
        </div>
        <div className='attribute-horse col-4'>
          <AttributeBox title='Color' value={capitalizeOnlyFirstLetter(horse.bloodline.color)} />
        </div>
        <div className='attribute-horse col-4'>
          <AttributeBox title='Characteristic' value={horse.characteristic_display} />
        </div>
        <div className='attribute-horse col-4'>
          <AttributeBox title='Run type' value={horse.run_type} />
        </div>
      </div>
    </AttributesStyle>
  )
}

export default Attributes
