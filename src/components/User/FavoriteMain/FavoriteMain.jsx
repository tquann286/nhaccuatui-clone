import React, { useState, useCallback } from 'react'
import './FavoriteMain.scss'

import { CateCommon, Footer, SongFav, ErrorBoundary, PlaylistFav } from 'components'
import { favCateNav } from 'services/User/Favorite'

import { useStore } from 'store'
import { auth } from 'config/firebase'

const FavoriteMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])
  
  const [curCate, setCurCate] = useState(favCateNav[0].value)

  const handleCateChange = (e, newValue) => {
    setCurCate(newValue)
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: favCateNav,
  }

  const cateFavProps = {
    defineLang,
    currentUser: auth.currentUser,
  }

  return (
    <div className='favorite-main'>
      <ErrorBoundary>
        <div className='fm-container'>
          <CateCommon {...cateCommonProps} />
          <div className='fm-content'>
            {curCate === 'song' && <SongFav {...cateFavProps} />}
            {curCate === 'playlist' && <PlaylistFav {...cateFavProps} />}
          </div>
        </div>
        <Footer />
      </ErrorBoundary>
    </div>
  )
}

export default FavoriteMain
