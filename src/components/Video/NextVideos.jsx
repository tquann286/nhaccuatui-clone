import React from 'react'

const NextVideos = ({ defineLang, videoDetail }) => {
  return (
    <div className='w-[33.6rem] mx-16px '>
      <div className="flex relative items-center">
        <div className="flex items-center">
          <div className="text-xl color-0-88 font-bold">{defineLang('Nghe tiếp', 'Play next')}</div>
          
        </div>
      </div>
    </div>
  )
}

export default NextVideos