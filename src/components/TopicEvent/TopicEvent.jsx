import React from 'react'
import './TopicEvent.scss'

import { getTopicEventTitle } from 'services/TopicEvent'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const TopicEvent = ({ topicEvent = [] }) => {

	return (
		<div className='te-container'>
			{topicEvent.map((topic) => {
				const { vieTitle } = getTopicEventTitle(topic.groupName)
				return (
					<div key={vieTitle} className='tp-container'>
						<div className='tp-header'>
							<div className="tp-title">{vieTitle}</div>
							<div className="tp-nav"></div>
						</div>
						<div className='tp-main'>
						<Swiper slidesPerView={4} spaceBetween={8}>
								{topic.listPlaylist.map((playlist) => {

									return (
										<SwiperSlide key={playlist.key}>
											<div className='pl-container'>
												<img src={playlist.thumbnail} alt={playlist.title} />
												<div className='pl-title'>{playlist.title}</div>
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
