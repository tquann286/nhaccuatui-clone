import React from 'react'
import './TopResult.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import { SlideNextButton, SlidePrevButton } from 'components/CustomNav/CustomNav'
import 'swiper/scss'
import 'swiper/scss/navigation'

import { topResultSwiperProps } from 'services/Search/SearchResult'
import { ImageOverlay } from 'components'

const TopResult = ({ playlists, song, defineLang }) => {
  return (
    <div className='top-result-container'>
      <div className='tr-title'>
        <div className="tr-title-lead">{defineLang('Top tìm kiếm', 'Top Result')}</div>

      </div>
      <div className='tr-main'>
        <Swiper className='tr-swiper' {...topResultSwiperProps}>
          {playlists && playlists.map(playlist => {
            const { artists, key, title, type, thumbnail } = playlist

            const handleCopyLink = () => {
              
            }

            return (
              <SwiperSlide key={key}>
                <div className="tr-slider">
                  <div className="tr-thumb-container">
                    <div className="tr-thumb-main">
                      <ImageOverlay key={key} imageUrl={thumbnail} title={title} copyLink handleCopyLink={handleCopyLink} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default TopResult
