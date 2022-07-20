import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getListSongsKey, getSongsView } from 'share/utilities'

const SongInfo = ({ songs, defineLang }) => {
  console.log('songs: ', songs)
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

  if (!songs) return null 

  return (
    <div className='song-info-container'>
      <div className='si-title common-header color-0-88'>
        <div className="common-title">
          <Link to='/bai-hat'>{defineLang('Bài hát', 'Song')}</Link>
        </div>
      </div>
    </div>
  )
}

export default SongInfo
