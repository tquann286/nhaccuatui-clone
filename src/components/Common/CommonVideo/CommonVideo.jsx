import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './CommonVideo.scss'

import { CommonArtist, VideoOverlay } from 'components'
import { createVideoUrl } from 'share/utilities'

import { useStore } from 'store'
import { handleAddToFavVideo } from 'share/addToFav'

const CommonVideo = ({ keyId, artists, duration, refMapping, thumbnail, title, videoHeight, type }) => {
  const navigate = useNavigate()

  const [state] = useStore()
  const defineLang = (vie, eng) => (state.lang === 'vi' ? vie : eng)

  const onNavigateVideo = () => {
    navigate(createVideoUrl(keyId, title, artists))
  }
  
  const handleAddToFav = () => {
    handleAddToFavVideo({ keyId, artists, duration, refMapping, thumbnail, title, type }, defineLang)
  }

  const videoOverlayProps = {
    keyId,
    imageUrl: thumbnail,
    title,
    handleNagivate: onNavigateVideo,
    duration,
    artists,
    defineLang,
    refMapping,
    handleAddToFav,
  }

  return (
    <div className='common-video-container inherit-width'>
      <div className='cv-video border-0-05' style={{ height: videoHeight }}>
        <VideoOverlay {...videoOverlayProps} />
      </div>
      <div className="cv-title color-0-88 small-title" title={title}>
        <Link to={createVideoUrl(keyId, title, artists)}>{title}</Link>
      </div>
      <CommonArtist artists={artists} />
    </div>
  )
}

export default CommonVideo
