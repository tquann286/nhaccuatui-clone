import React, { useState } from 'react'
import { useSwiper } from 'swiper/react'

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

export const SlideNextButton = () => {
	const swiper = useSwiper()
	const [isReachEnd, setIsReachEnd] = useState(false)

	swiper.on('slideChange', () => {
		if (swiper.isEnd) {
			setIsReachEnd(true)
		} else {
			setIsReachEnd(false)
		}
	})

	return (
		<div className={`cusArrow nextArr ${isReachEnd ? 'disabled' : ''}`} onClick={() => swiper.slideNext()}>
			<IoIosArrowForward />
		</div>
	)
}

export const SlidePrevButton = () => {
	const swiper = useSwiper()
	const [isReachBeginning, setIsReachBeginning] = useState(true)

	swiper.on('slideChange', () => {
		if (swiper.isBeginning) {
			setIsReachBeginning(true)
		} else {
			setIsReachBeginning(false)
		}
	})

	return (
		<div className={`cusArrow prevArr ${isReachBeginning ? 'disabled' : ''}`} onClick={() => swiper.slidePrev()}>
			<IoIosArrowBack />
		</div>
	)
}
