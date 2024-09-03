import { links } from 'apps'
import { BTN_REPLAY } from 'assets/images'
import { Link } from 'react-router-dom'

function Replay() {
  return (
    <div className='btn-view-race-2d'>
      <Link to={links.race.open()} className='color-primary font-bold w-100'>
        <img src={BTN_REPLAY} alt='' />
      </Link>
    </div>
  )
}

export default Replay
