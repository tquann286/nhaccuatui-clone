import axios from 'axios'
import { sha512 } from 'js-sha512'

const PROXY_URL = 'https://nct.napdev.workers.dev/'
const API_URL = 'https://beta.nhaccuatui.com/api'

const API_KEY = 'e3afd4b6c89147258a56a641af16cc79'
const SECRET_KEY = '6847f1a4fc2f4eb6ab13f9084e082ef4'

const client = axios.create({
  baseURL: typeof window === 'object' ? PROXY_URL + API_URL : API_URL,
  params: {
    a: API_KEY,
  },
})

client.interceptors.request.use((config) => {
  const now = String(Date.now())
  const hash = sha512.hmac(SECRET_KEY, now)
  config.params.t = now
  config.params.s = hash
  return config
})

client.interceptors.response.use((res) => res.data)

const joinQueryString = (obj) =>
  Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&')

export const getMaybeHit = () => client.post('search/maybehit')

export const getView = (listSongKeys) => client.post('counter/view', joinQueryString({ listSongKeys }))

export const getSearchByKeywords = (key, pageSize = 12) => client.post('search/all', joinQueryString({ key, pageSize }))

export const getSearchSong = (key, pageIndex = 1, pageSize = 36) =>client.post('search/song', joinQueryString({ key, pageIndex, pageSize }))

export const getSearchPlaylist = (key, pageIndex = 1, pageSize = 36) =>client.post('search/playlist', joinQueryString({ key, pageIndex, pageSize }))