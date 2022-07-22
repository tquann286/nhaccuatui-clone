import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { CommonArtist, ImageOverlay } from 'components'
import { createSongUrl, handleCopySong } from 'share/utilities'
import { handleAddToFavSong } from 'share/addToFav'

const TopSongResult = ({ song, defineLang }) => {
  const navigate = useNavigate()

  if (!song) return null

  const { artists, key, title, type, thumbnail } = song

  const onNavigateSong = () => {
    navigate(createSongUrl(title, key))
  }

  const onCopyLink = (e) => {
    handleCopySong(e, defineLang, title, key)
  }

  const handleAddToFav = (e) => {
    e.stopPropagation()
    handleAddToFavSong({ artists, key, thumbnail, title, type }, defineLang)
  }

  const imageOverlayProps = {
    keyId: key,
    imageUrl: thumbnail,
    title,
    handleNavigate: onNavigateSong,
    copyLink: true,
    handleCopyLink: (e) => onCopyLink(e),
    addToFav: true,
    handleAddToFav,
    goToSong: true,
    handleGoToSong: onNavigateSong
  }

  return (
    <div className='tr-slider'>
      <div className='tr-thumb-container'>
        <div className='tr-thumb-main'>
          <ImageOverlay { ... imageOverlayProps} />
        </div>
      </div>
      <div className='tr-description'>
        <div className='tr-decoration'>#1</div>
        <div className='tr-main-title'>
          <Link to={createSongUrl(title, key)}>{title}</Link>
        </div>
        <CommonArtist artists={artists} />
        <p className='tr-type color-0-5'>{type}</p>
      </div>
    </div>
  )
}

export default TopSongResult
