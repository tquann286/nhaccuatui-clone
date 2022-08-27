import React, { useState, useEffect } from 'react'
import NoPlayingSong from './NoPlayingSong'
import './RightSidebar.scss'

import { getPlayingSong } from 'services/RightSidebar/RightSidebar'

import { useStore, actions } from 'store'


const RightSidebar = () => {
  const [state, dispatch] = useStore()
  const { lang, playingSongId } = state

  const [playingSong, setPlayingSong] = useState(null)

  useEffect(() => {
    if (playingSongId) {
      const getPlayingSongState = async () => {
        const playingSong = await getPlayingSong(playingSongId)

        setPlayingSong(playingSong)
      }
      
      getPlayingSongState()
    }
  }, [playingSongId])

  const defineSong = (vie, eng) => {
    return lang === 'vi' ? vie : eng
  }

  if (!playingSong) return <NoPlayingSong defineSong={defineSong} />

  return <div className='rb-container'></div>
}

export default RightSidebar
