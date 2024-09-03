import { Pagination } from './common'

export interface GetUserNoticationtParams {
  limit?: number
  page: number
  sort?: string[]
  type?: string
  seen?: boolean
}

export interface notificationId {
  id: number
}

export interface Type {
  type: string
}

export interface GetUserNoticationCommonResponse {
  code: number
  data: string
}

export interface UserNoticationtResponse {
  claimed: boolean
  content: string
  id: number
  items: [
    {
      amount: number
      item_type: string
    }
  ]
  seen: boolean
  title: string
}

export interface GetUserNoticationtResponse extends Pagination {
  records: UserNoticationtResponse[]
  code: number
  data: {
    limit: number
    page: number
    total: number
    total_page: number
  }
}

export type MailStatusFilter = {
  name: string;
  isActive: boolean;
}
