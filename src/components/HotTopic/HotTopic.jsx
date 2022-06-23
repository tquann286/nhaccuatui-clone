import React from 'react'
import { Link } from 'react-router-dom'
import './HotTopic.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import { SlidePrevButton, SlideNextButton } from 'components/CustomNav/CustomNav'

const HotTopic = ({ hotTopic }) => {
  console.log(hotTopic)

  return (
    <div className="ht-container">
      <div className="ht-title">
        <Link to='/chu-de'>Chủ đề hot</Link>
      </div>
      <div className="ht-main">
      
      </div>
    </div>
  )
}

export default HotTopic