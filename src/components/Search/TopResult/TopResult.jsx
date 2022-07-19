import React from 'react'
import './TopResult.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import { SlideNextButton, SlidePrevButton } from 'components/CustomNav/CustomNav'
import 'swiper/css'

import { topResultSwiperProps } from 'services/Search/SearchResult'
import { PlaylistResult, TopSongResult } from 'components'

const TopResult = ({ playlist, song, defineLang, isLoading }) => {
  if (isLoading) return null

  return (
    <div className='top-result-container'>
      <div className='tr-title'>
        <div className='tr-title-lead'>{defineLang('Top tìm kiếm', 'Top Result')}</div>
      </div>
      <Swiper className='tr-swiper' {...topResultSwiperProps}>
        {playlist && (
          <React.Fragment>
            {playlist.map((pl) => (
              <SwiperSlide key={pl.key}>
                <PlaylistResult playlist={pl} defineLang={defineLang} />
              </SwiperSlide>
            ))}
          </React.Fragment>
        )}
        {song && (
          <React.Fragment>
            {song.map((sg) => (
              <SwiperSlide key={sg.key}>
                <TopSongResult song={sg} defineLang={defineLang} />
              </SwiperSlide>
            ))}
          </React.Fragment>
        )}
      </Swiper>
    </div>
  )
}

export default TopResult
