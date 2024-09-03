import { OWNER_STATUS } from './common'
import { Level, ListHorseStats } from './horse'

export enum ELeaseType {
  Available = 'Available Pricing',
  Share = 'Share Revenue'
}

export enum LENDING_TYPE {
  Available = 'AVAILABLE_PRICING',
  Share = 'SHARE_REVENUE'
}

export enum LENDING_STATUS {
  InFarm = 'IN FARM',
  Lending = 'LENDING',
  Borrowed = 'BORROWED',
  Available = 'AVAILABLE'
}

export type ILeaseType = {
  name: ELeaseType
  isActive: boolean
}

export type ILeaseTypes = ILeaseType[]

export interface LendingHorse {
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
  horse_gender: string
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
  }
  lending_status: string
  lending_type: string
  horse_level: number
  owner_id: number
  owner: {
    avatar: string
    email: string
    id: number
    name: string
    public_address: string
  }
  price_configs: LendingPriceConfigs[]
  rent_days: number
  rent_fee: number
  own_status: string
}

export interface LendingHorseMarket {
  horse: LendingHorse
  lending_info: LendingHorseInfo
}

export interface LendingHorseInfo {
  price_configs: LendingPriceConfigs[]
  lending_status: string
  lending_type: string
  is_owner: boolean
  renter: Owner
  owner: Owner
  start_date: number
  end_date: number
  rent_fee: number
  rent_days: number
}

export interface LendingPriceConfigs {
  active: boolean
  name?: string
  day: string
  id?: number
  value: string
}

export interface Owner {
  avatar: string
  email: string
  h2h_id: string
  id: number
  name: string
  public_address: string
}

export type TypeSorts = LendingTypeFilter[]

export type LendingTypeFilter = {
  name: LendingSortType | 'Default' | LendingFilterType | MyAssetSortType | OWNER_STATUS
  key?: string | ''
  isActive: boolean
}

export enum LendingSortType {
  Newest = 'Newest',
  Oldest = 'Oldest'
}
export enum MyAssetSortType {
  Ascending = 'Ascending',
  Decrease = 'Decreasing'
}

export enum LendingFilterType {
  ALL = 'All',
  AVAILABLE = 'Available',
  IN_FARM = 'In_Farm',
  LENDING = 'Lending',
  BORROWED = 'Borrowed'
}
