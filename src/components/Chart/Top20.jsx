import React, { useState, useEffect } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'

import { CateBasic, Title } from 'components'
import { weekSubCate } from 'share/Categories'

const Top20 = () => {
  const [defineLang, curCate, navigate] = useOutletContext()
  const [searchParams] = useSearchParams()

  const [curSubCate, setCurSubCate] = useState(weekSubCate[0].value)

  useEffect(() => {
    setCurSubCate(searchParams.get('q'))
  }, [])

  const handleSubCateChange = (newCate) => {
    setCurSubCate(newCate)
    navigate(`/bang-xep-hang/top-20?q=${newCate}`)
  }

  const cateBasicProps = {
    defineLang,
    curCate: curSubCate,
    handleCateChange: handleSubCateChange,
    categories: weekSubCate,
  }

  return (
    <div className='top20-container'>
    <Title title={defineLang('Bảng xếp hạng bài hát - Tuần 31/2022 - NhacCuaTui Clone', 'Song Chart - Week 31/2022 - NhacCuaTui Clone')} />
      {curCate === 'week' && (
        <div className='py-8'>
          <CateBasic {...cateBasicProps} />
        </div>
      )}
    </div>
  )
}

export default Top20
