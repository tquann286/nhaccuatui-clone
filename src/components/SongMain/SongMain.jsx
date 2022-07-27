import React, { useState, useCallback } from 'react'
import './SongMain.scss'

import { CateCommon, Footer, NewHot, VietNam, UsUk, Asia, Others } from 'components'
import { commonMainCate } from 'share/Categories'
import { useStore } from 'store'
import { scrollToTop } from 'share'

const SongMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const [curCate, setCurCate] = useState(commonMainCate[0].value)

  const handleCateChange = (e, newCate) => {
    setCurCate(newCate)
    scrollToTop()
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: commonMainCate,
  }

  const commonProps = {
    defineLang,
    type: 'song'
  }

  return (
    <div className='song-main-container'>
      <div style={{ paddingTop: '1.2rem' }}>
        <CateCommon {...cateCommonProps} />
      </div>
      <div className='song-main-content margin-footer min-height-v1'>
        {curCate === 'newHot' && <NewHot {...commonProps} />}
        {curCate === 'vietnam' && <VietNam {...commonProps} />}
        {curCate === 'usuk' && <UsUk {...commonProps} />}
        {curCate === 'asia' && <Asia {...commonProps} />}
        {curCate === 'others' && <Others {...commonProps} />}
      </div>
      <Footer />
    </div>
  )
}

export default SongMain
