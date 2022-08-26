import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const CateCommon = ({ categories, curCate, handleCateChange, defineLang, styles = '', cateStyles = '' }) => (
  <Box sx={{ width: '100%' }} className={styles}>
    <Tabs className='!min-h-16 border-b border-solid border-0-05' value={curCate} onChange={handleCateChange} centered>
      {categories.map((cate) => {
        const { title, value } = cate
        return <Tab key={value} className={`w-48 h-32px p-0 text-13px min-w-48 min-h-32px font-bold color-0-88 ${cateStyles}`} label={defineLang(title.vi, title.en)} value={value} />
      })}
    </Tabs>
  </Box>
)

export default CateCommon
