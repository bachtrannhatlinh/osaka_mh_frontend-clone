import { DATE_FORMAT } from 'apps/constants'
import { CALENDAR, FILTER_DATE_PICKER } from 'assets/images'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { isoDateFormat } from 'utils/helper'
import SelectDatePickerStyled from './styled'

interface SelectDatePickerProps {
  customClass?: string
  onStartAt?: (value: string) => void
  onEndAt?: (value: string) => void
  maxDate?: Date
  minDate?: Date
  startAt?: Date
  endAt?: Date
  endTime?: Date
  startTime?: Date
}

export default function SelectDatePicker({
  customClass,
  onStartAt,
  onEndAt,
  maxDate,
  minDate,
  startAt,
  endAt,
  endTime,
  startTime
}: SelectDatePickerProps) {
  const [startDate, setStartDate] = useState(startAt || endAt)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (startAt) setStartDate(startAt)
    if (endAt) setStartDate(endAt)
  }, [startAt, endAt])

  const handleChange = (e: Date) => {
    setStartDate?.(e)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hanldeDateTimeClickOutside = () => {
    if (endTime && isoDateFormat(startDate) > isoDateFormat(endTime)) {
      setStartDate?.(endTime)
      onStartAt?.(isoDateFormat(endTime))
      onEndAt?.(isoDateFormat(endTime))
    } else if (startTime && isoDateFormat(startDate) < isoDateFormat(startTime)) {
      setStartDate?.(startTime)
      onStartAt?.(isoDateFormat(startTime))
      onEndAt?.(isoDateFormat(startTime))
    } else if (startTime && isoDateFormat(startDate) > isoDateFormat(new Date())) {
      setStartDate?.(new Date())
      onStartAt?.(isoDateFormat(startTime))
      onEndAt?.(isoDateFormat(new Date()))
    } else {
      setStartDate?.(startDate)
      onStartAt?.(isoDateFormat(startDate))
      onEndAt?.(isoDateFormat(startDate))
    }
    setIsOpen(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <SelectDatePickerStyled customClass={customClass}>
      <span onClick={handleClick} className='cursor-pointer'>
        <img src={FILTER_DATE_PICKER} alt='' />
        <img src={CALENDAR} alt='' className='calendar' />
        <span className='color-white time-calendar'>{dayjs(startDate).format(DATE_FORMAT)}</span>
      </span>
      {isOpen && (
        <DatePicker
          selected={startDate}
          onChange={handleChange}
          inline
          showTimeInput
          minDate={minDate}
          maxDate={maxDate}
          onClickOutside={hanldeDateTimeClickOutside}
        />
      )}
    </SelectDatePickerStyled>
  )
}
