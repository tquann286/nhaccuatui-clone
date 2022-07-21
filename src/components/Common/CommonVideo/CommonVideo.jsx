import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './CommonVideo.scss'

import { VideoOverlay } from 'components'
import { createVideoUrl, handleCopyVideo } from 'share/utilities'

import { useStore } from 'store'

const CommonVideo = ({ keyId, artists, duration, refMapping, thumbnail, title }) => {
  const navigate = useNavigate()

  const [state] = useStore()
  const defineLang = (vie, eng) => state.lang === 'vi' ? vie : eng

  const onNavigateVideo = () => {
    navigate(createVideoUrl(keyId, title, artists))
  }

  const onCopyVideo = (e) => {
    handleCopyVideo(e, title, keyId, artists, defineLang)
  }

  const videoOverlayProps = {
    keyId,
    imageUrl: thumbnail,
    title,
    handleNagivate: onNavigateVideo,
    copyLink: true,
    handleCopyLink: (e) => onCopyVideo(e)
  }

  return (
    <div className='common-video-container inherit-width'>
      <div className="cv-video border-0-05">
        <VideoOverlay { ... videoOverlayProps } />
      </div>
    </div>
  )
}

export default CommonVideo