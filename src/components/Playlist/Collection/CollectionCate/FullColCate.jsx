import React from 'react'

import { Grid } from '@mui/material'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

const FullColCate = ({ subCate, defineLang }, ref) => {
  return (
    <div className='absolute bg-color-1 z-10 p-16px rounded-md shadow-lg w-[540px]' ref={ref}>
      <Grid container spacing={2}>
        {subCate.map((cate) => {
          const { title, value } = cate

          return (
            <Grid key={value} item xs={3} md={3} sm={3} xl={2} className='collection-cate'>
              <MdOutlineKeyboardArrowRight />
              <div className='w3-rest truncate' title={defineLang(title.vi, title.en)}>
                {defineLang(title.vi, title.en)}
              </div>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default React.forwardRef(FullColCate)
