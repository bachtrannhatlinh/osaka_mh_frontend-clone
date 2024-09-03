import {
  ApiResponse,
  CoinUser,
  connectH2H,
  CurrentUser,
  GetMyHorseAvailableListResponse,
  GetMyHorseListResponse,
  MyHorseListParams,
  SyncHorse,
  UserAvailableHorses,
  UserInformationResponse
} from 'models'
import axiosClient from './axiosClient'

const userApi = {
  getCurrentUserInfo(): Promise<ApiResponse<CurrentUser>> {
    const url = '/user/information'
    return axiosClient.get(url)
  },

  getUserHorseList(params: MyHorseListParams): Promise<ApiResponse<GetMyHorseListResponse>> {
    const url = 'user/horses'
    return axiosClient.get(url, { params })
  },

  getUserAvailableHorses(params: UserAvailableHorses): Promise<ApiResponse<GetMyHorseAvailableListResponse>> {
    const url = 'user/available-horses'
    return axiosClient.get(url, { params })
  },

  postUpdateUser(params: FormData): Promise<ApiResponse<CurrentUser>> {
    const url = 'user/update-information'
    return axiosClient.post(url, params, { headers: { 'Content-Type': 'multipart/form-data' } })
  },

  getUserItems(): Promise<ApiResponse<CoinUser>> {
    const url = '/user/user-items'
    return axiosClient.get(url)
  },

  getSyncHorse(): Promise<ApiResponse<SyncHorse>> {
    const url = '/user/sync-horse'
    return axiosClient.get(url)
  },

  postConnectH2H(data: connectH2H): Promise<ApiResponse<SyncHorse>> {
    const url = '/user/connect-h2h'
    return axiosClient.post(url, data)
  },

  getUserInformation(): Promise<ApiResponse<UserInformationResponse>> {
    const url = '/user/information'
    return axiosClient.get(url)
  },

  putUserInformation(): Promise<ApiResponse<UserInformationResponse>> {
    const url = '/user/toggle-first-login'
    return axiosClient.put(url)
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getNotificationMessage(): Promise<ApiResponse<any>> {
    const url = '/fcm/warning-notification'
    return axiosClient.get(url)
  }
}

export default userApi
