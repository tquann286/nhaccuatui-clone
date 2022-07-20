import React, { useState, useRef, memo } from 'react'

import { BsLink45Deg, BsPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { SiApplemusic } from 'react-icons/si'

import { OptionModal } from 'components'

import { isEmpty } from 'lodash'

import { createArtistUrl, handleCopyVideo, createVideoUrl } from 'share/utilities'
import { Link, useNavigate } from 'react-router-dom'

import { useStore } from 'store'

const VideoDetail = ({ keyId, artists, duration, thumbnail, title, height, refMapping }) => {
  const [state] = useStore()
  const defineLang = (vie, eng) => state.lang === 'vi' ? vie : eng

  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const videoRef = useRef(null)
  const moreDivRef = useRef(null)

  const navigate = useNavigate()

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  const handleCopyClick = (e) => {
    toggleShowMore()
    handleCopyVideo(e, title, keyId, artists, defineLang)
  }

  const handleVideoClick = () => {
    navigate(createVideoUrl(keyId, title, artists))
  }

  return (
    <React.Fragment>
      <div className='vd-container' ref={videoRef}>
        <div className='vd-video' title={title} style={{ height }} onClick={() => handleVideoClick()}>
          <img className='vd-img' src={thumbnail} alt={title} />
          <div className='vd-duration'>{duration}</div>
          <div className='vd-blur-layer'>
            <div className='vd-play-icon'>
              <BsPlayCircleFill />
            </div>
            <div title={defineLang('Thêm', 'More')} className='vd-more-options' onClick={(e) => handleMoreOptions(e)} ref={moreDivRef}>
              <IoMdMore />
            </div>
          </div>
        </div>
        <div className='vd-title'>
          <Link to={createVideoUrl(keyId, title, artists)}>{title}</Link>
        </div>
        <div className='vd-artists color-0-5'>
          {artists.map((artist, i) => {
            const { artistId, name, shortLink } = artist

            return (
              <React.Fragment key={artistId}>
                <Link to={createArtistUrl(name, shortLink, artistId)}>
                  <span>{name}</span>
                </Link>
                {i + 1 === artists.length ? '' : ', '}
              </React.Fragment>
            )
          })}
        </div>
      </div>
        <OptionModal showModal={showMoreOptions} positionRef={videoRef} parentRef={moreDivRef} toggleModal={toggleShowMore}>
          <div className='om-main color-0-88 bg-dark-color-1'>
            <ul>
              {!isEmpty(refMapping) && (
                <li>
                  <SiApplemusic />
                  <span>{defineLang('Nghe audio', 'Listen audio')}</span>
                </li>
              )}
              <li onClick={(e) => handleCopyClick(e)}>
                <BsLink45Deg />
                <span>{defineLang('Sao chép link', 'Copy link')}</span>
              </li>
            </ul>
          </div>
        </OptionModal>
    </React.Fragment>
  )
}

export default memo(VideoDetail)
