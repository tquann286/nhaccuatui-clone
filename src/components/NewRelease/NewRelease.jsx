import React, { useState } from 'react'
import './NewRelease.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Thumbs, EffectFade } from 'swiper'
import 'swiper/scss/effect-fade'
import 'swiper/scss/thumbs'

const NewRelease = ({ newRelease: { song: newSong } }) => {
	console.log(newSong)
	const [thumbsSwiper, setThumbsSwiper] = useState(null)

	return (
		<div className='nr-container'>
			<div className='nr-title'>Mới phát hành</div>
			<div className='nr-main'>
				<div className='nr-active-slide'>
					<Swiper
						modules={[Autoplay, Thumbs, EffectFade]}
						thumbs={{ swiper: thumbsSwiper }}
						autoplay={{
							delay: 4000,
							disableOnInteraction: false,
						}}
						centeredSlides={true}
						loop={true}
						slidesPerView={1}
						effect={'fade'}
					>
						{newSong.map((song) => {
							const { key, artists, dateRelease, thumbnail, title } = song

							return (
								<SwiperSlide key={key}>
									<div className='nr-active-img' title={title}>
										<img src={thumbnail} alt={title} />
									</div>
								</SwiperSlide>
							)
						})}
					</Swiper>
				</div>
			</div>
		</div>
	)
}

export default NewRelease
