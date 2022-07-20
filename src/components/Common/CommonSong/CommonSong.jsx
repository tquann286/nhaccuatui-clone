import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './CommonSong.scss'

import { createSongUrl, handleCopySong } from 'share/utilities'
import { basicModal } from 'share/animation'
import { CommonArtist, ExtendModal, ModalAnimate, OptionModal, SquareImg } from 'components'
import { IconButton } from '@mui/material'

import { BsHeadphones } from 'react-icons/bs'
import { formatNumber } from 'share'
import { IoMdMore } from 'react-icons/io'

import { useStore } from 'store'

const CommonSong = ({ artists, keyId, thumbnail, title, songView }) => {
  const [state] = useStore()
  const defineLang = (vie, eng) => (state.lang === 'vi' ? vie : eng)

  const navigate = useNavigate()

  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const positionRef = useRef(null)
  const moreDivRef = useRef(null)

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  const onCopyLink = (e) => {
    handleCopySong(e, defineLang, title, keyId)
    toggleShowMore()
  }

  const handleGoToSong = (e) => {
    e.stopPropagation()
    navigate(createSongUrl(title, keyId))
  }


  return (
    <div className='common-song-container bg-color-0-02 w3-row'>
      <div className='cs-img-container w3-col border-0-05'>
        <SquareImg imageUrl={thumbnail} title={title} />
      </div>
      <div className='cs-extend w3-col w3-right'>
        <div className='cs-view-count w3-row'>
          <div className='cs-head-phone w3-col color-0-5'>
            <BsHeadphones />
          </div>
          <div className='cs-view-count-content w3-col color-0-5'>{formatNumber(songView)}</div>
        </div>
        <div className='cs-more-options' ref={positionRef}>
          <IconButton className='cs-more-btn' size='large'>
            <div className='cs-more-icon color-0-5' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
              <IoMdMore />
            </div>
          </IconButton>
        </div>
      </div>
      <div className='cs-content w3-rest'>
        <div className='cs-song-title color-0-88'>
          <Link to={createSongUrl(title, keyId)}>{title}</Link>
        </div>
        <CommonArtist artists={artists} />
      </div>
      <OptionModal showModal={showMoreOptions} positionRef={positionRef} parentRef={moreDivRef} toggleModal={toggleShowMore}>
        <ModalAnimate animateProps={basicModal} isVisible={showMoreOptions} keyId={keyId}>
          <ExtendModal copyLink handleCopyLink={(e) => onCopyLink(e)} goToSong handleGoToSong={(e) => handleGoToSong(e)} />
        </ModalAnimate>
      </OptionModal>
    </div>
  )
}

export default CommonSong
