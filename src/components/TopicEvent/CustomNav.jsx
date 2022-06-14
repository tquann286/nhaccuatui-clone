import { React } from 'react'
import { useSwiper } from 'swiper/react'

export const SlideNextButton = () => {
	const swiper = useSwiper()

	return (
		<button onClick={() => swiper.slideNext()}>Slide to the next slide</button>
	)
}

export const SlidePrevButton = () => {
	const swiper = useSwiper()

	return (
		<button onClick={() => swiper.slidePrev()}>Slide to the Prev slide</button>
	)
}
