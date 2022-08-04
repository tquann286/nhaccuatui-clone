import React from 'react'

import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

const TopicColCate = ({ defineLang, title, value, mainCate, subCate }) => {
  return (
    <div className='w3-quarter'>
      <div className='text-sm font-bold uppercase color-0-88 pt-3 pb-5 pl-16px'>{defineLang(title.vi, title.en)}</div>
      {mainCate.map(cate => {
        const { title, value } = cate

        return (
          <div key={value} className='w3-row relative h-10 mt-1.5 ml-16px w-fit color-0-5 transition-colors hoverMainColor flex items-center text-sm cursor-pointer'>
            <MdOutlineKeyboardArrowRight />
            <div className='w3-rest truncate' title={defineLang(title.vi, title.en)}>
            {defineLang(title.vi, title.en)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TopicColCate
