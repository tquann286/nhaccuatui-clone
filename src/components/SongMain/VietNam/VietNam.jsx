import React, { useState } from 'react'

import { CateBasic } from 'components'
import { vietnamCate } from 'share/subCate'

const VietNam = ({ defineLang }) => {
  const [vnContent, setVnContent] = useState(null)
  const [curCate, setCurCate] = useState(vietnamCate[0].value)

  const handleCateChange = (newCate) => {
    setCurCate(newCate)
  }

  return (
    <div className='viet-nam-container'>
      <div className='vn-cate'>
        <CateBasic />
      </div>
      <div className="vn-main">

      </div>
    </div>
  )
}

export default VietNam
