import { removeVietnameseTones, copyToClipboard } from 'share'
import { toast } from 'react-toastify'
import { PROXY } from 'share/constants'
import { toastNotify } from 'share/toast'
import { getView } from 'api'

export const covertTimestamp = (time) => {
  const date = new Date(time)

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const createSlug = (name) => {
  if (name) return `${replaceDashUrl(removeVietnameseTones(name.trim()))}`
}

export const getPlaylistKeyId = (url) => {
  const startIndex = url.indexOf('va.') + 3
  const keyIdLength = 12

  if (startIndex) {
    return url.substring(startIndex, keyIdLength)
  } else {
    return null
  }
}

export const replaceDashUrl = (url) => {
  return url.replaceAll(' ', '-').replaceAll('/', '-')
}

export const createPlaylistUrl = (title, keyId) => {
  if (title && keyId) {
    const playlistTitle = replaceDashUrl(title)

    return `/playlist/${playlistTitle}&k=${keyId}`
  } else {
    return '/'
  }
}

export const createSongUrl = (title, keyId) => {
  if (title && keyId) {
    return `/bai-hat/${createSlug(title)}&k=${keyId}`
  } else {
    return '/'
  }
}

export const createArtistUrl = (name, shortLink) => {
  if (name && shortLink) {
    return `/nghe-si/${shortLink}`
  } else {
    return `/tim-kiem?q=${name}`
  }
}

export const createTopicUrl = (title, keyId) => {
  if (title && keyId) {
    return `/chu-de/${createSlug(title)}&k=${keyId}`
  } else {
    return '/'
  }
}

export const createTop100Url = (title, keyId) => {
  if (title && keyId) {
    return `/top-100/${createSlug(title)}&k=${keyId}`
  } else {
    return '/'
  }
}

export const createVideoUrl = (keyId, title, artists) => {
  const artistLink = artists.reduce((acc, cur, i) => {
    if (!cur.shortLink) {
      return `${acc}${i > 0 ? '-ft-' : ''}${replaceDashUrl(removeVietnameseTones(cur.name))}`
    }
    if (acc) {
      return `${acc}${i > 0 ? '-ft-' : ''}${cur.shortLink}`
    }
    return `${cur.shortLink}`
  }, '')
  const videoLink = `/video/${replaceDashUrl(removeVietnameseTones(title))}-${artistLink}`.toLocaleLowerCase() + `&k=${keyId}`

  return videoLink
}

export const createTop20Url = (category) => {
  if (category) {
    return `/bang-xep-hang/top-20?q=${category}`
  } else {
    return '/'
  }
}

export const getListSongsKey = (songs) => songs.map((song) => song.key || song.songId || song.keyId)

export const getNavigateUrl = (url) => {
  const linkStartIndex = url.indexOf('nhaccuatui.com/') + 15
  const keyStartIndex = url.indexOf('.html') - 12
  const keyEndIndex = url.indexOf('.html')

  const keyId = url.substring(keyStartIndex, keyEndIndex)

  if (url.includes('/bai-hat/')) {
    const songStartIndex = linkStartIndex + 8
    const songEndIndex = keyStartIndex

    const songUrl = url.substring(songStartIndex, songEndIndex)
    return `/bai-hat/${songUrl}&k=${keyId}`
  } else if (url.includes('/playlist/')) {
    const playlistStartIndex = linkStartIndex + 9
    const playlistEndIndex = keyStartIndex

    const playlistUrl = url.substring(playlistStartIndex, playlistEndIndex)
    return `/playlist/${playlistUrl}&k=${keyId}`
  } else {
    return '/'
  }
}

export const copyNotify = (defineLang) =>
  toast(defineLang('🦄 Đã sao chép link.', '🦄 Copied link successfully.'), {
    position: 'bottom-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: localStorage.getItem('theme'),
  })

export const handleFocusInput = (e) => {
  e.target.parentElement.classList.add('focus')
}

export const handleBlurInput = (e) => {
  e.target.parentElement.classList.remove('focus')
}

export const handleCopySong = (event, defineLang, title, songId) => {
  event.stopPropagation()
  if (title && songId && defineLang) {
    const songLink = `${PROXY}${createSongUrl(title, songId)}`

    copyToClipboard(songLink)
    copyNotify(defineLang)
  } else {
    toastNotify(defineLang('Có lỗi khi sao chép liên kết bài hát', 'An  error has occurred when copying song link'), 'error')
  }
}

export const handleCopyPlaylist = (event, title, keyId, defineLang) => {
  event.stopPropagation()
  if (title && keyId && defineLang) {
    const playlistLink = `${PROXY}${createPlaylistUrl(title, keyId)}`

    copyToClipboard(playlistLink)
    copyNotify(defineLang)
  } else {
    toastNotify(defineLang('Có lỗi khi sao chép liên kết danh sách phát', 'An  error has occurred when copying playlist link'), 'error')
  }
}

export const handleCopyVideo = (event, title, keyId, artists, defineLang) => {
  event.stopPropagation()
  if (title && keyId && defineLang) {
    const videoLink = `${PROXY}${createVideoUrl(keyId, title, artists)}`

    copyToClipboard(videoLink)
    copyNotify(defineLang)
  } else {
    toastNotify(defineLang('Có lỗi khi sao chép liên kết video', 'An  error has occurred when copying video link'), 'error')
  }
}

export const calcPaginationPage = (total, itemPerPage = 36) => Math.ceil(total / itemPerPage)

// API
export const getSongsView = async (listSongKeys) => {
  try {
    if (listSongKeys) {
      const data = await getView(listSongKeys)
      if (data) return data.song
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const isFetchingFail = (status, defineLang) => {
  if (status === 'error') {
    toastNotify(defineLang('Có lỗi khi lấy dữ liệu từ server.', 'A server error occurred while retrieving data.'), 'error')
  }
}

export const handleCopyProxy = (defineLang, link) => {
  copyToClipboard(`${PROXY}${link}`)
  copyNotify(defineLang)
}

export const getCurrentDay = () => new Date().toLocaleDateString()