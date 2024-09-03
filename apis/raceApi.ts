import { decode } from 'js-base64'
import axiosClient from './axiosClient'

import {
  ApiResponse,
  CancelCountDown,
  enterRacePassword,
  GetRaceCancelParams,
  GetRaceListParams,
  GetRaceListResponse,
  GetRevealPositionsResponse,
  JoinRaceBody,
  Race,
  RaceResult,
  StepHorseList
} from 'models'
import { checkFormatId } from 'utils/helper'

const raceApi = {
  getRaceList(params?: GetRaceListParams): Promise<ApiResponse<GetRaceListResponse>> {
    const url = '/races'
    return axiosClient.get(url, { params })
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRaceCancel(params?: GetRaceCancelParams): Promise<ApiResponse<any>> {
    const url = '/user/horses/take-part'
    return axiosClient.get(url, { params })
  },

  getRace(raceId: string): Promise<ApiResponse<Race>> {
    try {
      const decodeId = decode(raceId)
      checkFormatId(decodeId)
      const url = `/races/${decodeId}`
      return axiosClient.get(url)
    } catch (err) {
      return axiosClient.get('')
    }
  },

  joinRace(raceId: number, body: JoinRaceBody): Promise<ApiResponse<string>> {
    const url = `/races/${raceId}/enter`
    return axiosClient.post(url, body)
  },

  getRaceResult(raceId: string): Promise<ApiResponse<RaceResult>> {
    const url = `/races/${decode(raceId)}/result`
    return axiosClient.get(url)
  },

  getRaceLive(raceId: string): Promise<ApiResponse<RaceResult>> {
    try {
      const decodeId = decode(raceId)
      checkFormatId(decodeId)
      const url = `/races/${decodeId}/live`
      return axiosClient.get(url)
    } catch (err) {
      return axiosClient.get('')
    }
  },

  getRaceData(url: string): Promise<StepHorseList> {
    return axiosClient.get(url)
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRaceResultPopup(params?: any): Promise<ApiResponse<GetRaceListResponse>> {
    const url = '/races/result'
    return axiosClient.get(url, { params })
  },

  deleteCancelCountDown(raceId: number): Promise<ApiResponse<CancelCountDown>> {
    const url = `/races/${raceId}/cancel`
    return axiosClient.delete(url)
  },

  getRevealPositions(raceId: number): Promise<ApiResponse<GetRevealPositionsResponse>> {
    const url = `/races/${raceId}/reveal-positions`
    return axiosClient.get(url)
  },

  postRacePassword(raceId: string, body: enterRacePassword): Promise<ApiResponse<string>> {
    const decodeId = decode(raceId)
    checkFormatId(decodeId)
    const url = `/races/${decodeId}/check-password`
    return axiosClient.post(url, body)
  }
}

export default raceApi
