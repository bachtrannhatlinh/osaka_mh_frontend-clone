/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'
import raceApi from 'apis/raceApi'
import userApi from 'apis/userApi'
import { links } from 'apps'
import { STATUS } from 'apps/constants'
import {
  CANCEL_COUNT_DOWN,
  CANCEL_COUNT_DOWN_DISABLE,
  GAME_TOKEN_E_HTC,
  GAME_TOKEN_E_PRZ,
  GAME_TOKEN_Z_PRZ,
  ICON_LOCK
} from 'assets/images'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { setCoinUser } from 'features/Balance/coinUser.slice'
import { useAppDispatch } from 'hooks'
import { NOTIFICATION_MESSAGE } from 'i18n/constants'
import {
  CurrentUser,
  Gate,
  GetProfit,
  GetRaceListParams,
  GetRaceListPopupParams,
  MyHorseListParams,
  Race,
  RecordRace,
  LENDING_TYPE
} from 'models'
import { Fragment, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import ReactLoading from 'react-loading'
import { useNavigate } from 'react-router-dom'
import { Cell, Column, useTable } from 'react-table'
import { ClassTag } from 'shared'
import ToolTip from 'shared/ToolTip'
import { accessor, profitColumns } from 'utils/columns'
import { handleAsyncRequest } from 'utils/helper'
import ConfirmCancelModal from '../ConfirmCancelModal'
import CountDownTime from '../CountDownTime'
import RaceTableStyled from './styled'

interface RaceTableProps {
  data: any[]
  columns: Column[]
  isRowClickable?: boolean
  onRegisterButtonClick?: (gateNumber: number) => void
  raisePage?: any
  params: GetRaceListParams | MyHorseListParams
  loader?: boolean
  status?: string
  onQuickView?: (id: number) => void
  ownerName?: CurrentUser
  paramsFilterResult?: GetRaceListPopupParams
  checkLoadingPage?: boolean
  timeCancelRace?: number
  toggleIsModalConfirmCancelOpen?: (value?: boolean) => void
  isModalConfirmCancelOpen?: boolean
  totalRace?: number
}

const handleStartIn = (cell: Cell) => {
  if ((cell.row.original as Race).status === 'SCHEDULING') {
    return 'Scheduling...'
  }

  if ((cell.row.original as Race).status === 'WAITING') {
    return <CountDownTime time={cell.value} />
  }

  if ((cell.row.original as Race).status === 'LIVE') {
    return (
      <div className='starts-in color-red font-bold d-flex align-items-center'>
        <div className='dot' /> <span className='live-text'>Live</span>
      </div>
    )
  }
}

const handleCancelCountDown = async (id: number) => {
  await handleAsyncRequest(raceApi.deleteCancelCountDown(id))
}

const timeConversion = (duration: number) => {
  const convertNumber = (number: number) => (number === 0 ? '00' : number > 9 ? number.toString() : `0${number}`)
  const portions: string[] = []

  const msInHour = 1000 * 60 * 60
  const hours = Math.trunc(duration / msInHour)
  if (hours > 0) {
    portions.push(convertNumber(hours) + ':')
    duration = duration - hours * msInHour
  }

  const msInMinute = 1000 * 60
  const minutes = Math.trunc(duration / msInMinute)
  portions.push(convertNumber(minutes) + ':')
  duration = duration - minutes * msInMinute

  const seconds = Math.trunc(duration / 1000)
  portions.push(convertNumber(seconds))
  return portions.join('')
}

const handleRaceName = (cell: Cell) => {
  if (
    (cell.row.original as Race).status === 'OPEN' ||
    (cell.row.original as Race).status === 'SCHEDULING' ||
    (cell.row.original as Race).status === 'WAITING' ||
    (cell.row.original as Race).status === 'LIVE' ||
    (cell.row.original as Race).status === 'CLOSED'
  ) {
    return <ToolTip name={cell.value} />
  }
}

const handleDisplayTotalPrize = (cell: Cell) => {
  const { row } = cell
  const { total_prize } = row.values
  const entry_fee_origin = (cell.row.original as Race).entry_fee
  const entry_fee_detail = row.values.entry_fee as any

  let getEntryFeeData = entry_fee_origin

  // if (entry_fee_origin === undefine || entry_fee_origin == 0) && total_prize === undefine  => free
  // if (entry_fee_origin === undefine || entry_fee_origin == 0) && total_prize > 0 => free ePrz
  // if (entry_fee_origin != 0) && total_prize > 0 =>  ePRZ

  if (entry_fee_origin === undefined) {
    getEntryFeeData = entry_fee_detail
  }

  if (getEntryFeeData === 0) {
    if (total_prize > 0) {
      return (
        <>
          <span className='color-z-prz font-bold'>{cell.value}</span>{' '}
          <img src={GAME_TOKEN_Z_PRZ} alt='' className='game-token-z-prz' />
        </>
      )
    } else {
      return '---'
    }
  } else {
    if (total_prize === undefined) {
      return <span>---</span>
    } else {
      return (
        <div>
          <span className='color-e-prz font-bold'>{cell.value}</span>{' '}
          <img src={GAME_TOKEN_E_PRZ} alt='' className='game-token-e-prz' />
        </div>
      )
    }
  }
}

const handleDisplayRacePrize = (cell: Cell) => {
  const { row } = cell
  const { getEntryFee } = row.original as any
  const { race_prize } = row.values

  if (getEntryFee === 0) {
    if (race_prize > 0) {
      return (
        <>
          <span className='color-z-prz font-bold'>{cell.value}</span>{' '}
          <img src={GAME_TOKEN_Z_PRZ} alt='' className='game-token-z-prz' />
        </>
      )
    } else {
      return '---'
    }
  } else {
    if (race_prize === undefined) {
      return <span>---</span>
    } else {
      return (
        <div>
          <span className='color-e-prz font-bold'>{cell.value}</span>{' '}
          <img src={GAME_TOKEN_E_PRZ} alt='' className='game-token-e-prz' />
        </div>
      )
    }
  }
}

const handleFieldType = (field: string) => {
  if (field === 'TURF') {
    return <span className='font-bold color-turf-field'>{field}</span>
  } else {
    return <span className='font-bold color-orange'>{field}</span>
  }
}

const handleProfit = (cell: Cell) => {
  if (cell.value === null) return '---'
  if ((cell.row.original as GetProfit).lending_type === LENDING_TYPE.Share) {
    return <span className='color-need-e-htc'>{cell.value} %</span>
  } else
    return (
      <>
        <span className='color-e-htc'>{cell.value}</span> <img src={GAME_TOKEN_E_HTC} alt='e-htc' className='e-htc' />
      </>
    )
}

const renderDataTable = (
  cell: Cell,
  header: string,
  time: number,
  toggleIsModalConfirmCancelOpen?: (value?: boolean) => void,
  status?: string,
  renderConfirmCancelHorseModal?: (value?: any) => void
) => {
  switch (header) {
    case accessor.cancelCountDown:
      return (
        <div className='d-flex align-items-center justify-content-start gap-2 count-down-btns'>
          <>
            {time > 0 ? (
              <button disabled className='btn-waiting-cancel'>
                {<img src={CANCEL_COUNT_DOWN_DISABLE} />}
                <span className='color-yellow'>{timeConversion(time)}</span>
              </button>
            ) : status === STATUS.SCHEDULING || status === STATUS.WAITING ? (
              <> </>
            ) : (
              <button
                onClick={() => {
                  toggleIsModalConfirmCancelOpen?.(true)
                  renderConfirmCancelHorseModal?.(cell.value)
                }}
              >
                <img src={CANCEL_COUNT_DOWN} />
              </button>
            )}
          </>
          {renderConfirmCancelHorseModal?.(cell.value)}
        </div>
      )
    case accessor.racePosition:
      return <div dangerouslySetInnerHTML={{ __html: cell.value }} />
    case accessor.count_down:
      return handleStartIn(cell)
    case accessor.grade:
      return <ClassTag text={cell.value} isActive={true} />
    case accessor.totalPrize:
      return handleDisplayTotalPrize(cell)
    case accessor.racePrize:
      return handleDisplayRacePrize(cell)
    case accessor.experienceReceived:
      return cell.value ? <span className='font-bold'>{cell.value}</span> : ''
    case accessor.field:
      return <span>{handleFieldType(cell.value) ?? ''}</span>
    case accessor.distance:
      return <span className='font-bold'>{cell.value ? `${(cell.value as number).toLocaleString()}m` : '0m'}</span>
    case accessor.entryFee:
      return (
        <div className='entry-fee text-uppercase font-bold'>
          {cell.value === 0 ? (
            <span className='color-primary font-bold'>FREE</span>
          ) : (
            <>
              <span className='color-e-htc font-bold'>{cell.value}</span>{' '}
              <img src={GAME_TOKEN_E_HTC} alt='e-htc' className='e-htc' />
            </>
          )}
        </div>
      )
    case accessor.horse:
      return <div dangerouslySetInnerHTML={{ __html: cell.value }} />
    case accessor.registered:
      return <div className='font-bold register'>
        <div>{cell.value}/12</div>
        {(cell.row.original as Race).protected_race && <img src={ICON_LOCK} alt=' lock' className='icon-lock' width={30} />}
      </div>
    case accessor.startIn:
    case accessor.endAt:
      return (
        <span className='value color-white'>
          {dayjs(parseInt(cell.value)).format('YYYY-MM-DD')} {dayjs(parseInt(cell.value)).format('HH:mm')}
        </span>
      )
    case accessor.gate:
      return <div dangerouslySetInnerHTML={{ __html: cell.value }} />
    case accessor.statistic:
      return <div dangerouslySetInnerHTML={{ __html: cell.value }} />
    case accessor.ownerName:
      return <div dangerouslySetInnerHTML={{ __html: cell.value }} />
    case accessor.bloodLine:
      return <div dangerouslySetInnerHTML={{ __html: cell.value }} />
    case accessor.raceName:
      return <span className='font-bold race-name'>{handleRaceName(cell)}</span>
    case accessor.raceCourse:
      return <span className='font-bold'>{handleRaceName(cell)}</span>
    case profitColumns.no:
      return <span className='font-bold'>{cell.row.index + 1}</span>
    case profitColumns.rent_fee:
      return <span className='font-bold'>{handleProfit(cell)}</span>
    case profitColumns.prize_for_owner:
      return (
        <>
          {!_.isEmpty(cell?.value)
            ?
            <span className={`font-bold total-prize ${cell?.value.length > 1 ? 'revert_prz' : ''}`}>

              {cell.value.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    {item.item_type === 'FREE_PRZ' && (
                      <div>
                        <span className='color-z-prz font-bold'>{item?.amount}</span>
                        <img src={GAME_TOKEN_Z_PRZ} alt='FREE_PRZ' className='game-token-z-prz' />
                      </div>
                    )}
                    {item.item_type === 'E_PRZ' && (
                      <div>
                        <span className='color-e-prz font-bold'>{item?.amount}</span>
                        <img src={GAME_TOKEN_E_PRZ} alt='E_PRZ' className='game-token-e-prz' />
                      </div>
                    )}
                    {item.item_type === 'E_HTC' && (
                      <div>
                        <span className='color-e-htc font-bold'>{item?.amount}</span>
                        <img src={GAME_TOKEN_E_HTC} alt='e-htc' className='e-htc' />
                      </div>
                    )}
                  </div>
                )
              })}
            </span> : '0'}

          {/* <div>
          <span className='color-z-prz font-bold'>00</span>{' '}
          <img src={GAME_TOKEN_Z_PRZ} alt='' className='game-token-z-prz' />
        </div> */}

        </>

      )
    default:
      return <span>{cell.render('Cell')}</span>
  }
}

const isEmptyGate = (row: any): row is Gate => row.horse === null && typeof row.gate === 'number'

function RaceTable({
  columns,
  data,
  isRowClickable = false,
  onRegisterButtonClick,
  raisePage,
  loader = false,
  params,
  status,
  onQuickView,
  ownerName,
  paramsFilterResult,
  checkLoadingPage,
  timeCancelRace,
  toggleIsModalConfirmCancelOpen,
  totalRace,
  isModalConfirmCancelOpen
}: RaceTableProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const fetchCoinUser = async () => {
    const [, resultCoinUser] = await handleAsyncRequest(userApi.getUserItems())
    if (!resultCoinUser) return

    dispatch(setCoinUser(resultCoinUser.data))
  }

  const renderConfirmCancelHorseModal = (value: any) => {
    if (isModalConfirmCancelOpen) {
      const handleOk = () => {
        handleCancelCountDown(value).then(() => fetchCoinUser())
        toggleIsModalConfirmCancelOpen?.(false)
      }

      const handleCancel = () => {
        toggleIsModalConfirmCancelOpen?.(false)
      }
      return (
        <ConfirmCancelModal toggleIsModalOpen={handleCancel} onCloseButtonClick={handleCancel} onConfirm={handleOk} />
      )
    }
  }
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })
  const memoizedRenderDataTable = useCallback(renderDataTable, [
    columns,
    data,
    timeCancelRace,
    status,
    renderConfirmCancelHorseModal
  ])
  const tableBodyClass = classNames('table-body', { ['highlight']: status === 'RESULT' || status === 'CLOSED' })

  const handleRowItemClicked = (raceId: number) => {
    if (!isRowClickable) return

    return () => {
      navigate(links.race.detail(raceId.toString()))
    }
  }

  const handleRegisterButtonClick = (gateNumber: number) => () => {
    if (!onRegisterButtonClick) return

    onRegisterButtonClick(gateNumber)
  }

  const handleQuickView = (raceId: any) => () => {
    if (!onQuickView) return

    onQuickView(raceId)
  }

  const handleLoadingRaces = () => {
    if (loader === false) {
      return <ReactLoading className='loading' type={'spin'} />
    } else if (totalRace === 0) {
      return <div className='no-data'>{t(`${NOTIFICATION_MESSAGE}.dataNotFound`)}</div>
    } else return <></>
  }

  const checkWidthRaceName = (cell: Cell) => {
    if (cell.column.Header === 'race name') {
      return `max-width-150`
    }
  }

  const checkTextAlign = (cell: Cell) => {
    if (cell.column.Header === 'entry fee') {
      return `max-width-80 justify-content-end`
    }

    if (cell.column.Header === 'prize') {
      return `max-width-80 justify-content-end`
    }
    return `justify-content-start`
  }

  const checkHeader = (column: any) => {
    if (column.Header === 'entry fee') {
      return `padding-left-header-10`
    }

    if (column.Header === 'prize') {
      return `padding-left-header-41`
    }
  }

  return (
    <RaceTableStyled isRowClickable={isRowClickable}>
      <div className='race-table-container'>
        <div className='race-table'>
          <InfiniteScroll
            dataLength={data.length}
            next={() =>
              typeof raisePage === 'function' &&
              data.length >= 20 &&
              raisePage?.(
                checkLoadingPage
                  ? { ...paramsFilterResult, page: paramsFilterResult && paramsFilterResult.page + 1 }
                  : { ...params, page: params.page + 1 }
              )
            }
            hasMore={true}
            loader={handleLoadingRaces()}
          >
            <table {...getTableProps()} className='table'>
              <thead className='table-head'>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index} className='table-row'>
                    {headerGroup.headers.map((column, index) => {
                      return (
                        <th
                          {...column.getHeaderProps()}
                          key={column.id}
                          className={`th text-uppercase font-bold text-left ${index === 0 && 'ps-3'} ${checkHeader(
                            column
                          )}
                          `}
                        >
                          {column.render('Header')}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className={tableBodyClass}>
                {rows.map((row: any) => {
                  const userLoginId = ownerName?.id
                  prepareRow(row)
                  if (isEmptyGate(row.original)) {
                    return (
                      <tr {...row.getRowProps()} key={row.id} className='table-row'>
                        <td className='table-data text-left ps-3 font-bold'>
                          <div className='table-gate-no'>
                            <span className='gate-no'>{row.original.gate}</span>
                          </div>
                        </td>
                        <td className='table-data-empty font-bold' colSpan={4}>
                          <button
                            className='btn-select-gate'
                            onClick={handleRegisterButtonClick(row.original.gate as unknown as number)}
                          >
                            {t(`${NOTIFICATION_MESSAGE}.selectThisGate`)}
                          </button>
                        </td>
                      </tr>
                    )
                  }
                  const handleDetailHorse = (row: any): row is Gate[] => {
                    return row.original.detailHorse
                  }

                  const normal = 'table-row position-relative'
                  const hightLight = 'table-row position-relative table-row-primary'
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={row.id}
                      // Check info user_id and owner-user_id
                      className={userLoginId && userLoginId === row.original.user_id ? hightLight : normal}
                    >
                      {row.cells.map((cell: any, index: number) => {
                        return cell.column.id === 'cancel_count_down' &&
                          !(userLoginId && userLoginId === row.original.user_id) ? (
                          <Fragment key={cell.column.id}></Fragment>
                        ) : (
                          <td
                            onClick={
                              cell.column.id !== 'cancel_count_down' &&
                              (handleRowItemClicked((row.original as RecordRace).id) ||
                                handleQuickView(handleDetailHorse(row) as unknown as Race))
                            }
                            {...cell.getCellProps()}
                            key={cell.column.id}
                            className={`table-data text-center p-0 position-relative ${cell?.column?.id}`}
                          >
                            <div
                              className={`table-data-container d-flex ${checkWidthRaceName(
                                cell
                              )} h-100 align-items-center ${checkTextAlign(cell)} ${index === 0 && 'ps-3 first-item'} `}
                            >
                              {memoizedRenderDataTable(
                                cell,
                                cell.column.id,
                                timeCancelRace || 0,
                                toggleIsModalConfirmCancelOpen,
                                status,
                                renderConfirmCancelHorseModal
                              )}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>
    </RaceTableStyled>
  )
}

export default RaceTable
