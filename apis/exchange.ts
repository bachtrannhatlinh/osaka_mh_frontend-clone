import axiosClient from './axiosClient'
import {
  ApiResponse,
  ClaimResponses,
  DepositRequest,
  DepositResponses,
  NonceRequest,
  NonceResponses,
  SwapETokenRequest,
  SwapETokenResponses
} from 'models'

const exchangeApi = {
  postExchange(data: DepositRequest): Promise<ApiResponse<DepositResponses>> {
    const url = '/exchange/deposit-htc'
    return axiosClient.post(url, data)
  },

  postClaimPrz(data: DepositRequest): Promise<ApiResponse<ClaimResponses>> {
    const url = '/exchange/claim-prz'
    return axiosClient.post(url, data)
  },

  postClaimFreePrz(data: DepositRequest): Promise<ApiResponse<ClaimResponses>> {
    const url = '/exchange/claim-free-prz'
    return axiosClient.post(url, data)
  },

  postSwapEToken(data: SwapETokenRequest): Promise<ApiResponse<SwapETokenResponses>> {
    const url = '/exchange/swap-etoken'
    return axiosClient.post(url, data)
  },

  postCheckNonce(data: NonceRequest): Promise<ApiResponse<NonceResponses>> {
    const url = '/exchange/check-nonce'
    return axiosClient.post(url, data)
  },
}

export default exchangeApi