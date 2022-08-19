import React, { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { convertDuration } from 'share'
import { CommonArtist, Image, OptionModal, ModalAnimate, ExtendModal } from 'components'
import { useStore } from 'store'

import { Grid, IconButton } from '@mui/material'
import { defineColor } from 'services/Common/Top3Realtime'
import { createSongUrl, handleCopySong } from 'share/utilities'
import { handleAddToFavSong } from 'share/addToFav'
import { IoMdMore } from 'react-icons/io'
import backupImg from 'images/default/default_song.png'
import { basicModal } from 'share/animation'

const Top3Item = ({ artists, duration, position, songKey, thumbnail, title, i, activeItem, setActiveItem }) => {
  const navigate = useNavigate()
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

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
    handleAddToFavSong(songKey, defineLang)
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
    handleAddToFav: (e) => handleAddToFav(e),
  }

  return (
    <Grid container className={`my-2px py-4px pr-12px pl-8px rounded-4px ${activeItem === i ? 'bg-white/[.05]' : 'bg-white/[.02]'}`} onMouseEnter={() => setActiveItem(i)}>
      <Grid item xs={true}>
        <Grid container className='items-center flex h-full'>
          <Grid item xs={6}>
            <Grid container className='items-center'>
              <span className='mr-16px ml-6px  text-center font-semibold text-base' style={{ color: defineColor(i) }}>
                {position}
              </span>
              <Image imageUrl={thumbnail} backupImg={backupImg} className='w-36px h-36px rounded-2px' />
              <span className='ml-12px truncate text-white/[.88] clickable font-semibold' title={title}>
                {title}
              </span>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <CommonArtist artists={artists} styles='!text-white/50' />
          </Grid>
        </Grid>
      </Grid>
      <Grid container className='items-center w-40'>
        <div className='text-sm font-normal text-white/50 cursor-default'>{convertDuration(duration)}</div>
      </Grid>
      <Grid item className='w-36px'>
        <IconButton className='hover:bg-white/[.08]' aria-label='more-icon' size='medium' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
          <IoMdMore className='text-white/50 text-22px' />
        </IconButton>
      </Grid>
      <OptionModal {...optionModalProps}>
        <ModalAnimate {...modalAnimateProps}>
          <ExtendModal {...extendModalProps} />
        </ModalAnimate>
      </OptionModal>
    </Grid>
  )
}

export default React.memo(Top3Item)
