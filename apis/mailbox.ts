import { ApiResponse } from 'models'
import { GetUserNoticationCommonResponse, GetUserNoticationtParams, GetUserNoticationtResponse } from 'models/mailbox'
import axiosClient from './axiosClient'

const mailbox = {
  getUserNotication(params: GetUserNoticationtParams): Promise<ApiResponse<GetUserNoticationtResponse>> {
    const url = '/user/notifications'
    return axiosClient.get(url, { params })
  },

  postUserNoticationClaim(id: number): Promise<ApiResponse<GetUserNoticationCommonResponse>> {
    const url = `user/notifications/${id}/claim`
    return axiosClient.post(url)
  },

  postUserNoticationDelete(id: number): Promise<ApiResponse<GetUserNoticationCommonResponse>> {
    const url = `user/notifications/${id}/delete`
    return axiosClient.post(url)
  },

  postUserNoticationRead(id: number): Promise<ApiResponse<GetUserNoticationCommonResponse>> {
    const url = `user/notifications/${id}/read`
    return axiosClient.post(url)
  },

  postUserNoticationReadAll(type: string): Promise<ApiResponse<GetUserNoticationCommonResponse>> {
    const url = 'user/notifications/read-all'
    return axiosClient.post(url, { type: type })
  }
}

export default mailbox
