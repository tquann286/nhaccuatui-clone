import React, { useState, useRef } from 'react'
import noVideoImg from 'images/default/default_video.png'
import './VideoOverlay.scss'

import { ExtendModal, ModalAnimate, OptionModal } from 'components'
import { basicModal } from 'share/animation'

import { BsPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { handleCopyVideo } from 'share/utilities'

const VideoOverlay = ({ imageUrl, title, duration, artists, keyId, handleNagivate, handleAddToFav, defineLang }) => {
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

  const onCopyVideo = (e) => {
    handleCopyVideo(e, title, keyId, artists, defineLang)
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
    keyId
  }

  const extendModalProps = {
    handleAddToFav: (e) => handleAddToFav(e),
    copyLink: true,
    handleCopyLink: (e) => onCopyVideo(e),
  }

  return (
    <div className='video-overlay-container' onClick={handleNagivate}>
      <img src={imageUrl || noVideoImg} alt={title || ''} />
      <div className="video-overlay-duration">{duration}</div>
      <div className='overlay-container' ref={positionRef} title={title || ''}>
        <div className='overlay-play-btn'>
          <BsPlayCircleFill />
        </div>
        <div className='overlay-more-options' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
          <IoMdMore />
        </div>
      </div>
      <OptionModal {...optionModalProps}>
        <ModalAnimate { ... modalAnimateProps }>
          <ExtendModal {...extendModalProps} />
        </ModalAnimate>
      </OptionModal>
    </div>
  )
}

export default VideoOverlay
// <div className='overlay-container' ref={positionRef} title={title || ''}>
//  <div className='overlay-more-options' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>