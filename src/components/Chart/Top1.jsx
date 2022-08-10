import React from 'react'

const Top1 = ({ artists, highestPosition, oldPosition, position, songKey, thumbnail, title, totalWeekInRanked, isVideo, defineLang }) => {
  return (
    <div className='mt-16px h-[20.8rem] bg-color-0-02 pt-20px pr-32px pb-22px pl-40px'>
      <div className='w3-row relative w-full h-full pt-6px'>
        <div className='absolute top-0 w-48px h-22px leading-22px rounded-tr-4px rounded-bl-4px bg-hot text-10px font-bold text-center uppercase text-slate-50'>Top 1</div>
        <div className={`w3-col w-64 h-64 useBorder border-0-1 rounded-4px shadow-md transition-width will-change-auto ${isVideo ? 'w-[284px]' : ''}`}>
          <div className='w-full h-full bg-cover bg-no-repeat rounded-4px' style={{ backgroundImage: `url(${thumbnail})` }}></div>
        </div>
        <div className='w3-rest pl-40px'>
          <div className='w3-row mt-16px flex'>
            <div className='w3-col w-fit text-13px color-0-5 mr-6px flex items-end font-normal'>{isVideo ? 'Video' : defineLang('Bài hát', 'Song')}</div>
            <div className='w3-rest text-sm font-semibold flex items-end'>{title}</div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Top1
