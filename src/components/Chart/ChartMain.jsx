import React, { useState, useEffect, useCallback } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import { Title, CateCommon, CateBasic } from 'components'
import { useStore } from 'store'

const ChartMain = () => {
  const params = useParams()
  const query = new URLSearchParams(params.top100Id)

  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const navigate = useNavigate()

//   const cateCommonProps = {
//     defineLang,
//     curCate,
//     handleCateChange,
//     categories: top100Cate,
//   }
//   <div className="pt-16px">
//   <CateCommon {...cateCommonProps} />
// </div>
  return (
    <div className='commonMainOutlet'>
      <Title title={defineLang('Bảng xếp hạng bài hát Việt Nam - Tuần 31/2022 - NhacCuaTui Clone', 'Vietnam Song Chart - Week 31/2022 - NhacCuaTui Clone')} />
      
    </div>
  )
}

export default ChartMain