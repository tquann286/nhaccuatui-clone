import React from 'react'

import { MdKeyboardArrowRight } from 'react-icons/md'

const TopicColCate = ({ defineLang }) => {
  return (
    <div className='w3-quarter'>
      <div className='text-2xl font-bold uppercase color-0-88 pt-3 pb-5 pl-16px'>Genre</div>
      <div className='w3-row relative h-10 mt-1.5 ml-16px w-fit color-0-5 transition-colors hoverMainColor flex items-center text-2xl cursor-pointer'>
        <MdKeyboardArrowRight />
        <div className='w3-rest truncate' title='Nhactre'>
          Nhac tre
        </div>
      </div>
    </div>
  )
}

export default TopicColCate
