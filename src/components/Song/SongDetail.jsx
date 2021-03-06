import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ExtendModal, ModalAnimate, OptionModal } from 'components'

import { BsHeadphones } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'

import { formatNumber } from 'share'
import { createSongUrl, createArtistUrl, handleCopySong } from 'share/utilities'
import { createRandomSongView } from 'services/SongDetail'
import { basicModal } from 'share/animation'
import { handleAddToFavSong } from 'share/addToFav'
import { useStore } from 'store'

const SongDetail = ({ artists, songId, thumbnail, title, lang, songView, type, duration }) => {
  const [state] = useStore()
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const songContainerRef = useRef(null)
  const moreDivRef = useRef(null)

  const navigate = useNavigate()
  const defineLang = (vie, eng) => (lang === 'vi' ? vie : eng)

  useEffect(() => {
    if (!songView) {
      songView = createRandomSongView()
    }
  }, [])

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  const onCopyLink = (e) => {
    toggleShowMore()
    handleCopySong(e, defineLang, title, songId)
  }

  const handleGoToSong = (e) => {
    e.stopPropagation()
    navigate(createSongUrl(title, songId))
  }

  const handleAddToFav = (e) => {
    e.stopPropagation()
    handleAddToFavSong({ artists, songId, thumbnail, title, type, duration }, state.favSongs, defineLang)
    toggleShowMore()
  }

  const optionModalProps = {
    showModal: showMoreOptions,
    positionRef: songContainerRef,
    parentRef: moreDivRef,
    toggleModal: toggleShowMore,
  }

  const modalAnimateProps = {
    animateProps: basicModal,
    isVisible: showMoreOptions,
    keyId: songId,
  }

  const extendModalProps = {
    copyLink: true,
    handleCopyLink: (e) => onCopyLink(e),
    goToSong: true,
    handleGoToSong: (e) => handleGoToSong(e),
    addToFav: true,
    handleAddToFav: (e) => handleAddToFav(e),
  }

  return (
    <React.Fragment>
      <div className='sd-container' ref={songContainerRef}>
        <div className={`sd-main bg-color-0-02 hover-bg-color-0-05 ${showMoreOptions && 'focus bg-color-0-05'}`}>
          <Link to={createSongUrl(title, songId)} className='sd-thumbnail border-0-05' title={title}>
            <div className='sd-thumb-img' style={{ backgroundImage: `url(${thumbnail})` }}></div>
          </Link>
          <div className='sd-more'>
            <div className='sd-view-count'>
              <BsHeadphones />
              <div className='sc-view-number color-0-5'>{formatNumber(songView ? songView : createRandomSongView())}</div>
            </div>
            <div className='sd-more-options'>
              <div className='sd-three-dots color-0-5' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
                <IoMdMore />
              </div>
            </div>
          </div>
          <div className='sd-song-details'>
            <div className='sd-song-title'>
              <Link to={createSongUrl(title, songId)}>{title}</Link>
            </div>
            <div className='sd-artists color-0-5'>
              {artists.map((artist, i) => {
                const { artistId, name, shortLink } = artist

                return (
                  <React.Fragment key={artistId}>
                    <Link to={createArtistUrl(name, shortLink)}>
                      <span>{name}</span>
                    </Link>
                    {i + 1 === artists.length ? '' : ', '}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <OptionModal {...optionModalProps}>
        <ModalAnimate {...modalAnimateProps}>
          <ExtendModal {...extendModalProps} />
        </ModalAnimate>
      </OptionModal>
    </React.Fragment>
  )
}

export default SongDetail
