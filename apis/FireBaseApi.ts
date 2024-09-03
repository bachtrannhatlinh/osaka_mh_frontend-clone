import axiosClient from './axiosClient'
import { ApiResponse, RaceResult } from 'models'

const fireBaseApi = {
  subscribe(name: string, tokenFireBase: string): Promise<ApiResponse<string>> {
    const url = `/fcm/subscribe/${name}/${tokenFireBase}`
    return axiosClient.post(url)
  },

  unsubscribe(name: string, tokenFireBase: string): Promise<ApiResponse<RaceResult>> {
    const url = `/fcm/subscribe/${name}/${tokenFireBase}`
    return axiosClient.post(url)
  }
}

export default fireBaseApi
