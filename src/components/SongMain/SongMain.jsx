import React, { useState, useCallback } from 'react'
import './SongMain.scss'

import { CateCommon, ErrorBoundary, Footer, NewHot, VietNam } from 'components'
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
    <ErrorBoundary>
      <div className='song-main-container'>
        <div style={{ paddingTop: '1.2rem' }}>
          <CateCommon {...cateCommonProps} />
        </div>
        <div className='song-main-content margin-footer min-height-v1'>
          {curCate === 'newHot' && <NewHot {...commonProps} />}
          {curCate === 'vietnam' && <VietNam {...commonProps} />}
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default SongMain
