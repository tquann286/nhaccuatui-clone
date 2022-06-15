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
							disableOnInteraction: true,
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
									{({isActive}) => isActive && (
										<div className='nr-active-container'>
											<div className='nr-active-img' title={title}>
												<img src={thumbnail} alt={title} />
											</div>
											<div className='nr-active-detail'>
												<h4>{title}</h4>
												<div className='nr-artist-container'>
													<div className='nr-artist-main'>
														{artists.map((artist) => {
															const { artistId, imageUrl, name, shortLink } =
																artist
	
															return (
																<div key={artistId} className='nr-artist-img'>
																	<img src={imageUrl} alt={name} />
																</div>
															)
														})}
														<div className='nr-artist-name'>
															{artists.map((artist) => {
																const { artistId, name, shortLink } = artist
	
																return <span key={artistId}>{name}</span>
															})}
														</div>
													</div>
												</div>
											</div>
										</div>
									)}
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
