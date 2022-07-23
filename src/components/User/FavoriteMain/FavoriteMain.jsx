import React from 'react'
import './FavoriteMain.scss'

import { CateCommon } from 'components'
import { favCateNav } from 'services/User/Favorite'

const FavoriteMain = () => {
  return (
    <div className='favorite-main'>
      <div className="fm-container">
        <CateCommon categories={favCateNav} />
      </div>
    </div>
  )
}

export default FavoriteMain
