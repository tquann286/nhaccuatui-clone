import React from 'react'
import { Link } from 'react-router-dom'
import './HotTopic.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperSlider from './SwiperSlider'
import 'swiper/scss'
import {
	SlidePrevButton,
	SlideNextButton,
} from 'components/CustomNav/CustomNav'

import { useStore } from 'store'

const HotTopic = ({ hotTopic }) => {
  const [state] = useStore()
  const { lang } = state

	return (
		<div className='ht-container'>
			<div className='ht-title'>
				<Link to='/chu-de'>{lang === 'vi' ? 'Chủ đề hot' : 'Hot topic'}</Link>
			</div>
			<div className='ht-main'>
				<Swiper slidesPerView={4} spaceBetween={8}>
					<div className='ht-nav color-0-5'>
						<SlidePrevButton />
						<SlideNextButton />
					</div>
					{hotTopic.map((topic) => {
						const { key, thumbURL, title } = topic
            
						return (
							<SwiperSlide key={key}>
								<SwiperSlider
									keyId={key}
									thumbURL={thumbURL}
									title={title}
								/>
							</SwiperSlide>
						)
					})}
				</Swiper>
			</div>
		</div>
	)
}

export default HotTopic
