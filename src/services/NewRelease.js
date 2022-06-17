import removeVietnameseTones from 'share/removeVietnameseTones'
import { replaceDashUrl } from 'share/utilities'

export const createSongUrl = (title, keyId) => {
  return `bai-hat/${replaceDashUrl(removeVietnameseTones(title))}&k=${keyId}`
}

export const createArtistUrl = (artistName, artistId) => {
  return `nghe-si/${artistName}&k=${artistId}`
}

export const activeSlideSettings = {
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
}