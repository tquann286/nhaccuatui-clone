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
  const [random, setRamdom] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoop, setIsLoop] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)

  const toggleRandom = () => setRamdom(!random)
  const toggleLoop = () => setIsLoop(!isLoop)
  const toggleShowPlaylist = () => setShowPlaylist(!showPlaylist)

  const audioRef = useRef({})

  const handlePlaying = () => {
    const prevValue = isPlaying
    setIsPlaying(!prevValue)
    if (!prevValue) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }

  const handleUpdateTime = () => {
    setCurrentTime(Math.floor(audioRef.current.currentTime))
  }

  const handleSongEnded = () => {
    setIsPlaying(false)
  }

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
    showPlaylist,
  }

  const songControllerProps = {
    defineLang,
    title,
    keyId: key,
    currentTime,
    setCurrentTime,
    audioPlayer: audioRef.current,
    random,
    toggleRandom,
    isPlaying,
    setIsPlaying,
    handlePlaying,
    isLoop,
    toggleLoop,
    showPlaylist,
    toggleShowPlaylist,
  }

  const audioProps = {
    className: '',
    preload: 'metadata',
    controls: false,
    ref: audioRef,
    src: streamUrls[0]?.streamUrl,
    onTimeUpdate: handleUpdateTime,
    onEnded: handleSongEnded,
    loop: isLoop,
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
