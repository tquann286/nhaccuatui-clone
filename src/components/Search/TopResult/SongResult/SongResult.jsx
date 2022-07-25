import React, { useState, useEffect } from 'react'
import './SongResult.scss'

import { getSongResult } from 'services/Search/SearchResult'
import { SongSquare } from 'components'
import { Grid } from '@mui/material'

const SongResult = ({ searchTerm, searchQuery, defineLang }) => {
  const [songResult, setSongResult] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)
  console.log('songResult: ', songResult)

  useEffect(() => {
    const getSongResultState = async () => {
      const songResult = await getSongResult(searchTerm || searchQuery)

      setSongResult(songResult)
    }

    getSongResultState()
  }, [pageIndex])

  if (!songResult) return null

  const { total } = songResult
  
  return (
    <div className='song-result-container common-section'>
      <div className='song-result-title color-0-88 search-header'>
        {defineLang('Bài hát ', 'Song ')}
        <span className='color-0-5'>{defineLang(`(Có ${total} kết quả)`, `${total > 1 ? `(There are ${total} results)` : `(There is ${total} result)`}`)}</span>
      </div>
      <div className="song-result-main">
        <Grid container spacing={2}>
          {songResult?.song.map(song => (
            <Grid item key={song.key} xs={3} sm={3} md={3} xl={2}>
            <SongSquare { ... song } />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default SongResult
