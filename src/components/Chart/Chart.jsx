import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

import { CateCommon } from 'components'
import { useStore } from 'store'
import { chartCate } from 'share/Categories'

const Chart = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const navigate = useNavigate()

  const [curCate, setCurCate] = useState(chartCate[0].value)

  const handleCateChange = (e, newCate) => {
    setCurCate(newCate)
    if (newCate === 'realtime') {
      navigate(`/bang-xep-hang/realtime`)
    } else {
      navigate(`/bang-xep-hang/top20?q=nhac-viet`)
    }
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: chartCate,
  }

  const outletContext = [defineLang, curCate, navigate]

  return (
    <div className='commonMainOutlet'>
      <div className='pt-16px'>
        <CateCommon {...cateCommonProps} />
      </div>
      <Outlet context={outletContext} />
    </div>
  )
}

export default Chart
