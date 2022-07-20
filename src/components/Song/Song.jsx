import React, { useState, useEffect } from 'react'
import './Song.scss'
import { Link } from 'react-router-dom'
import SongDetail from './SongDetail'

import { getSongsView } from 'share/utilities'
import { getListSongsKey } from 'share/utilities'

import { useStore } from 'store'

const Song = ({ song: songList }) => {
  const [state] = useStore()
  const { lang } = state

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

  return (
    <div className='so-container'>
      <div className='so-title'>
        <Link to='kham-pha/moi-hot'>{lang === 'vi' ? 'Bài hát' : 'Song'}</Link>
      </div>
      <div
        style={{
          margin: '1.6rem 3.2rem 0',
        }}
      >
        <div className='so-main'>
          {songList.map((song) => (
						<SongDetail {...song} songId={song.key} lang={lang} songView={songsView ? songsView[song.key] : 0} />
					))}
        </div>
      </div>
    </div>
  )
}

export default Song
