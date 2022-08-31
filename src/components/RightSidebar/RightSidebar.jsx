import React, { useState, useEffect, useCallback, useRef } from 'react'
import './RightSidebar.scss'

import { NoPlayingSong, PlayingSongMain, SongController } from 'components'
import { getPlayingSong } from 'services/RightSidebar/RightSidebar'
import { useStore } from 'store'

const RightSidebar = () => {
  const [state] = useStore()
  const { lang, playingSongId } = state

  const audioRef = useRef({})
  const [playingSong, setPlayingSong] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [volumn, setVolumn] = useState(100)
  console.log(playingSong)

  useEffect(() => {
    if (playingSongId) {
      const getPlayingSongState = async () => {
        const playingSong = await getPlayingSong(playingSongId)

        setPlayingSong(playingSong)
      }

      getPlayingSongState()
    }

    if (audioRef.current) {
      console.log(audioRef)
    }
  }, [playingSongId, audioRef.current])

  const defineLang = useCallback((vie, eng) => (lang === 'vi' ? vie : eng), [lang])

  if (!playingSong) return <NoPlayingSong defineLang={defineLang} />

  const { thumbnail = '', title = '', key = '', artists = [], streamUrls = [] } = playingSong

  const playingSongMainProps = {
    thumbnail,
    artists,
    title,
    key,
    defineLang,
  }

  const songControllerProps = {
    defineLang,
    volumn,
    setVolumn,
    title,
    keyId: key,
    currentTime,
    setCurrentTime,
  }

  const audioProps = {
    className: 'hidden',
    autoplay: true,
    preload: 'auto',
    controls: false,
    currentTime,
    ref: audioRef,
    src: streamUrls[0]?.streamUrl
  }

  return (
    <div className='rb-container bg-color-1 useBorder border-0-05'>
      <PlayingSongMain {...playingSongMainProps} />
      <SongController {...songControllerProps} />
      <audio { ... audioProps } />
    </div>
  )
}

export default RightSidebar
