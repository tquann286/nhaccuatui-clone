import React, { useState, useEffect, useCallback } from 'react'
import NoPlayingSong from './NoPlayingSong'
import './RightSidebar.scss'

import { getPlayingSong } from 'services/RightSidebar/RightSidebar'

import { useStore, actions } from 'store'

const RightSidebar = () => {
  const [state, dispatch] = useStore()
  const { lang, playingSongId } = state

  const [playingSong, setPlayingSong] = useState(null)
  console.log('playingSong: ', playingSong)

  useEffect(() => {
    if (playingSongId) {
      const getPlayingSongState = async () => {
        const playingSong = await getPlayingSong(playingSongId)

        setPlayingSong(playingSong)
      }

      getPlayingSongState()
    }
  }, [playingSongId])

  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  if (!playingSong) return <NoPlayingSong defineLang={defineLang} />

  return <div className='rb-container'></div>
}

export default RightSidebar
