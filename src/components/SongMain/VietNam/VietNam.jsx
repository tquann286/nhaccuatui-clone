import React, { useState } from 'react'

import { CateBasic } from 'components'
import { vietnamCate } from 'share/subCate'

const VietNam = ({ defineLang }) => {
  const [vnContent, setVnContent] = useState(null)
  const [curCate, setCurCate] = useState(vietnamCate[0].value)
  console.log('curCate: ', curCate)

  const handleCateChange = (newCate) => {
    setCurCate(newCate)
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: vietnamCate,
  }

  return (
    <div className='viet-nam-container'>
      <div className='vn-cate common-paddingLR pt-2'>
        <CateBasic { ... cateCommonProps } />
      </div>
      <div className="vn-main">

      </div>
    </div>
  )
}

export default VietNam
