import { removeVietnameseTones } from 'share'
import { toast } from 'react-toastify'

export const covertTimestamp = (time) => {
  const date = new Date(time)

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
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
  const playlistTitle = replaceDashUrl(title)

  return `/playlist/${playlistTitle}.&k=${keyId}`
}

export const createSongUrl = (title, keyId) => {
  if (title && keyId) {
    return `bai-hat/${replaceDashUrl(removeVietnameseTones(title))}&k=${keyId}`
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
    return `chu-de/${replaceDashUrl(removeVietnameseTones(title))}&k=${keyId}`
  } else {
    return '/'
  }
}

export const createTop100Url = (title, keyId) => {
  if (title && keyId) {
    return `top-100/${replaceDashUrl(removeVietnameseTones(title))}&k=${keyId}`
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

export const copyNotify = (lang) =>
  toast(lang === 'vi' ? '🦄 Đã sao chép link.' : '🦄 Copied link successfully.', {
    position: 'bottom-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

export const animationConfig = {
  animationIn: 'fadeIn',
  animationOut: 'fadeOut',
  animationInDuration: 100,
  animationOutDuration: 100,
  style: { zIndex: 1 },
}
