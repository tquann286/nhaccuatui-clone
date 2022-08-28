import React, { useState, useEffect, useCallback } from 'react'
import './RightSidebar.scss'

import { NoPlayingSong, PlayingSongMain } from 'components'
import { getPlayingSong } from 'services/RightSidebar/RightSidebar'
import { useStore } from 'store'

const RightSidebar = () => {
  const [state] = useStore()
  const { lang, playingSongId } = state

  const [playingSong, setPlayingSong] = useState(null)
  console.log(playingSong)

  useEffect(() => {
    if (playingSongId) {
      const getPlayingSongState = async () => {
        const playingSong = await getPlayingSong(playingSongId)

        setPlayingSong(playingSong)
      }

      getPlayingSongState()
    }
  }, [playingSongId])

  const defineLang = useCallback((vie, eng) => (lang === 'vi' ? vie : eng), [lang])

  if (!playingSong) return <NoPlayingSong defineLang={defineLang} />

  const { thumbnail = '', title = '', key = '', artists = [] } = playingSong

  const playingSongMainProps = {
    thumbnail,
    artists,
    title,
    key,
    defineLang,
  }

  return (
    <div className='rb-container'>
      <div className='w-320 flex overflow-hidden justify-center h-[calc(100vh_-_20rem)]'>
        <PlayingSongMain {...playingSongMainProps} />
      </div>
    </div>
  )
}

export default RightSidebar
