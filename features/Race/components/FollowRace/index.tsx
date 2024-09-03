import Live from 'features/Race/components/Live'
import Replay from 'features/Race/components/Replay'
import StarIn from 'features/Race/components/StarIn'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useTranslation } from 'react-i18next'

interface FollowRaceProps {
  status?: string
  firstTime: number
}

function FollowRace({ status, firstTime }: FollowRaceProps) {
  const { t } = useTranslation()
  // handle room display follow race
  function handleDisplayFollowRace(status?: string, firstTime?: number) {
    let displayResult = null

    if (status === 'SCHEDULING') {
      displayResult = <span className='font-bold color-white'>{t(`${NOTIFICATION_MESSAGE}.scheduling`)}</span>
    }

    if (status === 'WAITING') {
      displayResult = <StarIn firstTime={firstTime} />
    }

    if (status === 'LIVE') {
      displayResult = <Live />
    }

    if (status === 'CLOSED') {
      displayResult = <Replay />
    }

    return displayResult
  }

  return <div>{handleDisplayFollowRace(status, firstTime)}</div>
}

export default FollowRace
