import { Autoplay } from 'swiper'

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
