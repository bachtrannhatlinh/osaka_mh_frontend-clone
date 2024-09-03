export interface DepositRequest {
  amount: string
}

export interface SwapETokenRequest {
  amount: string
}

export interface NonceRequest {
  nonce: string
}

export interface DepositResponses {
  amount: string,
  block_expired: number,
  blockchain_amount: string,
  in_game_id?: string,
  inGameId?: string,
  nonce: string,
  owner: string,
  r: string,
  s: string,
  token: string,
  transporter_address: string,
  v: string
}

export interface ClaimResponses {
  amount: string,
  blockchain_amount: string,
  block_expired: string,
  nonce: string,
  owner: string,
  r: string,
  s: string,
  token: string,
  transporter_address: string,
  v: string
}

export interface NonceResponses {
  code: number,
  data: boolean
}

export interface SwapETokenResponses {
  code: number,
  data: boolean
}

export interface ExchangeError {
  code: number,
  message: string
}