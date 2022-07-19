import React from 'react'
import './SearchDetail.scss'

import { SongInfo } from 'components'

const SearchDetail = ({ playlist: playlistInfo, song: songInfo, video: videoInfo, defineLang }) => {


  return (
    <div className='song-detail-container'>
      {songInfo && <SongInfo songs={songInfo.song.slice(0,10)} defineLang={defineLang} />}
    </div>
  )
}

export default SearchDetail