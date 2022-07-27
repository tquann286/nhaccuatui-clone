import React, { useState, useCallback } from 'react'
import './SongMain.scss'

import { CateCommon, Footer, NewHot, VietNam } from 'components'
import { songMainCate } from 'services/SongPage/SongMain'
import { useStore } from 'store'

const SongMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => state.lang === 'vi' ? vie : eng, [state.lang])
  
  const [curCate, setCurCate] = useState(songMainCate[0].value)

  const handleCateChange = (e, newCate) => {
    setCurCate(newCate)
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: songMainCate,
  }

  const commonProps = {
    defineLang
  }

  return (
    <div className="song-main-container">
      <div style={{ paddingTop: '1.2rem' }}>
        <CateCommon { ... cateCommonProps } />
      </div>
      <div className="song-main-content margin-footer min-height-v1">
        {curCate === 'newHot' && <NewHot { ... commonProps } />}
        {curCate === 'vietnam' && <VietNam { ... commonProps } />}
      </div>
      <Footer />
    </div>
  )
}

export default SongMain