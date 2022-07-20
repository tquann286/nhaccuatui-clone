import React, { useState, useEffect } from 'react'
import { getView } from 'api'
import { getListSongsKey } from 'share/utilities'

const SongInfo = ({ songs, defineLang }) => {
  console.log('songs: ', songs)
  const [songsView, setSongView] = useState({})
  console.log(songsView)

  useEffect(() => {
    try {
      const getSongsView = async (listSongKeys) => {
        if (listSongKeys) {
          const songsView = await getView(listSongKeys)
          if (songsView) {
            setSongView(songsView.song)
          }
  
        }
      }
  
      if (songs) {
        getSongsView(getListSongsKey(songs))
      }
    } catch (error) {
      throw new Error(error)
    }

  }, [songs])

  if (songs) {
    songs.map((song) => {
      console.log(song.title)
      console.log(songsView[song.key])
    })
  }

  return (
    <div className='song-info-container'>
      <div className='si-title common-title color-0-88'>{defineLang('Bài hát', 'Song')}</div>
    </div>
  )
}

export default SongInfo
