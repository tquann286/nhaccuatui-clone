import React, { useState, useEffect } from 'react'
import './SongResult.scss'

import { getSongResult } from 'services/Search/SearchResult'
import { SongSquare, PagiCommon, LoadingV2 } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'

const SongResult = ({ searchTerm, searchQuery, defineLang }) => {
  const [songResult, setSongResult] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getSongResultState = async () => {
      setIsLoading(true)
      const songResult = await getSongResult(searchTerm || searchQuery, pageIndex)

      setSongResult(songResult)
      setIsLoading(false)
    }

    getSongResultState()
  }, [pageIndex])

  if (isLoading)
    return (
      <div className='search-result-loading'>
        <LoadingV2 />
      </div>
    )

  if (!songResult) return null

  const { total } = songResult

  const pagiProps = {
    pageIndex,
    setPageIndex,
    count: calcPaginationPage(total),
    defineLang,
  }

  return (
    <div className='song-result-container common-section'>
      <div className='song-result-title color-0-88 search-header'>
        {defineLang('Bài hát ', 'Song ')}
        <span className='color-0-5'>{defineLang(`(Có ${total.toLocaleString('en-US')} kết quả)`, `${total > 1 ? `(There are ${total.toLocaleString('en-US')} results)` : `(There is ${total} result)`}`)}</span>
      </div>
      <div className='song-result-main'>
        <Grid container spacing={2}>
          {songResult?.song.map((song) => (
            <Grid item key={song.key} xs={3} sm={3} md={3} xl={2}>
              <SongSquare {...song} keyId={song.key} />
            </Grid>
          ))}
        </Grid>
      </div>
      {calcPaginationPage(total) > 1 && (
        <div style={{ margin: '2.4rem 3.2rem 0 3.2rem' }}>
          <PagiCommon {...pagiProps} />
        </div>
      )}
    </div>
  )
}

export default SongResult
