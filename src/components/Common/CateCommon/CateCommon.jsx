import './CateCommon.scss'

import { Box, Tabs, Tab } from '@mui/material'

const CateCommon = ({ categories, curCate, handleCateChange, defineLang }) => (
  <Box sx={{ width: '100%' }}>
    <Tabs className='cate-common-container border-0-05' value={curCate} onChange={handleCateChange} centered>
      {categories.map((cate) => {
        const { title, value } = cate
        return <Tab key={value} className='cate-item color-0-88' label={defineLang(title.vi, title.en)} value={value} />
      })}
    </Tabs>
  </Box>
)

export default CateCommon
