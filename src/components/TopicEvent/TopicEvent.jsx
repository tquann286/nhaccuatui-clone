import React from 'react'
import { useNavigate } from 'react-router-dom'
import './TopicEvent.scss'

import SwiperSlider from './SwiperSlider'

import { createPlaylistUrl } from 'share/utilities'
import { getTopicEventTitle } from 'services/TopicEvent'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import { SlidePrevButton, SlideNextButton } from './CustomNav'

const TopicEvent = ({ topicEvent = [] }) => {
	const navigate = useNavigate()

	const onNavigatePlaylist = (title, keyId) => {
		navigate(createPlaylistUrl(title, keyId))
	}

	return (
		<div className='te-container'>
			{topicEvent.map((topic) => {
				const { vieTitle } = getTopicEventTitle(topic.groupName)
				return (
					<div key={vieTitle} className='tp-container'>
						<div className='tp-header'>
							<div className='tp-title'>{vieTitle}</div>
						</div>
						<div className='tp-main'>
							<Swiper slidesPerView={4} spaceBetween={8}>
								<div className='tp-nav'>
									<SlidePrevButton />
									<SlideNextButton />
								</div>
								{topic.listPlaylist.map((playlist) => {
									const { key, thumbnail, title } = playlist

									return (
										<SwiperSlide key={key}>
											<SwiperSlider
												keyId={key}
												thumbnail={thumbnail}
												title={title}
												onNavigatePlaylist={onNavigatePlaylist}
											/>
										</SwiperSlide>
									)
								})}
							</Swiper>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default TopicEvent
