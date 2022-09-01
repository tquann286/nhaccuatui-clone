import React, { useState, useEffect, useCallback, useRef } from 'react'
import './RightSidebar.scss'

import { LoadingV2, NoPlayingSong, PlayingSongMain, SongController } from 'components'
import { getPlayingSong } from 'services/RightSidebar/RightSidebar'
import { useStore } from 'store'
import { getMaybeLike } from 'share/utilities'

const RightSidebar = () => {
  const [state] = useStore()
  const { lang, playingSongId } = state

  const [playingSong, setPlayingSong] = useState(null)
  const [curPlaylist, setCurPlaylist] = useState([])
  console.log('curPlaylist: ', curPlaylist)
  const [isLoading, setIsLoading] = useState(false)

  const [duration, setDuration] = useState(0)
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
    if (audioRef.current?.readyState) {
      const prevValue = isPlaying
      setIsPlaying(!prevValue)
      if (!prevValue) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }

  const handleUpdateTime = () => {
    setCurrentTime(Math.floor(audioRef.current.currentTime))
  }

  const handleSongEnded = () => {
    setIsPlaying(false)
  }

  useEffect(() => {
    try {
      if (playingSongId) {
        setIsLoading(true)
        const getPlayingSongState = async () => {
          const playingSong = await getPlayingSong(playingSongId)
          const curPlaylist = await getMaybeLike(playingSongId, 'song')

          setPlayingSong(playingSong)
          setCurPlaylist(curPlaylist?.data)
          setIsLoading(false)
        }

        getPlayingSongState()
      }
    } catch (error) {
      throw new Error(error)
    }
  }, [playingSongId])

  useEffect(() => {
    setDuration(audioRef.current?.duration)
  }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState])

  const defineLang = useCallback((vie, eng) => (lang === 'vi' ? vie : eng), [lang])

  if (!playingSong) return <NoPlayingSong defineLang={defineLang} />

  if (isLoading)
    return (
      <div className='rb-container bg-color-1 useBorder border-0-05 flexCenter'>
        <LoadingV2 />
      </div>
    )

  const { thumbnail = '', title = '', key = '', artists = [], streamUrls = [] } = playingSong

  const playingSongMainProps = {
    thumbnail,
    artists,
    title,
    key,
    defineLang,
    showPlaylist,
    toggleShowPlaylist,
  }

  const songControllerProps = {
    defineLang,
    title,
    keyId: key,
    currentTime,
    setCurrentTime,
    audioPlayer: audioRef.current || {},
    random,
    toggleRandom,
    isPlaying,
    setIsPlaying,
    handlePlaying,
    isLoop,
    toggleLoop,
    showPlaylist,
    toggleShowPlaylist,
    duration,
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
