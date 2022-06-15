import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TopicEvent.scss'

import { BsFillPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'

import { createPlaylistUrl } from 'share/utilities'
import { getTopicEventTitle, handleOnCopyClick } from 'services/TopicEvent'

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
											<div className='pl-container'>
												<div
													className='pl-img-container'
													onClick={() => onNavigatePlaylist(title, key)}
												>
													<img src={thumbnail} alt={title} />
													<div className='pl-extensions'>
														<div className='pl-play-btn'>
															<BsFillPlayCircleFill />
														</div>
														<div
															className='pl-copy'
															onClick={(e) => handleOnCopyClick(e)}
														>
															<IoMdMore />
														</div>
													</div>
												</div>
												<div
													className='pl-title'
													title={title}
													onClick={() => onNavigatePlaylist(title, key)}
												>
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
