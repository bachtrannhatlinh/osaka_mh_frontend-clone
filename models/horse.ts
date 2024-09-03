import { Pagination } from './common'

export interface GetHorseDetailByTokenId {
  limit?: number
  token_id?: number | string
}

export interface Career {
  first_count: number
  lose_count: number
  second_count: number
  third_count: number
  total_number_of_races: number
  win_count: number
}

export interface ListHorseStats {
  current_value: number
  init_value: number
  stat_rank: string
  stats_type: string
}

export interface Level {
  ability_point: number
  can_level_up: boolean
  exp_to_level_up: number
  id: number
  level: number
  level_up_cost: number
  total_ability_point: number
  total_exp: number
}

export interface Horse {
  active: boolean
  animation: string
  avatar: string
  bloodline: {
    code: string
    color: string
    color_code: string
    id: number
    name: string
    type: string
  }
  current_energy: number
  characteristic: string
  characteristic_display: string
  chain_owner_address: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  career: any
  experience: number
  gender: string
  id: number
  horse_id: number
  last_races_position: number[]
  level: Level
  list_horse_ability: {
    abilities_code: string
    description: string
    id: number
    level: number
    name: string
    parameters: string
    name_en: string
  }[]
  list_horse_skill: {
    description: string
    id: number
    name: string
    parameters: string
    skill_code: string
  }[]
  list_horse_stats: ListHorseStats[]
  max_energy: number | null
  model: string
  name: string
  horse_name: string
  racing_class: string
  racing_point: number
  remaining_time_to_next_energy: number
  run_type: string
  sound: string
  stats_point_remain: number
  sub_avatar: string
  token_id: number
  user: {
    id: number
    name: string
    public_address?: string
  }
  lending_status: string
  owner: {
    avatar: string
    email: string
    id: number
    name: string
    public_address: string
  }
  own_status: string
}

export interface HorseAvailable {
  active: boolean
  animation: string
  avatar: string
  blood_line: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bloodline: any
  current_energy: number
  characteristic: string
  characteristic_display: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  career: any
  experience: number
  gender: string
  id: number
  last_races_position: number[]
  level: Level
  list_horse_ability: {
    abilities_code: string
    description: string
    id: number
    level: number
    name: string
    parameters: string
    name_en: string
  }[]
  list_horse_skill: {
    description: string
    id: number
    name: string
    parameters: string
    skill_code: string
  }[]
  list_horse_stats: ListHorseStats[]
  max_energy: number | null
  model: string
  name: string
  racing_class: string
  racing_point: number
  remaining_time_to_next_energy: number
  run_type: string
  sound: string
  stats_point_remain: number
  sub_avatar: string
  token_id: number
  user: {
    id: number
    name: string
  }
}

export interface ListHorseStats {
  current_value: number
  init_value: number
  stat_rank: string
  stats_type: string
  count?: number
}

export interface HorseCareer {
  city: string
  country: string
  distance: number
  entry_fee: number
  field_type: string
  prize: number
  race_date: string
  race_horses_id: number
  race_name: string
  race_position: number
  race_class: string
  race_course: {
    city: string
    country: string
    id: number
  }
  total_prize: number
  race_id: number
}

export interface GetHorseCareerResponse extends Pagination {
  records: HorseCareer[]
}

export interface GetHorseCareerListParams {
  horseId: string
  limit?: number
  page?: number
  sort?: string[]
}

export interface GetHorseCareerListByTokenIdParams {
  token_id: string
  limit?: number
  page?: number
  sort?: string[]
}

export interface HorseInGate {
  avatar: string
  bloodline: {
    code: string
    color: string
    color_code: string
    id: number
    name: string
    type: string
  }
  career: Career
  current_energy: number
  experience: number
  gender: string
  id: number
  max_energy: number
  name: string
  racing_point: number
  sub_avatar: string
  token_id: number
  user: {
    id: number
    name: string
  }
}

export interface TopHorse {
  first_count: number
  horse_avatar: string
  horse_name: string
  id: number
  owner: string
  racing_point: number
  second_count: number
  third_count: number
  total_number_of_races: number
  sub_avatar: string
}

export interface TopStable {
  first_count: number
  owner_avatar: string | null
  owner_id: number
  owner_name: string
  second_count: number
  third_count: number
  total_racing_point: number
  total_number_of_races: number
}

export interface GetTopParams {
  limit?: number
  yearMonth?: string
}

export interface UpdateStatsParams {
  point: number
  stats_type: string
}

export interface RaceIdParam {
  raceId: string
}

export interface LevelUpHorse {
  code: number
  data: string
}
export interface HouseStats {
  MUSCLE: HouseStatsItem[]
  IQ: HouseStatsItem[]
  SPIRIT: HouseStatsItem[]
  ACCURACY: HouseStatsItem[]
  STAMINA: HouseStatsItem[]
  SPEED: HouseStatsItem[]
}

export interface HouseStatsItem {
  min: number
  max: number
  rank: string
}

export interface HouseInRace {
  code: string
  data: {
    is_in_race: boolean
  }
}