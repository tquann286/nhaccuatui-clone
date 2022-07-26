import React, { useState, useCallback } from 'react'
import './SongMain.scss'

import { CateCommon, NewHot } from 'components'
import { songMainCate } from 'services/SongPage/SongMain'
import { useStore } from 'store'

const SongMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => state.lang === 'vi' ? vie : eng, [])
  
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
      <div className="song-main-content">
        {curCate === 'newHot' && <NewHot { ... commonProps } />}
      </div>
    </div>
  )
}

export default SongMain