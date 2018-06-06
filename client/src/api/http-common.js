/*
 * Axios is the most popular HTTP Client library,
 * by the time of writing this piece of code.
 */
import axios from 'axios'
/** Store **/
import store from '../store/'
/** Router **/
import router from '../router'

// A new instance of axios with a custom config.
let HTTP = axios.create({
  baseURL: 'http://localhost:3000/api/'
})

// Add a request interceptor
HTTP.interceptors.request.use(function (config) {
  if (localStorage.getItem('token') !== null) {
    config.headers.common['access_token'] = localStorage.getItem('token')
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

// Add a response interceptor
HTTP.interceptors.response.use(function (response) {
  return response
}, function(error) {
  if (error.response.status === 401) {
    store.dispatch('logout')
    router.push('/login')
  }
  return Promise.reject(error.response.data)
})

export default HTTP