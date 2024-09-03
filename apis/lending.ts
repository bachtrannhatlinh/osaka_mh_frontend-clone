/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApiResponse,
  NonceRequest,
  NonceResponses
  // ClaimResponses,
  // DepositRequest,
  // NonceRequest,
  // NonceResponses,
  // SwapETokenRequest,
  // SwapETokenResponses
} from 'models'
import axiosClient from './axiosClient'

const lendingApi = {
  postLeaseHorse(data: any): Promise<ApiResponse<any>> {
    const url = '/lending/chain/lease-horse'
    return axiosClient.post(url, data)
  },
  postWithrawHorse(data: any): Promise<ApiResponse<any>> {
    const url = '/lending/chain/withdraw-horse'
    return axiosClient.post(url, data)
  },

  getHorseMyAsset(params: any): Promise<ApiResponse<any>> {
    const url = '/lending/my-asset'
    return axiosClient.get(url, { params })
  },
  getHorseMarket(params: any): Promise<ApiResponse<any>> {
    const url = '/lending/market'
    return axiosClient.get(url, { params })
  },

  postSendToMarket(horseId: number | string, params: any): Promise<ApiResponse<any>> {
    const url = `/lending/${horseId}/send-to-market`
    return axiosClient.post(url, params)
  },

  getHorseMyBorrow(params: any): Promise<ApiResponse<any>> {
    const url = '/lending/my-borrow'
    return axiosClient.get(url, { params })
  },
  getHorseMyLending(params: any): Promise<ApiResponse<any>> {
    const url = '/lending/my-lending'
    return axiosClient.get(url, { params })
  },
  getHorseLendingDetails(horseId: string | number): Promise<ApiResponse<any>> {
    const url = `/lending/${horseId}/details`
    return axiosClient.get(url)
  },
  postHorseRent(horseId: number | string, params: any): Promise<ApiResponse<any>> {
    const url = `/lending/${horseId}/rent`
    return axiosClient.post(url, params)
  },
  postHorseBackToFarm(horseId: number | string): Promise<ApiResponse<any>> {
    const url = `/lending/${horseId}/back-to-farm`
    return axiosClient.post(url)
  },
  postCheckNonce(data: NonceRequest): Promise<ApiResponse<NonceResponses>> {
    const url = '/lending/chain/check-nonce'
    return axiosClient.post(url, data)
  },
  getProfitActive(params?: any): Promise<ApiResponse<any>> {
    const url = '/lending/my-lending-profit/active'
    return axiosClient.get(url, { params })
  },
  getProfitHistory(params?: any): Promise<ApiResponse<any>> {
    const url = '/lending/my-lending-profit/history'
    return axiosClient.get(url, { params })
  }
}

export default lendingApi
