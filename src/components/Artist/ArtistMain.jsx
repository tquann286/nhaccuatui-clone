import React, { useState, useCallback } from 'react'
import artist_share_fb from 'images/artist_share_fb.png'

import { TrendingArtists, Title, ShareImage, ErrorBoundary, Navbar } from 'components'
import { useStore } from 'store'
import { artistCate } from 'share/Categories'

const ArtistMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const [curCate, setCurCate] = useState(artistCate[0].value)

  const handleCateChange = (newCate) => {
    setCurCate(newCate)
  }

  const navbarProps = {
    defineLang, curCate, handleCateChange, categories: artistCate
  }

  return (
    <ErrorBoundary>
    <div className='artist-main-container commonMainOutlet'>
      <Title title={defineLang('Nghệ sĩ - Danh sách ca sĩ, nhóm nhạc mới hot nhất hiện nay', 'Artist - New singers and groups today')} />
      <ShareImage imageUrl={artist_share_fb} />
      <TrendingArtists defineLang={defineLang} />
      <Navbar { ... navbarProps } />
    </div>
    </ErrorBoundary>
  )
}

export default ArtistMain
