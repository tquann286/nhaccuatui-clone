import React, { useState, useEffect, useCallback, useRef } from 'react'
import './RightSidebar.scss'

import { NoPlayingSong, PlayingSongMain, SongController } from 'components'
import { getPlayingSong } from 'share/utilities'
import { useStore, actions } from 'store'
import { getListSongsKey, getMaybeLike, getSongsView } from 'share/utilities'

const RightSidebar = () => {
  const [state, dispatch] = useStore()
  const { lang, playingSongId } = state
  console.log('playingSongId: ', playingSongId)

  const [playingSong, setPlayingSong] = useState(null)
  const [curPlaylist, setCurPlaylist] = useState([])
  console.log('curPlaylist: ', curPlaylist)
  const [songsView, setSongView] = useState({})

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

  const handleSongCanplay = () => {
    if (audioRef.current?.readyState) {
      audioRef.current.play()
    }
  }

  useEffect(() => {
    try {
      if (playingSongId) {
        const getPlayingSongState = async () => {
          const playingSong = await getPlayingSong(playingSongId)
          playingSong.songView = (await getSongsView(playingSongId))[playingSongId]

          if (isPlaying) {
            setDuration(audioRef.current?.duration)
            setCurrentTime(0)
            audioRef.current.currentTime = 0
          }

          setPlayingSong(playingSong)
        }

        getPlayingSongState()
      }
    } catch (error) {
      throw new Error(error)
    }
  }, [playingSongId])

  useLayoutEffect(() => {
    try {
      const getCurrentPlaylistState = async () => {
        if (playingSongId) {
          const curPlaylist = await getMaybeLike(playingSongId, 'song')
          const songsView = await getSongsView(getListSongsKey(curPlaylist?.data))
  
          setCurPlaylist(curPlaylist?.data)
          setSongView(songsView)
        }
      }
  
      getCurrentPlaylistState()
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  useEffect(() => {
    setDuration(audioRef.current?.duration)
  }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState])

  const defineLang = useCallback((vie, eng) => (lang === 'vi' ? vie : eng), [lang])

  if (!playingSong) return <NoPlayingSong defineLang={defineLang} />

  const { thumbnail = '', title = '', key = '', artists = [], streamUrls = [], songView = 0 } = playingSong

  const commmonProps = {
    defineLang,
    title,
    keyId: key,
    showPlaylist,
    toggleShowPlaylist,
  }

  const playingSongMainProps = {
    thumbnail,
    artists,
    songView,
    curPlaylist,
    setCurPlaylist,
    songsView,
    actions,
    dispatch,
  }

  const songControllerProps = {
    currentTime,
    random,
    toggleRandom,
    isPlaying,
    handlePlaying,
    isLoop,
    toggleLoop,
    duration,
    audioPlayer: audioRef.current || {},
    setIsPlaying,
    setCurrentTime,
  }

  const audioProps = {
    preload: 'metadata',
    controls: false,
    ref: audioRef,
    src: streamUrls[0]?.streamUrl,
    onTimeUpdate: handleUpdateTime,
    onEnded: handleSongEnded,
    loop: isLoop,
    onCanPlay: handleSongCanplay,
  }

  return (
    <div className='rb-container bg-color-1 useBorder border-0-05'>
      <PlayingSongMain {...commmonProps} {...playingSongMainProps} />
      <SongController {...commmonProps} {...songControllerProps} />
      <audio {...audioProps} />
    </div>
  )
}

export default RightSidebar
