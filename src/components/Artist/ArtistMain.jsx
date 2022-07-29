import React, { useState, useEffect, useCallback } from 'react'
import artist_share_fb from 'images/artist_share_fb.png'

import { TrendingArtists, Title, ShareImage, ErrorBoundary, Navbar } from 'components'
import { useStore } from 'store'
import { artistCate, subArtistCate } from 'share/Categories'
import { getArtistsMain } from 'services/Artist/Artist'

const ArtistMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const [artists, setArtists] = useState(null)
  console.log('artists: ', artists)
  const [curCate, setCurCate] = useState(artistCate[0].value)
  const [curSubCate, setCurSubCate] = useState(subArtistCate[0].value)

  const handleCateChange = (newCate) => {
    setCurCate(newCate)
  }

  const navbarProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: artistCate,
  }

  useEffect(() => {
    const getArtistsState = async () => {
      try {
        const artists = await getArtistsMain(curCate, curSubCate)
        
        setArtists(artists)
      } catch (error) {
        
      }
    }

    getArtistsState()
  }, [])

  return (
    <ErrorBoundary>
      <div className='artist-main-container commonMainOutlet'>
        <Title title={defineLang('Nghệ sĩ - Danh sách ca sĩ, nhóm nhạc mới hot nhất hiện nay', 'Artist - New singers and groups today')} />
        <ShareImage imageUrl={artist_share_fb} />
        <TrendingArtists defineLang={defineLang} />
        <Navbar {...navbarProps} />
      </div>
    </ErrorBoundary>
  )
}

export default ArtistMain
