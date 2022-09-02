import React, { useState, useCallback } from 'react'
import './FavoriteMain.scss'

import { CateCommon, SongFav, ErrorBoundary, PlaylistFav, VideoFav, Container } from 'components'
import { userCateNav } from 'services/User/User'

import { useStore } from 'store'
import { auth } from 'config/firebase'

const FavoriteMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const [curCate, setCurCate] = useState(userCateNav[0].value)

  const handleCateChange = (e, newCate) => {
    setCurCate(newCate)
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: userCateNav,
  }

  const cateFavProps = {
    defineLang,
    currentUser: auth.currentUser,
  }

  return (
    <div className='favorite-main'>
      <ErrorBoundary>
        <Container>
          <div className='fm-container'>
            <CateCommon {...cateCommonProps} />
            <div className='fm-content'>
              {curCate === 'song' && <SongFav {...cateFavProps} />}
              {curCate === 'playlist' && <PlaylistFav {...cateFavProps} />}
              {curCate === 'video' && <VideoFav {...cateFavProps} />}
            </div>
          </div>
        </Container>
      </ErrorBoundary>
    </div>
  )
}

export default FavoriteMain
