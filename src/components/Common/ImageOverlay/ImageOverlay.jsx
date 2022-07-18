import React, { useState, useRef } from 'react'
import './ImageOverlay.scss'

import { useStore } from 'store'

import { ModalAnimate, OptionModal } from 'components'

import { BsLink45Deg, BsMusicNote, BsPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { basicModal } from 'share/animation'
import { SiYoutubemusic } from 'react-icons/si'

const ImageOverlay = ({ key, imageUrl, title, addToFav, handleAddToFav, copyLink, handleCopyLink, goToSong, handleGoToSong }) => {
  const [state] = useStore()
  const defineLang = (vie, eng) => (state.lang === 'vi' ? vie : eng)

  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const positionRef = useRef(null)
  const moreDivRef = useRef(null)

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  return (
    <div className='img-overlay-container'>
      <img className='io-img' src={imageUrl} alt={title || ''} />
      <OptionModal showModal={showMoreOptions} positionRef={positionRef} parentRef={moreDivRef} toggleModal={toggleShowMore}>
        <ModalAnimate animateProps={basicModal} isVisible={showMoreOptions} key={key}>
          <div className='om-main'>
            <ul>
              {addToFav && (
                <li>
                  <SiYoutubemusic />
                  <span>{defineLang('Thêm vào chờ phát', 'Add to queue')}</span>
                </li>
              )}
              {copyLink && (
                <li onClick={handleCopyLink}>
                  <BsLink45Deg />
                  <span>{defineLang('Sao chép link', 'Copy link')}</span>
                </li>
              )}
              {goToSong && (
                <li onClick={handleGoToSong}>
                  <BsMusicNote />
                  <span>{defineLang('Đi đến bài hát', 'Go to song')}</span>
                </li>
              )}
            </ul>
          </div>
        </ModalAnimate>
      </OptionModal>
      <div className='io-overlay'>
        <div className='io-play-button'>
          <BsPlayCircleFill />
        </div>
        <div className='io-more-options' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
          <IoMdMore />
        </div>
      </div>
    </div>
  )
}

export default ImageOverlay
