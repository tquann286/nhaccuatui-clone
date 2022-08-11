import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import no_song_img from 'images/default/default_song.png'

import { CommonArtist, ExtendModal, Image, ModalAnimate, OptionModal } from 'components'
import { IconButton } from '@mui/material'
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdMore } from 'react-icons/io'
import { createSongUrl, handleCopySong } from 'share/utilities'
import { handleAddToFavSong, handleAddToFavVideo } from 'share/addToFav'
import { basicModal } from 'share/animation'

const SongRanking = ({ songKey, position, defineLang, artists, thumbnail, title, isVideo, hasRanking, highestPosition, oldPosition, totalWeekInRanked }) => {
  const navigate = useNavigate()
  const [showMore, setShowMore] = useState(false)

  const moreDivRef = useRef(null)

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  const onCopyLink = (e) => {
    handleCopySong(e, defineLang, title, songKey)
    toggleShowMore()
  }

  const handleGoToSong = (e) => {
    e.stopPropagation()
    navigate(createSongUrl(title, songKey))
  }

  const handleAddToFav = (e) => {
    e.stopPropagation()
    if (isVideo) {
      handleAddToFavVideo(songKey, defineLang)
    } else {
      handleAddToFavSong(songKey, defineLang)
    }
    toggleShowMore()
  }

  const optionModalProps = {
    showModal: showMore,
    positionRef: moreDivRef,
    parentRef: moreDivRef,
    toggleModal: toggleShowMore,
  }

  const modalAnimateProps = {
    animateProps: basicModal,
    isVisible: showMore,
    keyId: songKey,
  }

  const extendModalProps = {
    copyLink: true,
    handleCopyLink: (e) => onCopyLink(e),
    goToSong: true,
    handleGoToSong: (e) => handleGoToSong(e),
    addToFav: true,
    handleAddToFav: (e) => handleAddToFav(e)
  }

  const handleRanking = () => {
    if (oldPosition === 0) {
      return (
        <div className="rank-tag new-song">
          <p className="text-yellow rank-number">{defineLang('Mới', 'New')}</p>
        </div>
      )
    } else if (oldPosition === position) {
      return <React.Fragment>
      -
      </React.Fragment>
    }  else if (position > oldPosition) {
      return (
        <div className="rank-tag rank-down text-hot">
          <IoMdArrowDropdown className='text-lg' />
          <p className='rank-number'>{position - oldPosition}</p>
        </div>
      )
    } else if (oldPosition > position) {
      return (
        <div className="rank-tag rank-up text-green">
          <IoMdArrowDropup className='text-lg' />
          <p className='rank-number'>{oldPosition - position}</p>
        </div>
      )
    }
  }

  const imageProps = { imageUrl: thumbnail || no_song_img, backupImg: no_song_img }

  const artistStyles = '!mt-1'

  return (
    <div className='h-56px mx-32px mb-1 w3-row'>
      <div className='w3-col w-32px h-32px bg-color-0-02 text-center mt-12px mr-8px text-13px color-0-5 rounded-circle leading-32px'>{position}</div>
      <div className='w3-rest h-full bg-color-0-02 hover-bg-color-0-05 rounded-4px transition-colors cursor-pointer group'>
        <div className='h-16 mt-8px mr-24px mb-16px ml-16px w3-row'>
          <div className={`w3-col h16 w-16 useBorder border-0-1 rounded mr-16px ${isVideo ? 'w-72px' : ''}`}>
            <Image className='w-full h-full rounded-2px' {...imageProps} />
          </div>
          {hasRanking && (
            <div className="w3-right w3-col flexCenter w-24px h-16 leading-16 text-base mr-24px color-0-5">
              {handleRanking()}
            </div>
          )}
          <div className='w3-right mr-14px w-fit invisible group-hover:visible'>
            <IconButton className='flex h-16 w-16 color-0-5' size='medium' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
              <div className='cs-more-icon flex rounded-4px text-xl'>
                <IoMdMore />
              </div>
            </IconButton>
          </div>
          <div className="w3-rest overflow-hidden">
            <div className="w-fit h-20px leading-20px max-w-full text-13px font-semibold truncate color-0-88 hover:!text-main transition-colors" title={title}>
              {title}
            </div>
            <CommonArtist artists={artists} styles={artistStyles} />
          </div>
        </div>
      </div>
      <OptionModal {... optionModalProps}>
        <ModalAnimate { ... modalAnimateProps }>
          <ExtendModal { ... extendModalProps } />
        </ModalAnimate>
      </OptionModal>
    </div>
  )
}

export default SongRanking
