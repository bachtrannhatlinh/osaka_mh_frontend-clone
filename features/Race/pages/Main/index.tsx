import { Link, useLocation, useOutlet } from 'react-router-dom'

import { TwoLineTitle } from 'shared'
import StyledRace from './styled'
import { TitleTabs } from 'models/schoolarship'

interface IHorseTrackProps {
  titleTabs: TitleTabs[]
}

function RaceMain({ titleTabs }: IHorseTrackProps) {
  const { pathname: currentPathname } = useLocation()
  const outlet = useOutlet()

  return (
    <StyledRace>
      <div className='container'>
        <div className='title-tabs-container'>
          <div className='title-tabs d-flex justify-content-center align-items-start'>
            {titleTabs.map(tab =>
              tab.link === currentPathname ? (
                <Link key={tab.name} to={tab.link} className='tab-link text-center'>
                  <TwoLineTitle text={tab.name} />
                </Link>
              ) : (
                <Link key={tab.name} to={tab.link} className='tab-link font-bold text-uppercase text-center'>
                  {tab.name}
                </Link>
              )
            )}
          </div>
        </div>
        <div className='content'>{outlet}</div>
      </div>
    </StyledRace>
  )
}

export default RaceMain
