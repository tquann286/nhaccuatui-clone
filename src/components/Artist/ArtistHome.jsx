import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { SlideNextButton, SlidePrevButton } from 'components/CustomNav/CustomNav'
import 'swiper/scss'
import { SongSquare } from 'components'

const ArtistHome = ({ defineLang, songNearly = [], artist = {} }) => {
  return (
    <div className='pt-32px px-32px'>
      <Swiper slidesPerView={4} speed={300} spaceBetween={8} className='flex flex-col-reverse px-32px'>
        <div className='flex items-center justify-between w-full mb-16px'>
          <div className='w-fit h-12 leading-12 text-22px font-bold color-0-88'>{defineLang('Gần đây', 'Recent')}</div>
          <div className='color-0-6'>
            <SlidePrevButton />
            <SlideNextButton />
          </div>
        </div>
        {songNearly.map((song) => (
          <SwiperSlide key={song.key}>
            <SongSquare {...song} keyId={song.key} backupImg={artist.imageUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ArtistHome
