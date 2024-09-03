import { decode } from 'js-base64'
import {
  ApiResponse,
  GetHorseCareerListByTokenIdParams,
  GetHorseCareerListParams,
  GetHorseCareerResponse,
  GetHorseDetailByTokenId,
  GetTopParams,
  Horse,
  HorseAvailable,
  HouseInRace,
  HouseStats,
  LevelUpHorse,
  TopHorse,
  TopStable,
  UpdateStatsParams
} from 'models'
import { checkFormatId } from 'utils/helper'
import axiosClient from './axiosClient'

const horseApi = {
  getHorseAvailableDetail(horseId: string): Promise<ApiResponse<HorseAvailable>> {
    const url = `/horse/${horseId}`
    return axiosClient.get(url)
  },

  getHorseDetail(horseId: string): Promise<ApiResponse<Horse>> {
    const url = `/horse/${horseId}`
    return axiosClient.get(url)
  },

  getHorseDetailByTokenId(params: GetHorseDetailByTokenId = {}): Promise<ApiResponse<Horse>> {
    const url = `/horse/details`
    return axiosClient.get(url, { params })
  },

  getHorseDetailRaceView(token_id: string, raceId: string): Promise<ApiResponse<Horse>> {
    try {
      const decodeId = decode(raceId)
      checkFormatId(decodeId)
      const url = `/horse/${token_id}/race/${decodeId}`
      return axiosClient.get(url)
    } catch (err) {
      return axiosClient.get('')
    }
  },

  getTopHorses(params: GetTopParams = {}): Promise<ApiResponse<TopHorse[]>> {
    const url = '/horse/top-horses'
    return axiosClient.get(url, { params })
  },

  getTopStables(params: GetTopParams = {}): Promise<ApiResponse<TopStable[]>> {
    const url = '/horse/top-stables'
    return axiosClient.get(url, { params })
  },

  getHorseCarrerList(
    params: GetHorseCareerListParams = { horseId: '0' }
  ): Promise<ApiResponse<GetHorseCareerResponse>> {
    const url = `horse/${params.horseId}/career`
    return axiosClient.get(url, { params })
  },

  getHorseCarrerListByTokenId(
    params: GetHorseCareerListByTokenIdParams = { token_id: '0' }
  ): Promise<ApiResponse<GetHorseCareerResponse>> {
    const url = `horse/${params.token_id}/career`
    return axiosClient.get(url, { params })
  },

  postUpdateStats(horseId: number, params: UpdateStatsParams[]): Promise<ApiResponse<UpdateStatsParams>> {
    const url = `horse/${horseId}/update-stats`
    return axiosClient.post(url, params)
  },

  postLevelUpHorse(horseId: number): Promise<ApiResponse<LevelUpHorse>> {
    const url = `user/horse/${horseId}/level-up`
    return axiosClient.post(url)
  },

  getHouseStats(): Promise<ApiResponse<HouseStats>> {
    const url = `/master-data/horse/horse-stats`
    return axiosClient.get(url)
  },

  getHorseIsInRace(horseId: string, params: { statuses: string }): Promise<ApiResponse<HouseInRace>> {
    const url = `horse/${horseId}/is-in-race`
    return axiosClient.get(url, { params })
  }
}

export default horseApi
