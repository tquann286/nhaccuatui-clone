import React from 'react'
import noVideoImg from 'images/default/default_video.png'
import './VideoOverlay.scss'

const VideoOverlay = ({ imageUrl }) => {
  return (
    <div className='video-overlay-container'>
      <img src={imageUrl || noVideoImg} alt="" />
    </div>
  )
}

export default VideoOverlay