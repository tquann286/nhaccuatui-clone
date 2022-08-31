import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import IconButton from '@mui/material/IconButton'

import { OptionModal, ModalAnimate, ExtendModal } from 'components'
import { handleRenderSpeakerIcon, volumnSlider } from 'services/RightSidebar/SongController'
import { basicModal } from 'share/animation'
import { IoMdMore } from 'react-icons/io'
import { createSongUrl, handleCopySong } from 'share/utilities'
import { handleAddToFavSong } from 'share/addToFav'
import { convertDuration } from 'share'
import { BsShuffle } from 'react-icons/bs'
import { useStore } from 'store'

const SongController = ({ defineLang, title = '', keyId = '', volumn, setVolumn, currentTime, setCurrentTime, audioPlayer = {}, random, toggleRandom }) => {
  const [state] = useStore()

  const navigate = useNavigate()
  const [showMore, setShowMore] = useState(false)

  const parentRef = useRef(null)
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
    handleAddToFavSong(keyId, defineLang)
    toggleShowMore()
  }

  const optionModalProps = {
    showModal: showMore,
    positionRef: moreDivRef,
    parentRef,
    toggleModal: toggleShowMore,
    styles: {
      transform: `translate(${defineLang('45%', '70%')}, -105%)`,
    },
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
    handleAddToFav: (e) => handleAddToFav(e),
  }

  const handleChangeVolumn = (value) => {
    setVolumn(value)
  }

  const volumnSliderProps = {
    ...volumnSlider,
    value: volumn,
    onChange: handleChangeVolumn,
  }

  const timeSliderProps = {
    className: '!w-184px !h-14px',
    // value: currentTime,
    railStyle: {
      height: '0.2rem',
      maxWidth: '100%',
      backgroundColor: state.theme === 'light' ? 'rgba(28,30,32,0.1)' : 'rgba(244, 246, 248, 0.1)',
      borderRadius: '1rem',
    },
    trackStyle: {
      height: '0.2rem',
      borderRadius: '1rem',
      background: 'linear-gradient( to right, rgba(47,128,237,1) 0%, rgba(0,174,239,1) 100% ) no-repeat',
    },
    handleStyle: {
      cursor: 'pointer',
      width: '1.4rem',
      height: '1.4rem',
      backgroundColor: '#fafafa',
      opacity: 1,
      border: '0.1rem solid #2daaed',
    },
  }

  const handleClickSpeaker = () => {
    if (volumn === 0) {
      setVolumn(100)
    } else {
      setVolumn(0)
    }
  }

  return (
    <div className='w-[27.2rem] m-auto pt-8'>
      <div className='flex justify-between'>
        <div className='group relative w-38px rounded-bl-19px rounded-br-19px cursor-pointer' ref={moreDivRef}>
          <div className='z-8' onClick={handleClickSpeaker}>
            <i class={`fa-solid fa-volume-${handleRenderSpeakerIcon(volumn)} color-0-5 w-38px h-38px absolute z-10 bottom-0 rounded-bl-19px rounded-br-19px text-15px p-4`} />
          </div>
          <div className='absolute bottom-0 z-9 left-0 w-full pt-18px pb-36px bg-color-1 rounded-18px origin-bottom opacity-100 scale-0 bg-color-1 transition-all duration-300 invisible shadow-normal select-none group-hover:scale-100 group-hover:visible'>
            <Slider {...volumnSliderProps} />
          </div>
        </div>
        <div className='w-168px h-38px cursor-pointer rounded-19px bg-color-0-02 hover:shadow-sm'>
          <div className='color-0-5 text-13px text-center mt-4 select-none font-medium'>{defineLang('Danh sách phát', 'Song list')}</div>
        </div>
        <div>
          <IconButton className='flex h-16 w-16 color-0-5' size='medium' onClick={(e) => handleMoreOptions(e)} ref={parentRef}>
            <div className='flex rounded-4px text-xl'>
              <IoMdMore />
            </div>
          </IconButton>
          <OptionModal {...optionModalProps}>
            <ModalAnimate {...modalAnimateProps}>
              <ExtendModal {...extendModalProps} />
            </ModalAnimate>
          </OptionModal>
        </div>
      </div>
      <div className='time-slider flex justify-between mt-24px'>
        <div className='text-left w-44px text-10px color-0-88'>{convertDuration(currentTime)}</div>
        <Slider {...timeSliderProps} />
        <div className='text-right w-44px text-10-px color-0-88'>{convertDuration(audioPlayer.duration || 0)}</div>
      </div>
      <div className='mt-16px h-36px flex items-center justify-between'>
        <div className='p-2 rounded-circle cursor-pointer' onClick={toggleRandom}>
          <IconButton aria-label='ramdom-song' size='medium'>
            <BsShuffle className={`${random && 'text-main'} transition-colors`} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default SongController
