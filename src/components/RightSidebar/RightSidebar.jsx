import React, { useState, useEffect, useCallback, useRef } from 'react'
import './RightSidebar.scss'

import { NoPlayingSong, PlayingSongMain, SongController } from 'components'
import { getPlayingSong } from 'services/RightSidebar/RightSidebar'
import { useStore } from 'store'

const RightSidebar = () => {
  const [state] = useStore()
  const { lang, playingSongId } = state

  const [playingSong, setPlayingSong] = useState(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [volumn, setVolumn] = useState(100)
  const [random, setRamdom] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoop, setIsLoop] = useState(false)
  console.log(playingSong)

  const toggleRandom = () => setRamdom(!random)
  const togglePlaying = () => setIsPlaying(!isPlaying)
  const toggleLoop = () => setIsLoop(!isLoop)

  const audioRef = useRef({})

  useEffect(() => {
    if (playingSongId) {
      const getPlayingSongState = async () => {
        const playingSong = await getPlayingSong(playingSongId)

        setPlayingSong(playingSong)
      }

      getPlayingSongState()
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
    audioPlayer: audioRef.current,
    random,
    toggleRandom,
    isPlaying,
    togglePlaying,
    isLoop,
    toggleLoop,
  }

  const audioProps = {
    className: '',
    autoplay: true,
    preload: 'auto',
    controls: false,
    currentTime,
    ref: audioRef,
    src: streamUrls[0]?.streamUrl,
  }

  return (
    <div className='rb-container bg-color-1 useBorder border-0-05'>
      <PlayingSongMain {...playingSongMainProps} />
      <SongController {...songControllerProps} />
      <audio {...audioProps} />
    </div>
  )
}

export default RightSidebar
