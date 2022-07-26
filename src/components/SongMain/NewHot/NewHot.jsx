import React from 'react'
import './NewHot.scss'

const NewHot = ({ defineLang }) => {
  return (
    <div className='new-hot-container common-section common-marginTLR'>
      <div className='new-hot-title color-0-88 common-title'>
        {defineLang('Mới & Hot', 'New & Hot')}
      </div>
    </div>
  )
}

export default NewHot
