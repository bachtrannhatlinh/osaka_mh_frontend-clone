import axios, { AxiosResponse } from 'axios'
import qs from 'qs'

import { configs, constants } from 'apps'
import { getBearerToken } from 'utils/helper'

const axiosClient = axios.create({
  baseURL: configs.baseApiUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: params => qs.stringify(params)
})

axiosClient.interceptors.request.use(
  config => {
    const stringifiedToken = localStorage.getItem(constants.ACCESS_TOKEN_KEY) || ''
    const token = JSON.parse(stringifiedToken)
    const bearerToken = getBearerToken(token)

    if (config.headers) {
      config.headers['Authorization'] = bearerToken
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data)
    }

    return Promise.reject(error)
  }
)

export default axiosClient
