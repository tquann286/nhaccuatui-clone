import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './CommonPlaylist.scss'

import { ShadowOverlay } from 'components'
import { createPlaylistUrl, handleCopyPlaylist } from 'share/utilities'

import { useStore } from 'store'

const CommonPlaylist = ({ keyId, artists, thumbnail, title }) => {
  const [state] = useStore()
  const defineLang = (vie, eng) => state.lang === 'vi' ? vie : eng

  const navigate = useNavigate()

  const onNavigatePlaylist = () => {
    navigate(createPlaylistUrl(title, keyId))
  }

  const onCopyPlaylist = (e) => {
    handleCopyPlaylist(e, title, keyId, defineLang)
  }

  const shadowOverlayProps = {
    width: '100%',
    shadowHeight: '0.6rem',
    imageUrl: thumbnail,
    keyId,
    title,
    handleNavigate: onNavigatePlaylist,
    copyLink: true,
    handleCopyLink: (e) => onCopyPlaylist(e)
  }

  return (
    <div className='common-playlist-container'>
      <ShadowOverlay { ... shadowOverlayProps } />
    </div>
  )
}

export default CommonPlaylist