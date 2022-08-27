import React, { useState, useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { SlideNextButton, SlidePrevButton } from 'components/CustomNav/CustomNav'
import 'swiper/scss'
import { CommonPlaylist, CommonSong, CommonVideo, SongSquare, Title } from 'components'
import Grid from '@mui/material/Grid'
import { getListSongsKey, getSlideVideos, getSongsView } from 'share/utilities'

const ArtistHome = ({ defineLang, songNearly = [], artist = {}, song = {}, playlist = {}, video = {} }) => {
  const { song: songs = [] } = song
  const { playlist: playlists = [] } = playlist
  const { video: videos = [] } = video
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
      <Title title={artist.name ? `${artist.name} - NhacCuaTui Clone` : 'NhacCuaTui Clone'} />
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
        <div className='mt-16'>
          <div className='mb-24px text-22px font-bold color-0-88'>{defineLang('Bài hát', 'Song')}</div>
          <div className='mt-16px'>
            <Grid container spacing={2}>
              {songs.map((song) => (
                <Grid item xs={6} key={song.key} className='!py-2px'>
                  <CommonSong {...song} songView={songsView[song.key] || 0} keyId={song.key} backupImg={artist.imageUrl} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
      {playlists.length === 0 || (
        <div className='mt-16'>
          <div className='mb-24px text-22px font-bold color-0-88'>{defineLang('Danh sách phát', 'Playlist')}</div>
          <div className='mt-24px'>
            <Grid container spacing={2}>
              {playlists.map((playlist) => (
                <Grid item key={playlist.key} xs={3} sm={3} md={3} xl={2}>
                  <CommonPlaylist {...playlist} keyId={playlist.key} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
      {videos.length === 0 || (
        <div className='mt-16'>
          <div className='mb-24px text-22px font-bold color-0-88'>Video</div>
          <div className="mt-16px">
            <Grid container spacing={2}>
              {getSlideVideos(videos, 'big').map(video => (
                <Grid key={video.key} item xs={6} sm={6} md={6} lg={6} xl={4}>
                  <CommonVideo { ... video } keyId={video.key} />
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={2}>
              {getSlideVideos(videos, 'small').map(video => (
                <Grid key={video.key} item xs={3} sm={3} md={3} lg={3} xl={2}>
                  <CommonVideo { ... video } keyId={video.key} />
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