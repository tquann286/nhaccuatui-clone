import React, { useState } from 'react'
import './CateCommon.scss'

import { Box, Tabs, Tab } from '@mui/material'
import { useStore } from 'store'

const CateCommon = ({ categories }) => {
  const [state] = useStore()
  const defineLang = (vie, eng) => (state.lang === 'vi' ? vie : eng)
  
  const [curCate, setCurCate] = useState(categories[0].value)

  const handleCateChange = (e, newValue) => {
    setCurCate(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs className='cate-common-container border-0-05' value={curCate} onChange={handleCateChange} centered>
        {categories.map((cate) => {
          const { title, value } = cate
          return <Tab className='cate-item color-0-88' label={defineLang(title.vi, title.en)} value={value} />
        })}
      </Tabs>
    </Box>
  )
}

export default CateCommon
