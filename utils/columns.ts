/* eslint-disable @typescript-eslint/no-explicit-any */
interface Column {
  Header: string
  accessor: any
}

interface Accessor {
  count_down: string
  raceName: string
  raceCourse: string
  grade: string
  field: string
  distance: string
  entryFee: string
  totalPrize: string
  registered: string
  startIn: string
  gate: string
  horse: string
  bloodLine: string
  statistic: string
  ownerName: string
  startAt: string
  endAt: string
  racePosition: string
  racePrize: string
  experienceReceived: string
  cancelCountDown: string
  avatar: string
  getEntryFee: string
}

export const accessor: Accessor = {
  count_down: 'count_down',
  raceName: 'name',
  raceCourse: 'course.name',
  grade: 'racing_class_name',
  field: 'field_type',
  distance: 'distance',
  entryFee: 'entry_fee',
  totalPrize: 'total_prize',
  registered: 'registered',
  startIn: 'start_at',
  gate: 'gate',
  horse: 'horse',
  bloodLine: 'blood_line',
  statistic: 'statistic',
  ownerName: 'owner_name',
  startAt: 'start_at',
  endAt: 'end_at',
  racePosition: 'race_position',
  racePrize: 'race_prize',
  experienceReceived: 'experience_received',
  cancelCountDown: 'cancel_count_down',
  avatar: 'avatar',
  getEntryFee: 'getEntryFee'
}

const gateColumn: Column = {
  Header: 'gate no.',
  accessor: accessor.gate
}

const horseColumn: Column = {
  Header: 'horse',
  accessor: accessor.horse
}

const horseInfoColumn: Column = {
  Header: 'bloodline',
  accessor: accessor.bloodLine
}

const statisticColumn: Column = {
  Header: 'carrer',
  accessor: accessor.statistic
}

const ownerNameColumn: Column = {
  Header: 'owner name',
  accessor: accessor.ownerName
}

const rankColumn: Column = {
  Header: 'rank',
  accessor: accessor.racePosition
}

const totalPrizeColumn: Column = {
  Header: 'prize',
  accessor: accessor.totalPrize
}
const racePrizeColumn: Column = {
  Header: 'prize',
  accessor: accessor.racePrize
}

const expColumn: Column = {
  Header: 'exp',
  accessor: accessor.experienceReceived
}

const raceNameColumn: Column = {
  Header: 'race name',
  accessor: accessor.raceName
}

const raceCourseColumn: Column = {
  Header: 'racecourse',
  accessor: accessor.raceCourse
}

const gradeCourseColumn: Column = {
  Header: 'class',
  accessor: accessor.grade
}

const fieldTypeColumn: Column = {
  Header: 'field type',
  accessor: accessor.field
}

const distanceColumn: Column = {
  Header: 'distance',
  accessor: accessor.distance
}

const entryFeeColumn: Column = {
  Header: 'entry fee',
  accessor: accessor.entryFee
}

const registeredColumn: Column = {
  Header: 'registered',
  accessor: accessor.registered
}

const startAtColumn: Column = {
  Header: 'date',
  accessor: accessor.endAt
}

const startsInColumn: Column = {
  Header: 'starts in',
  accessor: accessor.count_down
}

const cancelRaceHorseColumn: Column = {
  Header: '',
  accessor: accessor.cancelCountDown
}

export const openAndSchedulingDetailColumns: Column[] = [
  gateColumn,
  horseColumn,
  horseInfoColumn,
  statisticColumn,
  ownerNameColumn,
  cancelRaceHorseColumn
]

export const resultDetailColumns: Column[] = [
  rankColumn,
  gateColumn,
  horseColumn,
  horseInfoColumn,
  racePrizeColumn,
  expColumn,
  ownerNameColumn
]

export const openListColumns: Column[] = [
  raceNameColumn,
  raceCourseColumn,
  gradeCourseColumn,
  fieldTypeColumn,
  distanceColumn,
  entryFeeColumn,
  totalPrizeColumn,
  registeredColumn
]

export const resultListColumns: Column[] = [
  raceNameColumn,
  raceCourseColumn,
  gradeCourseColumn,
  fieldTypeColumn,
  distanceColumn,
  entryFeeColumn,
  totalPrizeColumn,
  startAtColumn
]

export const schedulingListColumns: Column[] = [
  raceNameColumn,
  raceCourseColumn,
  gradeCourseColumn,
  fieldTypeColumn,
  distanceColumn,
  totalPrizeColumn,
  startsInColumn
]

// profit
interface Profit {
  horse_name: string
  prize_for_owner: string
  rent_days: string
  rent_fee: string
  renter_name: string
  total: string
  no: string
}
export const profitColumns: Profit = {
  horse_name: 'horse_name',
  rent_days: 'rent_days',
  rent_fee: 'rent_fee',
  renter_name: 'renter_name',
  prize_for_owner: 'prize_for_owner',
  no: 'No',
  total: 'total'
}

const gateNoColumn: Column = {
  Header: 'NO',
  accessor: profitColumns.no
}
const horseNameColumn: Column = {
  Header: 'HORSE NAME',
  accessor: profitColumns.horse_name
}
const renterNameColumn: Column = {
  Header: 'BORROWED ADDRESS',
  accessor: profitColumns.renter_name
}
const rentFeeNoColumn: Column = {
  Header: 'PROFIT',
  accessor: profitColumns.rent_fee
}
const totalColumn: Column = {
  Header: 'TOTAL',
  accessor: profitColumns.prize_for_owner
}

export const profitListColumns: Column[] = [
  gateNoColumn,
  horseNameColumn,
  renterNameColumn,
  rentFeeNoColumn,
  totalColumn
]
//end profit
