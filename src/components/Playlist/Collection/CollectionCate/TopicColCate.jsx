import React, { useState, useRef } from 'react'

import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { FullColCate } from 'components'
import { useOnClickOutside } from 'hooks'

const TopicColCate = ({ defineLang, title, value, mainCate, subCate }) => {
  const [loadMore, setLoadMore] = useState(false)

  const toggleLoadMore = () => {
    setLoadMore(!loadMore)
  }

  const parentRef = useRef(null)
  const fullColCateRef = useRef(null)

  useOnClickOutside(fullColCateRef, parentRef, toggleLoadMore)

  return (
    <div className='w3-quarter'>
      <div className='text-sm font-bold uppercase color-0-88 pt-3 pb-5 pl-16px'>{defineLang(title.vi, title.en)}</div>
      {mainCate.map((cate) => {
        const { title, value } = cate
        return (
          <div key={value} className='collection-cate'>
            <MdOutlineKeyboardArrowRight />
            <div className='w3-rest truncate' title={defineLang(title.vi, title.en)}>
              {defineLang(title.vi, title.en)}
            </div>
          </div>
        )
      })}
      <div className='collection-cate'>
        <MdOutlineKeyboardArrowDown />
        <div className='w3-rest truncate' title={defineLang('Thêm', 'Load more')} onClick={toggleLoadMore} ref={parentRef}>
          {defineLang('Thêm...', 'Load more...')}
        </div>
      </div>
      {loadMore && <FullColCate ref={fullColCateRef} subCate={subCate} defineLang={defineLang} />}
    </div>
  )
}

export default TopicColCate
