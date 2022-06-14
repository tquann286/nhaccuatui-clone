import { React } from 'react'
import { useSwiper } from 'swiper/react'

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import './TopicEvent.scss'

export const SlideNextButton = () => {
	const swiper = useSwiper()

	return (
		<div className='cusArrow nextArr' onClick={() => swiper.slideNext()}>
			<IoIosArrowForward />
		</div>
	)
}

export const SlidePrevButton = () => {
	const swiper = useSwiper()

	return (
		<div className='cusArrow nextArr' onClick={() => swiper.slidePrev()}>
			<IoIosArrowBack />
		</div>
	)
}
