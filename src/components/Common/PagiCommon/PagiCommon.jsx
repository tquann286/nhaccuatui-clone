import React from 'react'
import './PagiCommon.scss'

import { Pagination, PaginationItem } from '@mui/material'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'

const PagiCommon = ({ pageIndex, setPageIndex, count }) => {

  const pagiProps = {
    count,
    siblingCount: 2,
    renderItem: (item) => (
      <PaginationItem
      components={{ previous: MdOutlineArrowBackIosNew, next: MdOutlineArrowForwardIos }}
      {...item}
    />
    )
  }
  
  return (
    <div className="pagi-common-container color-0-5">
      <Pagination { ... pagiProps } />
    </div>
  )
}

export default PagiCommon
