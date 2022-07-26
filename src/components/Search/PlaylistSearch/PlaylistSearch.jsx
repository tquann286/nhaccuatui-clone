import React, { useState, useEffect } from 'react'

import { getPlaylistResult } from 'services/Search/SearchResult'
import { PagiCommon, LoadingV2, CommonPlaylist } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'

const PlaylistSearch = ({ searchTerm, searchQuery, defineLang }) => {
  const [playlistSearch, setPlaylistSearch] = useState(null)
  console.log('playlistSearch: ', playlistSearch)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getPlaylistSearchState = async () => {
      setIsLoading(true)
      const songResult = await getPlaylistResult(searchTerm || searchQuery, pageIndex)

      setPlaylistSearch(songResult)
      setIsLoading(false)
    }

    getPlaylistSearchState()
  }, [pageIndex])

  if (isLoading)
    return (
      <div className='search-result-loading'>
        <LoadingV2 />
      </div>
    )

  if (!playlistSearch) return null

  const { total } = playlistSearch

  const pagiProps = {
    pageIndex,
    setPageIndex,
    count: calcPaginationPage(total),
    defineLang,
  }

  return (
    <div className='playlist-search-container common-section common-paddingLR'>
      <div className='playlist-search-title color-0-88 search-header'>
        {defineLang('Danh sách phát ', 'Playlist ')}
        <span className='color-0-5'>{defineLang(`(Có ${total.toLocaleString('en-US')} kết quả)`, `${total > 1 ? `(There are ${total.toLocaleString('en-US')} results)` : `(There is ${total} result)`}`)}</span>
      </div>
      <div className='playlist-search-main'>
        <Grid container spacing={2}>
          {playlistSearch?.playlist.map((playlist) => (
            <Grid item key={playlist.key} xs={3} sm={3} md={3} xl={2}>
              <CommonPlaylist {...playlist} keyId={playlist.key} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default PlaylistSearch
