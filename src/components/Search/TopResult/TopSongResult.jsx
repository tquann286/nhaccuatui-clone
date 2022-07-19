import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { CommonArtist, ImageOverlay } from 'components'
import { createSongUrl, handleCopySong } from 'share/utilities'

const TopSongResult = ({ song, defineLang }) => {
  const navigate = useNavigate()

  if (!song) return null

  const { artists, key, title, type, thumbnail } = song

  return (
    <div className='tr-slider'>
      <div className='tr-thumb-container'>
        <div className='tr-thumb-main'>
          <ImageOverlay key={key} imageUrl={thumbnail} title={title} handleNavigate={() => navigate(createSongUrl(title, key))} copyLink handleCopyLink={(e) => handleCopySong(e, defineLang, title, key)} />
        </div>
      </div>
      <div className='tr-description'>
        <div className='tr-decoration'>#1</div>
        <div className='tr-main-title'>
          <Link to={createSongUrl(title, key)}>{title}</Link>
        </div>
        <CommonArtist artists={artists} />
        <p className='tr-type'>{type}</p>
      </div>
    </div>
  )
}

export default TopSongResult
