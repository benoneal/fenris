import axios from 'axios'
import {fetchCache} from './cache'

const config = {
  credentials: 'same-origin',
  xsrfCookieName: 'x-csrf-jwt',
  xsrfHeaderName: 'x-csrf-jwt'
}

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(name + '=([^;]+)'))
  return (match && match.length > 1) ? match[1] : ''
}

if (typeof window !== 'undefined') {
  axios.defaults.headers.post[config.xsrfHeaderName] = getCookie(config.xsrfCookieName)
}

const getData = ({data}) => data
const setCSRFHeader = (res) => {
  axios.defaults.headers.post[config.xsrfHeaderName] = res.headers[config.xsrfHeaderName]
  return res
}
export const post = (url, data, options) => axios.post(url, data, {...config, ...options}).then(getData)
export const get = (url, options) => axios.get(url, {...config, ...options}).then(setCSRFHeader).then(getData)
export const cachedGet = fetchCache(get)
