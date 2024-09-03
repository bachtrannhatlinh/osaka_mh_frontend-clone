import { useEffect, useState } from 'react'
import { CountdownStyled } from './styled'

interface CountdownProps {
  startTime: number
}

function Countdown({ startTime = 5 }: CountdownProps) {
  const [countDown, setCountDown] = useState(startTime)

  const timer = () => setCountDown(countDown - 1)
  useEffect(() => {
    const id = setInterval(timer, 1000)
    if (countDown <= 0) {
      clearInterval(id)
    }
    return () => clearInterval(id)
  }, [countDown])
  return (
    <CountdownStyled>
      <div className='cont'>
        <div className='spinner'></div>
        <span className='number'>
          <span className='number-count-down'>{countDown}</span>
        </span>
      </div>
    </CountdownStyled>
  )
}

export default Countdown
