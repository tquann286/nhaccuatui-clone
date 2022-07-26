import React from 'react'
import './PagiCommon.scss'

import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import { PaginationItem, usePagination } from '@mui/material'

const PagiCommon = ({ pageIndex, setPageIndex, count, defineLang }) => {
  const { items } = usePagination({
    count,
    siblingCount: 2,
  })

  console.log(items)

  const defineTitle = (type) => {
    switch (type) {
      case 'previous':
        return defineLang('Trang trước', 'Previous page')
      case 'next':
        return defineLang('Trang kế', 'Next page')
      case 'end-ellipsis':
        return defineLang('Đến 5 Trang Kế', 'Next to 5 pages')
      case 'start-ellipsis':
        return defineLang('Về 5 Trang Trước', 'Back to 5 pages')
      default:
        return ''
    }
  }

  const defineChildren = ({ page, type, selected, disabled, ...item }) => {
    let children = null

    switch (type) {
      case 'start-ellipsis':
        return <div className='pagi-btn start-ellipsis ellipsis'>...</div>
      case 'end-ellipsis':
        return <div className='pagi-btn end-ellipsis ellipsis'>...</div>
      case 'previous':
        return (
          <div className={`pagi-btn previous-btn nav-btn ${disabled && 'disabled color-0-2'}`} {...item}>
            <MdOutlineArrowBackIosNew />
          </div>
        )
      case 'next':
        return (
          <div className={`pagi-btn next-btn nav-btn ${disabled && 'disabled color-0-2'}`} {...item}>
            <MdOutlineArrowForwardIos />
          </div>
        )
      case 'page':
        return (
          <div className={`pagi-btn page-btn page-common ${selected && 'selected'}`} {...item}>
            {page}
          </div>
        )
      default:
        break
    }
  }

  return (
    <div className='pagi-common-container color-0-5'>
      <ul className='ul-pagination border-0-1'>
        {items.map(({ page, type, selected, ...item }, index) => {
          return (
            <li key={index} title={defineTitle(type)}>
              {defineChildren({ page, type, selected, ...item })}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PagiCommon
