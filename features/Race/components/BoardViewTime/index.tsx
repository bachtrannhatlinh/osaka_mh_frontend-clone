import { Link } from 'react-router-dom'
import { links } from 'apps'

import { ORANGE_LINE_LEAN_LEFT, POLYGON, ORANGE_LINE_LEAN_RIGHT, BTN_VIEW_RACE_2D } from 'assets/images'

import BoardViewTimeStyled from './styled'
import { formatTime } from 'utils/helper'
import { useReloadCurrentPage } from 'hooks'
import { useEffect, useRef } from 'react'
import { RaceStatus } from 'models'

interface BoardViewTimeProps {
  viewRace2D: (value: boolean) => void
  idRaceDetail: number | undefined
  disableRaceTable: (value: boolean) => void
  firstTime: number
  status: string
  toggleIsRaceEnd: (value: boolean) => void
}

function BoardViewTime({
  viewRace2D,
  idRaceDetail,
  disableRaceTable,
  firstTime,
  status,
  toggleIsRaceEnd
}: BoardViewTimeProps) {
  const timeWaitingDown = formatTime(firstTime)
  const loaded = useRef(false)

  const handleViewRace2D = () => {
    viewRace2D(true)
    disableRaceTable(false)
  }

  const { SCHEDULING, CLOSED } = RaceStatus

  useEffect(() => {
    if (timeWaitingDown === '00:00:00' && status === 'WAITING') {
      loaded.current && useReloadCurrentPage()
      !loaded.current && (loaded.current = true)
    }
  }, [timeWaitingDown])

  const handleDisplayBoardView = () => {
    let resultBoardView = null
    if (status && status === CLOSED) {
      resultBoardView = <div className='finished-race font-bold'>FINISHED RACE</div>
    } else if (status === SCHEDULING) {
      resultBoardView = <div className='processing-race font-bold'>Processing...</div>
    } else {
      resultBoardView = (
        <>
          <div className='time-remains font-bold'>TIME REMAINS</div>
          <div className='display-time font-bold'>
            <span>{timeWaitingDown?.split(':').join('\u00a0 \u00a0')}</span>
          </div>
          <div className='hour-min-sec font-bold'>
            <span>Hour</span>
            <span>Min</span>
            <span>Sec</span>
          </div>
        </>
      )
    }
    return resultBoardView
  }

  return (
    <BoardViewTimeStyled>
      <div className='board-view-time'>
        {handleDisplayBoardView()}
        <div className='orange-line-lean pb-3'>
          <div className='orange-line-lean-left'>
            <div>
              <img src={ORANGE_LINE_LEAN_LEFT} alt='' />
            </div>
          </div>
          <div className='polygon'>
            <img src={POLYGON} alt='' />
          </div>
          <div className='orange-line-lean-right'>
            <div>
              <img src={ORANGE_LINE_LEAN_RIGHT} alt='' />
            </div>
          </div>
        </div>
        {status !== SCHEDULING && (
          <div className='btn-view-race-2d' onClick={() => toggleIsRaceEnd(false)}>
            <Link to={links.race.detail(idRaceDetail?.toString())} onClick={() => handleViewRace2D()}>
              <img src={BTN_VIEW_RACE_2D} alt='' />
            </Link>
          </div>
        )}
      </div>
    </BoardViewTimeStyled>
  )
}

export default BoardViewTime
