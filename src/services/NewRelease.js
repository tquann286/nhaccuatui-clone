import removeVietnameseTones from 'share/removeVietnameseTones'
import { replaceDashUrl } from 'share/utilities'

export const createSongUrl = (title, keyId) => {
  return `bai-hat/${replaceDashUrl(removeVietnameseTones(title))}&k=${keyId}`
}

export const createArtistUrl = (artistName, artistId) => {
  return `nghe-si/${artistName}&k=${artistId}`
}