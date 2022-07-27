import React, { useState, useCallback } from 'react'
import './SongPlaylistVideo.scss'

import { CateCommon, Footer, NewHot, VietNam, UsUk, Asia, Others } from 'components'
import { commonMainCate } from 'share/Categories'
import { useStore } from 'store'
import { scrollToTop } from 'share'

const SongPlaylistVideo = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  return (
    <div className="song-playlist-video-container">
      Song Playlist Video
    </div>
  )
}

export default SongPlaylistVideo