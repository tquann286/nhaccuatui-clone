import React from 'react'
import { Link } from 'react-router-dom'

import { Top3Realtime } from 'components'
import { isEmpty } from 'lodash'

const HomeTop3 = ({ top3, defineLang, showTop3 }) => {
  if (isEmpty(top3)) return null

  const top3Props = { top3, defineLang, showTop3, styles: 'h-[508px] mt-16px mx-32px ' }

  return (
    <div>
      <Link to='/bang-xep-hang/realtime' className='color-0-88 text-xl font-bold clickable ml-32px'>
        NCT Realtime
      </Link>
      <Top3Realtime {...top3Props} />
    </div>
  )
}

export default HomeTop3
