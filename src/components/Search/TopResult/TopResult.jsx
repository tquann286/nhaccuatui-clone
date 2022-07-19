import React from 'react'
import './TopResult.scss'

import { Swiper } from 'swiper/react'
import { SlideNextButton, SlidePrevButton } from 'components/CustomNav/CustomNav'
import 'swiper/scss'
import 'swiper/scss/navigation'

import { topResultSwiperProps } from 'services/Search/SearchResult'
import { PlaylistResult, TopSongResult } from 'components'

const TopResult = ({ playlist, song, defineLang }) => {
  // console.log(playlist)

  return (
    <div className='top-result-container'>
      <div className='tr-title'>
        <div className='tr-title-lead'>{defineLang('Top tìm kiếm', 'Top Result')}</div>
      </div>
      <div className='tr-main'>
        <Swiper className='tr-swiper' {...topResultSwiperProps}>
          {playlist && <PlaylistResult playlists={playlist} defineLang={defineLang} />}
          {song && <TopSongResult songs={song} defineLang={defineLang} />}
        </Swiper>
      </div>
    </div>
  )
}

export default TopResult
