import axiosClient from './axiosClient'

const authApi = {
  login(data) {
    const url = '/users/login'
    return axiosClient.post(url, data)
  },
  register(data) {
    const url = '/users/signup'
    return axiosClient.post(url, data)
  }
}

export default authApi
