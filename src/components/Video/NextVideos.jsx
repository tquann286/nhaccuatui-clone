import React from 'react'

import { BallCheckbox } from 'components'

const NextVideos = ({ defineLang, videoDetail, autoplay, toggleAutoplay }) => {

  
  return (
    <div className='w-[33.6rem] mx-16px '>
      <div className='flex relative items-center'>
        <div className='flex items-center'>
          <div className='text-xl color-0-88 font-bold'>{defineLang('Nghe tiếp', 'Play next')}</div>
          <div className='absolute right-0 flexCenter'>
            <p className='text-13px color-0-5 uppercase mr-8px font-normal'>{defineLang('Tự động phát', 'Autoplay')}</p>
            <BallCheckbox title='autoplay' isActive={autoplay} handleClick={toggleAutoplay} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NextVideos
