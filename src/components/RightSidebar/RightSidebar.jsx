import React, { useState, useEffect } from 'react'
import NoPlayingSong from './NoPlayingSong'
import './RightSidebar.scss'

import { getPlayingSong } from 'services/RightSidebar/RightSidebar'

import { useStore, actions } from 'store'


const RightSidebar = () => {
  const [state, dispatch] = useStore()
  const { lang, lastPlayedSongId } = state

  const [playingSong, setPlayingSong] = useState(null)

  useEffect(() => {
    if (lastPlayedSongId) {
      getPlayingSong(lastPlayedSongId).then((res) => {
        if (res) {
          setPlayingSong(res)
        }
      })
    }
  }, [lastPlayedSongId])

  const defineSong = (vie, eng) => {
    return lang === 'vi' ? vie : eng
  }

  if (!playingSong) return <NoPlayingSong defineSong={defineSong} />

  return <div className='rb-container'></div>
}

export default RightSidebar
