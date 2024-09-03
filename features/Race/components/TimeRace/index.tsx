import { useToggle } from 'hooks'
import { useEffect, useState } from 'react'
import { formatTimeV2 } from 'utils/helper'
import TimeRaceStyled from './styled'

interface TimeRaceProps {
  timer?: number
  isStopped?: boolean
  reset: boolean
  toggleIsRaceEnd: (value?: boolean) => void
  timeElapsed: number
  isRaceInProcess?: boolean
  isRaceEnd?: boolean
}

function TimeRace({ isStopped = true, reset, toggleIsRaceEnd, timeElapsed, isRaceInProcess, isRaceEnd }: TimeRaceProps) {
  const TIME_RACE = 10
  const [time, setTime] = useState<number>(0)
  const [resetTime, toggleResetTime] = useToggle(reset)
  const [timeResult, setTimeResult] = useState<number>(0)

  useEffect(() => {
    if (reset) {
      toggleResetTime(false)
      setTimeResult(time)
    }
    if (!isRaceEnd && !isRaceInProcess) {
      setTime(0)
    }
  }, [reset])

  useEffect(() => {
    if (!isRaceEnd && !isRaceInProcess) {
      setTime(0)
    }
  }, [isRaceEnd, reset])

  useEffect(() => {
    if (!isRaceInProcess && timeElapsed < time) {
      toggleIsRaceEnd(true)
    }
  }, [time])

  useEffect(() => {
    let intervalId: ReturnType<typeof setTimeout>
    if (!resetTime) {
      intervalId = setInterval(() => {
        !isStopped && setTime(timePrev => (timePrev += TIME_RACE))
      }, TIME_RACE)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [isStopped, resetTime])

  return (
    <TimeRaceStyled>
      <p className='color-primary'>{time ? formatTimeV2(time) : formatTimeV2(timeResult)}</p>
    </TimeRaceStyled>
  )
}

export default TimeRace
