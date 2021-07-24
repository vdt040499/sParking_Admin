import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/',
  // baseURL: 'http://79ac4add273a.ngrok.io',
  // baseURL: 'https://votan-sparking.herokuapp.com/',
  headers: {
      'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const {config, status, data} = error.response;
  const URLS = ['/users/login', '/users/signup'];
  if (URLS.includes(config.url) && status === 401) {
    console.log('Error: ', data.message);
    throw new Error(data.message);
  }

  return Promise.reject(error);
});

export default axiosClient
