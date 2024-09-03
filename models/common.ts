/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T = any> {
  data: T
  code: number
  message?: string
}

export interface Pagination {
  limit: number
  page: number
  total: number
  total_page: number
  [key: string]: any
}

export interface Error {
  code: number
  message: string
}

export interface Message {
  title?: string
  text: string
}

export enum MODAL_TYPE {
  success = 'success',
  completed = 'completed',
  failed = 'failed',
  warning = 'warning'
}

export enum OWNER_STATUS {
  All = 'All',
  Owner = 'My Horse',
  Lending = 'Borrowed',
  AllKey = 'ALL',
  OwnerKey = 'OWNER',
  LendingKey = 'LENDING'
}
