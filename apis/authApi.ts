/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from './axiosClient'
import {
  ApiResponse,
  PostLoginError,
  MetaMaskSignMessageError,
  GetRandomMessageResponse,
  PostLoginBody,
  PostLoginResponse
} from 'models'

export const isPostLoginError = (candidate: any): candidate is PostLoginError => candidate.code === 400

export const isMetaMaskSignMessageError = (candidate: any): candidate is MetaMaskSignMessageError =>
  typeof candidate.message === 'string'

const authApi = {
  getRandomMessage(): Promise<ApiResponse<GetRandomMessageResponse>> {
    const url = '/auth/random-message'
    return axiosClient.get(url)
  },

  postLogin(data: PostLoginBody): Promise<ApiResponse<PostLoginResponse>> {
    const url = '/auth/login'
    return axiosClient.post(url, data)
  }
}

export default authApi
