import HorseBodyInfoStyled from './styled'
import { AbilityBox } from 'features/Horse/components'
import Stats from 'features/components/Stats'
import Attributes from 'features/components/Attributes'
import HorseCareerWinRates from '../HorseCareerWinRates'
import { Horse } from 'models'
interface HorseBodyInfoProps {
  horse: Horse
  isLending?: boolean
  customClass?: string
}
function HorseBodyInfo({ horse, isLending, customClass }: HorseBodyInfoProps) {

  return (
    <HorseBodyInfoStyled>
      {horse && (
        <div className={customClass}>
          <div className={`right-body ${isLending ? 'lending-container' : ''}`}>
            <div className='right'>
              <Attributes horse={horse} />
              <div className='career-win-rates'>
                <HorseCareerWinRates horse={horse} isLending={isLending} />
              </div>
              <div className='stats-body-container'>
                <Stats horse={horse} isLending={isLending} customClass='lending-stats' />
              </div>
              <div className='ability-container row gy-4'>
                {horse.list_horse_ability.map(skill => (
                  <div className='col-12 col-sm-6' key={skill.id}>
                    <AbilityBox name={skill.name_en} level={skill.level} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </HorseBodyInfoStyled>
  )
}

export default HorseBodyInfo
