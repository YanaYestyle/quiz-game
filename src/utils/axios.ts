import axios, { type AxiosInstance } from 'axios'
import { errorStore } from '../stores/error'
import { loaderStore } from '../stores/loader'

const error = errorStore()
const loader = loaderStore()

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://opentdb.com'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiBaseUrl
})

axiosInstance.interceptors.request.use(
  (config) => {
    loader.setLoading(true)
    error.setErrorMessage('')
    return config
  },
  (err) => {
    loader.setLoading(false)
    error.setErrorMessage('Failed to send request')
    return Promise.reject(err)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    loader.setLoading(false)
    return response
  },
  (err) => {
    loader.setLoading(false)
    error.setErrorMessage(err.response?.data?.message || 'An unexpected error occurred')
    return Promise.reject(err)
  }
)

export default axiosInstance
