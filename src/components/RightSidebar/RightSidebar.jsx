import React, { useState, useEffect, useCallback, useRef } from 'react'
import './RightSidebar.scss'

import { NoPlayingSong, PlayingSongMain, SongController } from 'components'
import { getPlayingSong, handlePlayNewSong } from 'share/utilities'
import { useStore, actions } from 'store'
import { getListSongsKey, getMaybeLike, getSongsView } from 'share/utilities'

const RightSidebar = () => {
  const [state, dispatch] = useStore()
  const { lang, playingSongId, curPlaylist = [] } = state

  const [playingSong, setPlayingSong] = useState(null)
  const [songsView, setSongsView] = useState({})

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

  const handleNextSong = () => {
    let playingSongIndex
    curPlaylist.forEach((song, index) => {
      if (song.key === playingSongId) playingSongIndex = index
    })

    if ((playingSongIndex && playingSongIndex !== curPlaylist.length - 1) || playingSongIndex === 0) {
      handlePlayNewSong(curPlaylist[playingSongIndex + 1].key, dispatch, actions, curPlaylist, false, defineLang)
    } else {
      handlePlayNewSong(curPlaylist[0].key, dispatch, actions, curPlaylist, false, defineLang)
    }
  }

  const handlePreviousSong = () => {
    let playingSongIndex
    curPlaylist.forEach((song, index) => {
      if (song.key === keyId) playingSongIndex = index
    })

    if (playingSongIndex) {
      handlePlayNewSong(curPlaylist[playingSongIndex - 1].key, dispatch, actions, curPlaylist, false, defineLang)
    } else {
      handlePlayNewSong(curPlaylist[curPlaylist.length - 1].key, dispatch, actions, curPlaylist, false, defineLang)
    }
  }

  const handleSongEnded = () => {
    setIsPlaying(false)
    if (isPlaying) {
      handleNextSong()
      setIsPlaying(true)
    }
  }

  const handleSongCanplay = () => {
    if (audioRef.current?.readyState && isPlaying) {
      audioRef.current.play()
    }
  }

  useEffect(() => {
    try {
      if (playingSongId) {
        const getPlayingSongState = async () => {
          const playingSong = await getPlayingSong(playingSongId)
          playingSong.songView = await getSongsView(playingSongId)

          if (isPlaying) {
            setDuration(audioRef.current?.duration)
            setCurrentTime(0)
            setIsPlaying(true)
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

  useEffect(() => {
    try {
      const getCurrentPlaylistState = async () => {
        const localSongId = localStorage.getItem('playingSongId')

        if (localSongId) {
          const curPlaylist = await getMaybeLike(localSongId, 'song')

          dispatch(actions.setCurPlaylist(curPlaylist?.data))
        }
      }

      getCurrentPlaylistState()
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  useEffect(() => {
    try {
      if (curPlaylist.length !== 0) {
        const getSongsViewState = async () => {
          const songsView = await getSongsView(getListSongsKey(curPlaylist))
    
          setSongsView(songsView)
        }
  
        getSongsViewState()
      }
    } catch (error) {
      throw new Error(error)
    }
  }, [curPlaylist])

  useEffect(() => {
    setDuration(audioRef.current?.duration)
  }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState])

  const defineLang = useCallback((vie, eng) => (lang === 'vi' ? vie : eng), [lang])

  if (!playingSong) return <NoPlayingSong defineLang={defineLang} />

  const { thumbnail = '', title = '', key = '', artists = [], streamUrls = [], songView = 0, duration: songDuration = '' } = playingSong

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
    songsView,
    curPlaylist,
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
    songDuration,
    audioPlayer: audioRef.current || {},
    setIsPlaying,
    setCurrentTime,
    handleNextSong,
    handlePreviousSong,
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
