import React, { useState, useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { SlideNextButton, SlidePrevButton } from 'components/CustomNav/CustomNav'
import 'swiper/scss'
import { CommonSong, SongSquare } from 'components'
import Grid from '@mui/material/Grid'
import { getListSongsKey, getSongsView } from 'share/utilities'

const ArtistHome = ({ defineLang, songNearly = [], artist = {}, song = {} }) => {
  const { song: songs = [] } = song
  const [songsView, setSongView] = useState({})

  useEffect(() => {
    try {
      const getSongsViewState = async (listSongsKey) => {
        const songsView = await getSongsView(listSongsKey)
        setSongView(songsView)
      }
      getSongsViewState(getListSongsKey(songs))
    } catch (error) {
      throw new Error(error)
    }
  }, [songs])

  return (
    <div className='pt-32px px-32px'>
      <Swiper slidesPerView={4} speed={300} spaceBetween={16} className='flex flex-col-reverse px-32px'>
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
      {songs.length === 0 || (
        <div className="mt-16">
          <div className="mb-24px text-22px font-bold color-0-88">{defineLang('Bài hát', 'Song')}</div>
          <div className="mt-16px">
            <Grid container spacing={2}>
              {songs.map(song => (
                <Grid item xs={6} key={song.key} className='!py-2px'>
                  <CommonSong { ... song } songView={songsView[song.key] || 0} keyId={song.key} backupImg={artist.imageUrl} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArtistHome
