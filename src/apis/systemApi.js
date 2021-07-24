import axiosClient from './axiosClient'

const systemApi = {
  updateSystem(spaceId, data) {
    const url = `/spaces/${spaceId}`
    return axiosClient.post(url, data)
  }
}

export default systemApi
