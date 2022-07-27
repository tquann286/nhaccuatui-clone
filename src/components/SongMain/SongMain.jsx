import React, { useState, useCallback } from 'react'
import './SongMain.scss'

import { CateCommon, Footer, NewHotSong, VietNamSong, UsUkSong, AsiaSong } from 'components'
import { songMainCate } from 'services/SongPage/SongMain'
import { useStore } from 'store'
import { scrollToTop } from 'share'

const SongMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const [curCate, setCurCate] = useState(songMainCate[0].value)

  const handleCateChange = (e, newCate) => {
    setCurCate(newCate)
    scrollToTop()
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: songMainCate,
  }

  const commonProps = {
    defineLang,
  }

  return (
    <div className='song-main-container'>
      <div style={{ paddingTop: '1.2rem' }}>
        <CateCommon {...cateCommonProps} />
      </div>
      <div className='song-main-content margin-footer min-height-v1'>
        {curCate === 'newHot' && <NewHotSong {...commonProps} />}
        {curCate === 'vietnam' && <VietNamSong {...commonProps} />}
        {curCate === 'usuk' && <UsUkSong {...commonProps} />}
        {curCate === 'asia' && <AsiaSong {...commonProps} />}
      </div>
      <Footer />
    </div>
  )
}

export default SongMain
