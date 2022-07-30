import React from 'react'
import { Link } from 'react-router-dom'
import './TopicSlider.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import 'swiper/scss/effect-fade'
import 'swiper/scss/autoplay'

import { createTopicUrl } from 'share/utilities'
import { topicSwiperProps } from 'services/Topic/TopicSlider'

const TopicSlider = ({ defineLang, topicCover }) => {
  console.log('topicCover: ', topicCover)

  if (!topicCover) return null

  
  return (
    <div className='topic-slider-container bg-color-0-05'>
      <Swiper { ... topicSwiperProps }>
        {topicCover.map(topic => {
          const { backgroundColor, coverImageURL, description, key, thumbURL, title } = topic
          const imgStyle = {
            backgroundColor,
            backgroundImage: `url(${coverImageURL})`
          }

          return (
            <SwiperSlide key={key} >
              <Link to={createTopicUrl(title, key)}>
                <div className='topic-slide-img' style={imgStyle}></div>
              </Link>

            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default TopicSlider
