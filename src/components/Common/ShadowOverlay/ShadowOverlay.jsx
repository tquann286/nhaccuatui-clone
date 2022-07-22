import React from 'react'
import './ShadowOverlay.scss'

import { ImageOverlay } from 'components'

const ShadowOverlay = ({ width, shadowHeight, imageUrl, keyId, title, handleNavigate, addToFav, handleAddToFav, copyLink, handleCopyLink, goToSong, handleGoToSong }) => {
  
  const imageOverlayProps = {
    keyId,
    imageUrl,
    title,
    handleNavigate,
    addToFav,
    handleAddToFav,
    copyLink,
    handleCopyLink,
    goToSong,
    handleGoToSong,
  }

  return (
    <div className='shadow-overlay-container'>
      <div className='shadow1 bg-color-0-05' style={{ height: shadowHeight }}></div>
      <div className='shadow2 bg-color-0-1' style={{ height: shadowHeight }}></div>
      <ImageOverlay {...imageOverlayProps} />
    </div>
  )
}

export default ShadowOverlay
