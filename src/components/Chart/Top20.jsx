import React, { useState, useEffect } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'

import { CateBasic } from 'components'
import { weekSubCate } from 'share/Categories'
import { getRankDay, getRankWeek } from 'services/Chart/Top20'

const Top20 = () => {
  const [defineLang, curCate, navigate] = useOutletContext()
  const [searchParams] = useSearchParams()

  const [curSubCate, setCurSubCate] = useState(weekSubCate[0].value)

  const handleTitle = ({ vi, en }) => (document.title = defineLang(`Bảng xếp hạng bài hát ${vi} - Tuần 31/2022 - NhacCuaTui Clone`, `${en} Song Chart - Week 31/2022 - NhacCuaTui Clone`))

  const [rankWeek, setRankWeek] = useState(getRankWeek())
  console.log('rankWeek: ', rankWeek)

  useEffect(() => {
    setCurSubCate(searchParams.get('q'))

    switch (curSubCate) {
      case 'nhac-viet':
        handleTitle(weekSubCate[0].title)
        break
      case 'au-my':
        handleTitle(weekSubCate[1].title)
        break
      case 'nhac-han':
        handleTitle(weekSubCate[2].title)
        break
      default:
        break
    }

    console.log(getRankDay())
  }, [curSubCate, defineLang])

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
      {curCate === 'week' && (
        <div className='py-8'>
          <CateBasic {...cateBasicProps} />
        </div>
      )}
    </div>
  )
}

export default Top20
