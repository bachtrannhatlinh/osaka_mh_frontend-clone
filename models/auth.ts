export interface GetRandomMessageResponse {
  message: string
}

export interface PostLoginBody {
  address: string
  message: string
  sign: string
}

export interface PostLoginResponse {
  access_token: string
  expired_at: number
  refresh_token: string
  user_id: number
}

export interface MetaMaskSignMessageError {
  message: string
}

export interface PostLoginError {
  code: number
  message: string
}

interface Auth {
  user_id: number
  isLogged: boolean
  isFirstLogin?: boolean
}

interface Wallet {
  balance: {
    coinHtc?: string
    coinPrz?: string
  }
}

export type AuthState = Auth & Wallet

export interface RequestAccountsError {
  code: number
  message: string
}
