import { Autoplay } from 'swiper'
import { removeVietnameseTones } from 'share'
import { replaceDashUrl } from 'share/utilities'

export const trendArtSwiperProps = {
  direction: 'vertical',
  className: 'ta-swiper-container',
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  modules: [Autoplay],
  loop: true,
}

export const createSearchUrl = (query) => {
  if (query) {
    return `/tim-kiem?q=${replaceDashUrl(removeVietnameseTones(query))}`
  } else {
    return '/'
  }
}