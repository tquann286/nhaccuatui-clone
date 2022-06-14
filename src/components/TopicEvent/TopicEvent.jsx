import React from 'react'
import './TopicEvent.scss'

import { getTopicEventTitle } from 'services/TopicEvent'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { SlidePrevButton, SlideNextButton } from './CustomNav'

const TopicEvent = ({ topicEvent = [] }) => {
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
											<div className='pl-container'>
												<img src={thumbnail} alt={title} />
												<div className='pl-title' title={title}>
													{title}
												</div>
											</div>
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
