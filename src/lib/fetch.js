import axios from 'axios'
import {fetchCache} from './cache'

const getData = ({data}) => data

export const post = (url, data, options) => axios.post(url, data, {...config, ...options}).then(getData)
export const get = (url, options) => axios.get(url, {...config, ...options}).then(getData)
export const cachedGet = fetchCache(get)
