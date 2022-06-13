import React from 'react'
import './TopicEvent.scss'

import { getTopicEventTitle } from 'services/TopicEvent'
import { CustomNextArrow, CustomPrevArrow } from './CustomArrow/CustomArrow'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

const TopicEvent = ({ topicEvent = [] }) => {
	console.log(topicEvent)

	const settings = {
    accessibility: false,
		infinite: false,
		speed: 800,
		slidesToShow: 4,
		slidesToScroll: 3,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />
	}

	return (
		<div className='te-container'>
			{topicEvent.map((topic) => {
				const { vieTitle } = getTopicEventTitle(topic.groupName)
				return (
					<div key={vieTitle} className='tp-container'>
						<div className='tp-title'>{vieTitle}</div>
						<div className='tp-main'>
							<Slider {...settings}>
								{topic.listPlaylist.map((playlist) => {
									return (
										<div className='pl-container'>
											<div className='pl-img'>
												<img src={playlist.thumbnail} alt={playlist.title} />
											</div>
											<div className='pl-title'>{playlist.title}</div>
										</div>
									)
								})}
							</Slider>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default TopicEvent
