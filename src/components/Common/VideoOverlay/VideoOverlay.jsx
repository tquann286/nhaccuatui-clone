import React from 'react'
import noVideoImg from 'images/default/default_video.png'
import './VideoOverlay.scss'

import { BsPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'

const VideoOverlay = ({ imageUrl, title, duration }) => {
  return (
    <div className='video-overlay-container'>
      <img src={imageUrl || noVideoImg} alt={title || ''} />
      <div className="video-overlay-duration">{duration}</div>
      <div className='overlay-container'>
        <div className='overlay-play-btn'>
          <BsPlayCircleFill />
        </div>
        <div className='overlay-more-options'>
          <IoMdMore />
        </div>
      </div>
    </div>
  )
}

export default VideoOverlay
// <div className='overlay-container' ref={positionRef} title={title || ''}>
//  <div className='overlay-more-options' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>