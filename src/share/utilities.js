import { removeVietnameseTones } from 'share'
import { toast } from 'react-toastify'
import { PROXY } from 'share/constants'

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
  return url.replaceAll(' ', '-')
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
    return `bai-hat/${createSlug(title)}&k=${keyId}`
  } else {
    return '/'
  }
}

export const createArtistUrl = (name, shortLink, artistId) => {
  if (name && shortLink && artistId) {
    return `nghe-si/${shortLink}&k=${artistId}`
  } else {
    return `tim-kiem/q=${replaceDashUrl(name)}`
  }
}

export const createTopicUrl = (title, keyId) => {
  if (title && keyId) {
    return `chu-de/${createSlug(title)}&k=${keyId}`
  } else {
    return '/'
  }
}

export const createTop100Url = (title, keyId) => {
  if (title && keyId) {
    return `top-100/${createSlug(title)}&k=${keyId}`
  } else {
    return '/'
  }
}

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

export const handleCopySong = (e, defineLang, title, songId) => {
  e.stopPropagation()

  const songLink = `${PROXY}/${createSongUrl(title, songId)}`
  navigator.clipboard.writeText(songLink)
  copyNotify(defineLang)
}

export const handleCopyPlaylist = (event, title, keyId, defineLang) => {
	event.stopPropagation()
	navigator.clipboard.writeText(`${PROXY}${createPlaylistUrl(title, keyId)}`)
	copyNotify(defineLang)
}
