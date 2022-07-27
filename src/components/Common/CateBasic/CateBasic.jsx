import React from 'react'
import './CateBasic.scss'

const CateBasic = ({ defineLang, curCate, handleCateChange, categories }) => {

  if (!categories) return null

  
  return (
    <div className='cate-basic-container'>
    {categories.map(cate => {
      const { title, value } = cate

      return (
        <div key={value} className="cate-basic-item" onClick={() => handleCateChange(value)}>
          {defineLang(title.vi, title.en)}
        </div>
      )
    })}
  </div>
  )
}

export default CateBasic
