import React from 'react'
import './ExtendModal.scss'

import { SiAudiomack, SiYoutubemusic } from 'react-icons/si'
import { BsLink45Deg, BsMusicNote } from 'react-icons/bs'

import { useStore } from 'store'
import { auth } from 'config/firebase'
import { isEmpty } from 'lodash'

const ExtendModal = ({ addToFav, handleAddToFav, copyLink, handleCopyLink, goToSong, handleGoToSong, refMapping, handleRefMapping }) => {
  const [state] = useStore()
  const defineLang = (vie, eng) => (state.lang === 'vi' ? vie : eng)

  const onAddToFav = (e) => {
    handleAddToFav(e)
  }

  const onCopyLink = (e) => {
    handleCopyLink(e)
  }

  const onGoToSong = (e) => {
    handleGoToSong(e)
  }

  return (
    <div className='extend-modal-main color-0-6 bg-dark-color-1'>
      <ul>
        {isEmpty(refMapping) || (
          <li className='hover-bg-color-0-05'>
            <SiAudiomack />
            <span>{defineLang('Nghe audio', 'Play audio')}</span>
          </li>
        )}
        {(auth.currentUser && addToFav) && (
          <li className='hover-bg-color-0-05' onClick={(e) => onAddToFav(e)}>
            <SiYoutubemusic />
            <span>{defineLang('Thêm vào yêu thích', 'Add to favorite')}</span>
          </li>
        )}
        {copyLink && (
          <li className='hover-bg-color-0-05' onClick={(e) => onCopyLink(e)}>
            <BsLink45Deg />
            <span>{defineLang('Sao chép link', 'Copy link')}</span>
          </li>
        )}
        {goToSong && (
          <li className='hover-bg-color-0-05' onClick={(e) => onGoToSong(e)}>
            <BsMusicNote />
            <span>{defineLang('Đi đến bài hát', 'Go to song')}</span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default ExtendModal
