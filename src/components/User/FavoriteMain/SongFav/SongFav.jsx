import React from 'react'
import './SongFav.scss'

import initImage from 'images/default/default_personal_playlist.png'
import { ShadowThumb } from 'components'

const SongFav = () => {
  return (
    <div className='song-fav-container'>
      <div className="sf-header w3-row">
        <div className="sf-thumb-img w3-col">
          <ShadowThumb width='16rem' shadowHeight='0.6rem' imageUrl={initImage}  />
        </div>
      </div>
    </div>
  )
}

export default SongFav