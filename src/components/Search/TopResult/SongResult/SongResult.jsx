import React from 'react'
import './SongResult.scss'

import { SongSquare } from 'components'

const SongResult = ({ defineLang, total }) => {
  return (
    <div className='song-result-container common-section'>
      <div className='song-result-title color-0-88 search-header'>
        {defineLang('Bài hát ', 'Song ')}
        <span className='color-0-5'>{defineLang(`(Có ${total} kết quả)`, `${total > 1 ? `(There are ${total} results)` : `(There is ${total} result)`}`)}</span>
      </div>
    </div>
  )
}

export default SongResult
