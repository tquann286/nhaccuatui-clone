import React from 'react'

import { Top3Item } from 'components'
import { isEmpty } from 'lodash'

const Top3List = ({ top3, activeItem, setActiveItem }) => {
  if (isEmpty(top3)) return null

  return (
    <div className='px-24px'>
      {top3.map((item, i) => (
        <Top3Item activeItem={activeItem} setActiveItem={setActiveItem} key={item.songKey} {...item} i={i} />
      ))}
    </div>
  )
}

export default Top3List
