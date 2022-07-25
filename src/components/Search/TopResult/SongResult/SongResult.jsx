import React, { useState, useEffect } from 'react'
import './SongResult.scss'

import { getSongResult } from 'services/Search/SearchResult'
import { SongSquare } from 'components'

const SongResult = ({ searchTerm, searchQuery, defineLang, total }) => {
  const [songResult, setSongResult] = useState(null)
  console.log('songResult: ', songResult)

  useEffect(() => {
    const getSongResultState = async () => {
      const songResult = await getSongResult(searchTerm || searchQuery)

      setSongResult(songResult)
    }

    getSongResultState()
  }, [])
  
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
