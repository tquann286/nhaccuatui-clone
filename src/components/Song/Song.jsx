import React, { useState, useEffect, useCallback } from 'react'
import './Song.scss'
import { Link } from 'react-router-dom'

import { getSongsView, getListSongsKey } from 'share/utilities'

import { useStore, actions } from 'store'
import { Grid } from '@mui/material'
import { CommonSong } from 'components'

const Song = ({ song: songList = [] }) => {
  const [state, dispatch] = useStore()
  const { lang, curPlaylist } = state
  const defineLang = useCallback((vie, eng) => (lang === 'vi' ? vie : eng), [lang])

  const [songsView, setSongView] = useState({})

  useEffect(() => {
    try {
      if (songList) {
        const getSongsViewState = async (listSongsKey) => {
          const songsView = await getSongsView(listSongsKey)
          setSongView(songsView)
        }

        getSongsViewState(getListSongsKey(songList))
      }
    } catch (error) {
      throw new Error(error)
    }
  }, [songList])

  if (!songList) return null

  const songDetailProps = {
    actions,
    dispatch,
    curPlaylist,
    defineLang,
  }

  return (
    <div className='so-container'>
      <div className='so-title'>
        <Link to='kham-pha/moi-hot'>{defineLang('Bài hát', 'Song')}</Link>
      </div>
      <div
        className='mt-16px mx-32px'
      >
        <Grid container spacing={2}>
          {songList.map((song) => (
            <Grid item xs={6} key={song.key} className='!py-2px'>
              <CommonSong {...song} songView={songsView[song.key] || 0} keyId={song.key} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

// <div className='so-main'>
// {songList.map((song) => (
//   <SongDetail { ... songDetailProps } {...song} songId={song.key} songView={songsView ? songsView[song.key] : 0} />
// ))}
// </div>
export default Song
