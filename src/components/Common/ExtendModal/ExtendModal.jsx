import React from 'react'
import './ExtendModal.scss'

import { SiYoutubemusic } from 'react-icons/si'
import { BsLink45Deg, BsMusicNote } from 'react-icons/bs'

import { useStore } from 'store'
import { auth } from 'config/firebase'

const ExtendModal = ({ handleAddToFav, copyLink, handleCopyLink, goToSong, handleGoToSong }) => {
  const [state] = useStore()
  const defineLang = (vie, eng) => (state.lang === 'vi' ? vie : eng)

  const onCopyLink = (e) => {
    handleCopyLink(e)
  }

  return (
    <div className='extend-modal-main color-0-88 bg-dark-color-1'>
      <ul>
        {auth.currentUser && (
          <li onClick={handleAddToFav}>
            <SiYoutubemusic />
            <span>{defineLang('Thêm vào chờ phát', 'Add to queue')}</span>
          </li>
        )}
        {copyLink && (
          <li onClick={(e) => onCopyLink(e)}>
            <BsLink45Deg />
            <span>{defineLang('Sao chép link', 'Copy link')}</span>
          </li>
        )}
        {goToSong && (
          <li onClick={(e) => handleGoToSong(e)}>
            <BsMusicNote />
            <span>{defineLang('Đi đến bài hát', 'Go to song')}</span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default ExtendModal
