import React from 'react'
import './Top100.scss'

import { createTop100Url } from 'share/utilities'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperSlider from './SwiperSlider'
import { SlidePrevButton, SlideNextButton } from 'components/CustomNav/CustomNav'

const Top100 = ({ top100List }) => {
  console.log(top100List)

  return (
    <div className="t1-container">
      <div className="t1-title">
        <Link to={createTop100Url(top100List[0].title, top100List[0].key)}>Top 100</Link>
      </div>
      <div className="t1-main">
      <Swiper slidesPerView={4} spaceBetween={8}>
								<div className='t1-nav'>
									<SlidePrevButton />
									<SlideNextButton />
								</div>
								{top100List.map((playlist) => {
									const { key, thumbnail, title } = playlist

									return (
										<SwiperSlide key={key}>
											<SwiperSlider
												keyId={key}
												thumbnail={thumbnail}
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

export default Top100