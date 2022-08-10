import React, { useState, useRef, memo } from 'react'
import backupImg from 'images/default/default_video.png'

import { BsPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'

import { ExtendModal, ModalAnimate, OptionModal, Image } from 'components'

import { createArtistUrl, handleCopyVideo, createVideoUrl } from 'share/utilities'
import { Link, useNavigate } from 'react-router-dom'

import { useStore } from 'store'
import { basicModal } from 'share/animation'
import { handleAddToFavVideo } from 'share/addToFav'

const VideoDetail = ({ keyId, artists, duration, thumbnail, title, height, refMapping, type }) => {
  const [state] = useStore()
  const defineLang = (vie, eng) => (state.lang === 'vi' ? vie : eng)

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

  const onCopyVideo = (e) => {
    toggleShowMore()
    handleCopyVideo(e, title, keyId, artists, defineLang)
  }

  const handleVideoClick = () => {
    navigate(createVideoUrl(keyId, title, artists))
  }

  const onAddToFav = (e) => {
    e.stopPropagation()
    handleAddToFavVideo(keyId, defineLang)
    toggleShowMore()
  }

  const optionModalProps = {
    showModal: showMoreOptions,
    positionRef: videoRef,
    parentRef: moreDivRef,
    toggleModal: toggleShowMore,
  }

  const modalAnimateProps = {
    animateProps: basicModal,
    isVisible: showMoreOptions,
    keyId,
  }

  const extendModalProps = {
    copyLink: true,
    handleCopyLink: (e) => onCopyVideo(e),
    refMapping,
    addToFav: true,
    handleAddToFav: (e) => onAddToFav(e),
  }

  const imageProps = {
    imageUrl: thumbnail,
    alt: title,
    backupImg,
  }
  return (
    <React.Fragment>
      <div className='vd-container' ref={videoRef}>
        <div className='vd-video border-0-05' title={title} style={{ height }} onClick={() => handleVideoClick()}>
          <Image className='vd-img' {...imageProps} />
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
                <Link to={createArtistUrl(name, shortLink)}>
                  <span>{name}</span>
                </Link>
                {i + 1 === artists.length ? '' : ', '}
              </React.Fragment>
            )
          })}
        </div>
      </div>
      <OptionModal {...optionModalProps}>
        <ModalAnimate {...modalAnimateProps}>
          <ExtendModal {...extendModalProps} />
        </ModalAnimate>
      </OptionModal>
    </React.Fragment>
  )
}

export default memo(VideoDetail)
