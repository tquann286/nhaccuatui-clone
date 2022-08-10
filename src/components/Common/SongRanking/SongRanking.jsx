import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import no_song_img from 'images/default/default_song.png'

import { useStore } from 'store'
import { CommonArtist, ExtendModal, Image, ModalAnimate, OptionModal } from 'components'
import { IconButton } from '@mui/material'
import { IoMdMore } from 'react-icons/io'
import { createSongUrl, handleCopySong } from 'share/utilities'
import { handleAddToFavSong } from 'share/addToFav'
import { basicModal } from 'share/animation'

const SongRanking = ({ position, defineLang, keyId, artists, duration, thumbnail, title, type }) => {
  const [state] = useStore()
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
    handleCopySong(e, defineLang, title, keyId)
    toggleShowMore()
  }

  const handleGoToSong = (e) => {
    e.stopPropagation()
    navigate(createSongUrl(title, keyId))
  }

  const handleAddToFav = (e) => {
    e.stopPropagation()
    if (type === 'SONG') {
      handleAddToFavSong(keyId, state.favSongsKey, defineLang)
    } else {

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
    keyId,
  }

  const extendModalProps = {
    copyLink: true,
    handleCopyLink: (e) => onCopyLink(e),
    goToSong: true,
    handleGoToSong: (e) => handleGoToSong(e),
    addToFav: true,
    handleAddToFav: (e) => handleAddToFav(e)
  }

  const imageProps = { imageUrl: thumbnail || no_song_img, backupImg: no_song_img }

  const artistStyles = '!mt-1'

  return (
    <div className='h-56px mx-32px mb-1 w3-row'>
      <div className='w3-col w-32px h-32px bg-color-0-02 text-center mt-12px mr-8px text-13px color-0-5 rounded-circle leading-32px'>{position}</div>
      <div className='w3-rest h-full bg-color-0-02 hover-bg-color-0-05 rounded-4px transition-colors cursor-pointer group'>
        <div className='h-16 mt-8px mr-24px mb-16px ml-16px w3-row'>
          <div className='w3-col h16 w-16 useBorder border-0-1 rounded mr-16px '>
            <Image className='w-full h-full rounded-2px' {...imageProps} />
          </div>
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
