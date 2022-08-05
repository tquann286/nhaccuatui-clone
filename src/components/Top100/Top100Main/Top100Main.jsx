import React, { useState, useEffect, useCallback } from 'react'
import { Outlet, useSearchParams, useNavigate } from 'react-router-dom'

import { Footer, LoadingV2, Title, NotFoundV2, CateCommon, CateBasic } from 'components'
import { top100Cate, vnTop100Cate, usukTop100Cate, asiaTop100Cate, noLyricTop100Cate } from 'share/Categories'
import { createTop100Url } from 'share/utilities'

import { useStore } from 'store'

const Top100Main = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const navigate = useNavigate()

  const [curCate, setCurCate] = useState(top100Cate[0].value)
  console.log('curCate: ', curCate)
  const [curSubCate, setCurSubCate] = useState(top100Cate[0].subCate[0].value)
  console.log('curSubCate: ', curSubCate)
  const [curShowSubCate, setCurShowSubCate] = useState(top100Cate[0].subCate)
  console.log('curShowSubCate: ', curShowSubCate)

  const navTop100Cate = () => {
    const currentSubCate = curShowSubCate.filter((cate) => cate.value === curSubCate)[0]
    const { title, value } = currentSubCate

    navigate(createTop100Url(defineLang(title.vi, title.en), value))
  }

  useEffect(() => {
    navTop100Cate()
  }, [curCate, curSubCate])

  const handleTop100Cate = (position) => {
    setCurSubCate(top100Cate[position].subCate[0].value)
    setCurShowSubCate(top100Cate[position].subCate)
  }

  const handleCateChange = (e, newCate) => {
    setCurCate(newCate)
    switch (newCate) {
      case 'vietnam':
        handleTop100Cate(0)
        break
      case 'usuk':
        handleTop100Cate(1)
        break
      case 'asia':
        handleTop100Cate(2)
        break
      case 'no-lyric':
        handleTop100Cate(3)
        break
      default:
        break
    }
  }

  const handleSubCateChange = (newCate) => {
    setCurSubCate(newCate)
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: top100Cate,
  }

  const cateBasicProps = {
    defineLang,
    curCate: curSubCate,
    handleCateChange: handleSubCateChange,
    categories: curShowSubCate,
  }

  return (
    <div className='commonMainOutlet'>
      <CateCommon {...cateCommonProps} />
      <CateBasic {...cateBasicProps} />
      <Outlet />
    </div>
  )
}

export default Top100Main
