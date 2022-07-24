import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { CommonArtist, ExtendModal, ModalAnimate, OptionModal } from 'components'
import { formatNumber } from 'share'
import { createSongUrl } from 'share/utilities'
import { createRandomSongView } from 'services/SongDetail'
import { IconButton } from '@mui/material'
import { basicModal } from 'share/animation'
import { removeFavSong } from 'services/firebase/firestore'

import { BsHeadphones } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { toastNotify } from 'share/toast'

const SongItem = ({ keyId, songId, key, title, artists, duration, songsView, favSongs, setFavSongs, defineLang }) => {
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

  const handleGoToSong = (e) => {
    e.stopPropagation()
    navigate(createSongUrl(title, keyId || key || songId))
  }

  // Handle Remove Song From Favorite
  const handleRemoveFav = async (e, keyId) => {
    e.stopPropagation()
    const songToRemove = favSongs.filter(song => (song.key || song.keyId || song.songId) === keyId)[0]

    await removeFavSong(songToRemove)
    setFavSongs(favSongs.filter(song => (song.key || song.keyId || song.songId) !== keyId))
    toastNotify(defineLang('Xóa bài hát khỏi yêu thích thành công', 'Removed song from favorite list successfully'), 'success')
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
    keyId: keyId || songId || key,
  }

  const extendModalProps = {
    goToSong: true,
    handleGoToSong: (e) => handleGoToSong(e),
    removeFav: true,
    handleRemoveFav: (e) => handleRemoveFav(e, keyId || songId || key),
  }
  return (
    <li key={keyId || songId || key} className='song-list-common bg-color-0-02 li-list-item-common color-0-6 hover-bg-color-0-05 hover-visible'>
      <div className='song-list-title-artist'>
        <div className='song-list-title song-list-title-real'>
          <div className='alcenter-jcbetween'>
            <div className='alcenter' style={{ overflow: 'hidden' }}>
              <div className='song-list-title-scss color-0-88' title={title}>
                {title}
              </div>
            </div>
            <div className='alcenter fit-width' ref={positionRef}>
              <div className='vi-hidden'>
                <IconButton className='more-btn' aria-label='more' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
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
        <div className='song-list-title song-list-artist-real'>
          <CommonArtist artists={artists} />
        </div>
      </div>
      <div className='song-list-title listen-title-real'>
        <div className='view-count'>
          <BsHeadphones />
          <span className='view-count-content color-0-5'>{formatNumber(songsView ? songsView[keyId || songId || key] : createRandomSongView())}</span>
        </div>
      </div>
      <div className='song-list-title duration-title-real'>{duration}</div>
    </li>
  )
}

export default SongItem
