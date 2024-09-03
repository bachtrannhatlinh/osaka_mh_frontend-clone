import { Pagination } from './common'
import { HorseInGate } from './horse'

export enum RaceStatus {
  OPEN = 'OPEN',
  SCHEDULING = 'SCHEDULING',
  LIVE = 'LIVE',
  FINISHED = 'FINISHED',
  RESULT = 'RESULT',
  WAITING = 'WAITING',
  CLOSED = 'CLOSED',
  CANCEL = 'CANCEL'
}

export enum RaceClass {
  Begin = 'Begin',
  Iron = 'Iron',
  Copper = 'Copper',
  Silver = 'Silver',
  Gold = 'Gold',
  Diamond = 'Diamond',
  Ruby = 'Ruby'
}

export enum RaceClassNumber {
  Class1 = 'Class 1',
  Class2 = 'Class 2',
  Class3 = 'Class 3',
  Class4 = 'Class 4',
  Class5 = 'Class 5',
  Class6 = 'Class 6',
  Class7 = 'Class 7',
  ClassFreeStyle = 'FreeStyle'
}

export enum RaceFieldType {
  Turf = 'TURF',
  Dirt = 'DIRT'
}

export interface GetRaceListParams {
  limit: number
  page: number
  raceClass?: RaceClassNumber
  fieldType?: RaceFieldType
  sort?: string[]
  freeRace: boolean
  myHorse: boolean
  search?: string
  status: RaceStatus
}
export interface GetRaceCancelParams {
  limit: number
  page: number
}

export interface GetRaceListPopupParams {
  limit: number
  page: number
  raceClass?: RaceClassNumber
  fieldType?: RaceFieldType
  sort?: string[]
  freeRace?: boolean
  myHorse?: boolean
  search?: string
  startAt: string
  endAt: string
  startInstance: string | null
  endInstance: string | null
}

interface Course {
  city: string
  country: string
  id: number
  name: string
}

export interface RecordRace {
  count_down: number
  course: Course
  distance: number
  end_at: number | null
  entry_fee: number
  field_type: string
  id: number
  image: string
  name: string
  public_at: number
  race_type: string
  racing_class_name: RaceClass
  registered: number
  start_at: number
  status: RaceStatus
  total_prize: number
  real_start_at: number
}

export interface GetRaceListResponse extends Pagination {
  records: RecordRace[]
}

export interface Gate {
  experience_received: number
  gate: string
  horse: HorseInGate | null
  race_position: string
}

export interface Race {
  count_down: string
  count_down_cancel: number
  current_time: number
  course: Course
  distance: {
    distance: number
    id: number
  }
  end_at: number
  entry_fee: number
  field_type: {
    id: number
    type: string
  }
  gates: Gate[]
  had_joined: boolean
  id: number
  name: string
  public_at: string
  race_prizes: {
    position: number
    prize: number
  }[]
  race_type: string
  racing_class: {
    id: number
    name: string
  }
  registered: number
  start_at: string
  status: string
  total_prize: number
  real_start_at: number
  protected_race: boolean
}

export interface JoinRaceBody {
  gate: number
  horse_id: number
  password?: string | null
}

export interface enterRacePassword {
  password: string | null
}

export interface EnterRaceError {
  code: 400
  message: string
}

export interface Step {
  a: number
  ask: number[]
  d: number
  dask: number[]
  phase: string
  s: number
  sps: number
  t: number
  v: number
}

export interface StepHorse {
  id: number
  animation: string
  avatar: string
  blood_line: string
  encode_steps: [[[number]]]
  gender: string
  horse_abilities: {
    abilities_code: string
    level: number
    name: string
  }[]
  horse_skills: {
    description: string
    name: string
    skill_code: string
  }[]
  horse_stats: {
    current_value: number
    stats_type: string
  }[]
  level: number
  model: string
  name: string
  run_type: string
  sound: string
  steps: Step[]
  subAvatar: string
  sub_avatar?: string
  stepsByTime: {
    [key: number]: Step
  }
  finishStepTime?: number
  owner?: { id: number; name?: string }
}

export interface StepHorseList {
  horses: StepHorse[]
}

export interface RankHorse {
  horseIndex: number
  step: Step
  reachFinishLine: boolean
  lastStep?: Step
  preLastStep?: Step
}

export type RaceResult = RecordRace & {
  race_data: StepHorseList
  data_url: string
}

export interface CancelCountDown {
  code: number
  data: string
}

export interface GetRevealPositionsResponse {
  race_positions: [
    {
      gate: string
      horse_id: number
      race_position: number
    }
  ]
  winner: {
    gate: string
    horse_id: number
    race_position: number
  }
}
