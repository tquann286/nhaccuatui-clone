import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { CommonArtist, ExtendModal, ModalAnimate, OptionModal } from 'components'
import { formatNumber } from 'share'
import { createSongUrl, handleCopySong, handlePlayNewSong } from 'share/utilities'
import { createRandomSongView } from 'services/SongDetail'
import { IconButton } from '@mui/material'
import { basicModal } from 'share/animation'
import { getUserDetail, removeFavItem, removeHistoryItem } from 'services/firebase/firestore'

import { BsHeadphones } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { handleAddToFavSong } from 'share/addToFav'
import { useStore, actions } from 'store'

const SongItem = ({ keyId, title, artists, duration, songsView, defineLang, setFavSongs, removeFav, addToFav, removeHistory, setHistorySongs }) => {
  const [state, dispatch] = useStore()
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const navigate = useNavigate()

  const positionRef = useRef(null)
  const moreDivRef = useRef(null)

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  const handleAddToFav = (e) => {
    e.stopPropagation()
    handleAddToFavSong(keyId, defineLang)
    toggleShowMore()
  }

  const handleGoToSong = (e) => {
    e.stopPropagation()
    navigate(createSongUrl(title, keyId))
  }

  const handleCopyLink = (e) => {
    handleCopySong(e, defineLang, title, keyId)
    toggleShowMore()
  }

  // Handle Remove Song From Favorite
  const handleRemoveFav = async (e, keyId) => {
    e.stopPropagation()
    const { favorite } = await getUserDetail()

    const songToRemove = favorite.songs.filter(songKey => songKey === keyId)[0]

    await removeFavItem(songToRemove, 'song', defineLang)
    setFavSongs((oldFav) => oldFav.filter(song => song.key !== keyId))
    toggleShowMore()
  }
  
  // Handle Remove Song From History
  const handleRemoveHistory = async (e, keyId) => {
    e.stopPropagation()
    const { history } = await getUserDetail()

    const songToRemove = history.songs.filter(songKey => songKey === keyId)[0]

    await removeHistoryItem(songToRemove, 'song', defineLang)
    setHistorySongs((oldHistory) => oldHistory.filter(song => song.key !== keyId))
    toggleShowMore()
  }

  const optionModalProps = {
    showModal: showMoreOptions,
    positionRef,
    parentRef: moreDivRef,
    toggleModal: toggleShowMore,
  }

  const modalAnimateProps = {
    animateProps: basicModal,
    isVisible: showMoreOptions,
    keyId,
  }

  const extendModalProps = {
    addToFav,
    handleAddToFav,
    copyLink: true,
    handleCopyLink: (e) => handleCopyLink(e),
    goToSong: true,
    handleGoToSong: (e) => handleGoToSong(e),
    removeFav,
    handleRemoveFav: (e) => handleRemoveFav(e, keyId),
    removeHistory,
    handleRemoveHistory: (e) => handleRemoveHistory(e, keyId)
  }
  return (
    <li key={keyId} className='song-list-common bg-color-0-02 li-list-item-common color-0-6 hover-bg-color-0-05 hover-visible' onClick={() => handlePlayNewSong(keyId, dispatch, actions, state.curPlaylist, true, defineLang)}>
      <div className='song-list-title-artist sm:w-[calc(100%_-_18.4rem)] ip5:w-[calc(100%_-15.5rem)]'>
        <div className='song-list-title fz-13px song-list-title-real sm:pl-16px ip5:pl-6px'>
          <div className='alcenter-jcbetween'>
            <div className='alcenter' style={{ overflow: 'hidden' }}>
              <div className='song-list-title-scss fz-13px color-0-88' title={title}>
                {title}
              </div>
            </div>
            <div className='alcenter fit-width' ref={positionRef}>
              <div className='vi-hidden'>
                <IconButton className='more-btn fz-22px sm:p-4px ip5:p-2px' aria-label='more' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
                  <IoMdMore className='color-0-5' />
                </IconButton>
              </div>
            </div>
            <OptionModal {...optionModalProps}>
              <ModalAnimate {...modalAnimateProps}>
                <ExtendModal {...extendModalProps} />
              </ModalAnimate>
            </OptionModal>
          </div>
        </div>
        <div className='song-list-title fz-13px song-list-artist-real sm:px-12px ip5:px-4px'>
          <CommonArtist artists={artists} />
        </div>
      </div>
      <div className='song-list-title fz-13px listen-title-real sm:w-[82px] ip5:w-28 sm:mr-22px ip5:mr-12px'>
        <div className='view-count'>
          <BsHeadphones />
          <span className='view-count-content color-0-5'>{formatNumber(songsView ? (songsView[keyId] || 0) : createRandomSongView())}</span>
        </div>
      </div>
      <div className='song-list-title fz-13px duration-title-real sm:w-32 ip5:w-64px'>{duration}</div>
    </li>
  )
}

export default SongItem
