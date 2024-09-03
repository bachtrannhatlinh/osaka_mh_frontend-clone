import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatTime } from 'utils/helper'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CountDownTimeClone({ time }: any) {
  const [firstTime, setFirstTime] = useState(0)
  const { t } = useTranslation()
  // get time when access first room horse
  useEffect(() => {
    if (time && time > 0) {
      const start_at = time
      setFirstTime(start_at)
    }
  }, [time])

  // time waiting
  const timer = () => setFirstTime(firstTime - 1000)
  useEffect(() => {
    if (firstTime <= 0) {
      return
    }

    const id = setInterval(timer, 1000)
    return () => clearInterval(id)
  }, [firstTime])

  if (firstTime <= 0) {
    return (
      <div className='starts-in color-red font-bold d-flex align-items-center'>
        <div className='dot' /> <span className='live-text'>{t(`${NOTIFICATION_MESSAGE}.live`)}</span>
      </div>
    )
  }

  return <div>{formatTime(firstTime)}</div>
}

export default CountDownTimeClone
