import { Pagination } from './common'
import { Horse, HorseAvailable } from './horse'
import { LendingSortType } from './lending'

export interface CoinUser {
  items: Coin[]
  pending_transactions: PendingTransactions[]
}

export interface Coin {
  amount: number
  item_type: string
}

export interface PendingTransactions {
  amount: number
  block_expired: number
  blockchain_amount: number
  nonce: string
  owner: string
  r: string
  s: string
  token: string
  transporter_address: string
  v: number
}

export interface CurrentUser {
  id?: number
  avatar?: string
  description?: string
  email?: string
  lose_count: number
  name: string
  public_address: string
  total_horse: string
  total_race: number
  win_count: number
  win_rate: string
  first_count: number
  second_count: number
  third_count: number
  h2h_id?: string
}

export interface ErrorUser {
  error: string
  path: string
  status: number
  timestamp: number
}

export interface MyHorseListParams {
  limit: number
  page: number
  name?: string
  raceClass?: string
  search?: string | null
  lendingType?: string
  lendingStatus?: string | null
  horseName?: string
  sort?: string
  fieldType?: LendingSortType
  myHorse?: boolean
  ownStatus?: string | null
}

export interface UserAvailableHorses {
  name?: string
  raceId?: number
  search?: string
  ownStatus?: string | null
}

export interface MyInforMation {
  avatar: string
  description: string
  email: string
  name: string
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  avatarFile?: any | null
}

export interface GetMyHorseListResponse extends Pagination {
  records: Horse[]
}

export interface GetMyHorseAvailableListResponse extends Pagination {
  records: HorseAvailable[]
}

export interface SyncHorse {
  code: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}
export interface UserInformationResponse {
  avatar: string
  description: string
  email: string
  first_count: number
  first_web_login: true
  h2h_id: string
  id: number
  lose_count: number
  name: string
  public_address: string
  second_count: number
  third_count: number
  top_rate: number
  total_horse: number
  total_race: number
  win_count: number
  win_rate: number
}

export interface connectH2H {
  password: string
  username: string
}

export interface NotificationMessage {
  duration: string
  id: number
  sent_time: number
  status: string
  template: notificationTemplate
  type: string
}
export interface notificationTemplate {
  body?: string
  id?: number
  title?: string
}

export interface GetProfit {
  horse_name: string
  lending_id: string
  prize_for_owner: string
  prize_for_renter: string
  rent_days: string
  rent_fee: string
  renter_name: string
  total: string
  start_date: string
  lending_type: string
}
