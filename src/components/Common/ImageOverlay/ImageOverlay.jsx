import React, { useState, useRef } from 'react'
import './ImageOverlay.scss'

import { ExtendModal, ModalAnimate, OptionModal } from 'components'

import { BsPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { basicModal } from 'share/animation'

const ImageOverlay = ({ keyId, imageUrl, title, handleNavigate, addToFav, handleAddToFav, copyLink, handleCopyLink, goToSong, handleGoToSong }) => {
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
    handleCopyLink(e)
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
    addToFav,
    handleAddToFav: (e) => handleAddToFav(e),
    copyLink,
    handleCopyLink: (e) => onCopyLink(e),
    goToSong,
    handleGoToSong: (e) => handleGoToSong(e),
  }

  return (
    <div className='img-overlay-container' onClick={handleNavigate}>
      <img className='io-img' src={imageUrl} alt={title || ''} title={title || ''} />
      <OptionModal {...optionModalProps}>
        <ModalAnimate { ... modalAnimateProps }>
          <ExtendModal {...extendModalProps} />
        </ModalAnimate>
      </OptionModal>
      <div className='io-overlay' ref={positionRef}>
        <div className='io-play-button'>
          <BsPlayCircleFill />
        </div>
        <div className='io-more-options' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
          <IoMdMore />
        </div>
      </div>
    </div>
  )
}

export default ImageOverlay
