import React, { useState, useEffect, useRef, memo } from 'react'

import { BsLink45Deg, BsPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { SiApplemusic } from 'react-icons/si'

import { isEmpty } from 'lodash'
import { Animated } from 'react-animated-css'

import { useOnClickOutside, useGetPosition } from 'hooks'
import { handleVideoLink } from 'services/VideoDetail'
import { PROXY } from 'share/constants'
import { animationConfig, createArtistUrl, copyNotify } from 'share/utilities'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate } from 'react-router-dom'

import { useStore } from 'store'

const VideoDetail = ({ keyId, artists, duration, thumbnail, title, height, refMapping }) => {
  const [state] = useStore()
  const { lang } = state

  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [showMorePosition, setShowMorePosition] = useState({
    top: 0,
    left: 0
  })
  const videoRef = useRef(null)
  const moreDivRef = useRef(null)
  const moreOptionsRef = useRef(null)

  const navigate = useNavigate()

  useGetPosition(videoRef, (right, top) =>
    setShowMorePosition({
      top: top,
      left: right
    })
  )

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  const handleCopyClick = (e) => {
    e.stopPropagation()

    const videoLink = `${PROXY}/${handleVideoLink(keyId, title, artists)}`

    navigator.clipboard.writeText(videoLink)
    toggleShowMore()
    copyNotify(lang)
  }

  const handleVideoClick = () => {
    navigate(handleVideoLink(keyId, title, artists))
  }

  useOnClickOutside(moreOptionsRef, moreDivRef, () => setShowMoreOptions(false))

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
            <div title={lang === 'vi' ? 'Thêm' : 'More'} className='vd-more-options' onClick={(e) => handleMoreOptions(e)} ref={moreDivRef}>
              <IoMdMore />
            </div>
          </div>
        </div>
        <div className='vd-title'>
          <Link to={handleVideoLink(keyId, title, artists)}>{title}</Link>
        </div>
        <div className='vd-artists'>
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
      <Animated {...animationConfig} isVisible={showMoreOptions}>
        <div className='vd-more-options-box' style={showMorePosition} ref={moreOptionsRef}>
          <ul>
            {!isEmpty(refMapping) && (
              <li>
                <SiApplemusic />
                <span>{lang === 'vi' ? 'Nghe audio' : 'Listen audio'}</span>
              </li>
            )}
            <li onClick={(e) => handleCopyClick(e)}>
              <BsLink45Deg />
              <span>{lang === 'vi' ? 'Sao chép link' : 'Copy link'}</span>
            </li>
          </ul>
        </div>
      </Animated>
    </React.Fragment>
  )
}

export default memo(VideoDetail)
