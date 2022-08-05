import React, { useState, useEffect, useCallback } from 'react'

import { Footer, LoadingV2, Title, NotFoundV2 } from 'components'
import { top100Cate } from 'share/Categories'

import { useStore } from 'store'

const Top100Main = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])
  
  const [curCate, setCurCate] = useState(top100Cate[0].value)

  const handleCateChange = (e, newCate) => {
    setCurCate(newCate)
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: top100Cate,
  }

  return (
    <div className='commonMainOutlet'>
      
    </div>
  )
}

export default Top100Main