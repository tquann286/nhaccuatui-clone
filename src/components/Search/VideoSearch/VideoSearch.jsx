import React, { useState, useEffect } from 'react'

import { getVideoResult } from 'services/Search/SearchResult'
import { PagiCommon, LoadingV2, CommonVideo } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'

const VideoSearch = ({ searchTerm, searchQuery, defineLang }) => {
  const [videoSearch, setVideoSearch] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getVideoSearchState = async () => {
      setIsLoading(true)
      const videoResult = await getVideoResult(searchTerm || searchQuery, pageIndex)

      setVideoSearch(videoResult)
      setIsLoading(false)
    }

    getVideoSearchState()
  }, [pageIndex])

  if (isLoading)
    return (
      <div className='search-result-loading'>
        <LoadingV2 />
      </div>
    )

  if (!videoSearch) return null

  const { total } = videoSearch

  const pagiProps = {
    pageIndex,
    setPageIndex,
    count: calcPaginationPage(total),
    defineLang,
  }

  return (
    <div className='video-search-container common-section common-paddingLR'>
      <div className='video-search-title color-0-88 common-header'>
        {defineLang('Video ', 'Video ')}
        <span className='color-0-5'>{defineLang(`(Có ${total.toLocaleString('en-US')} kết quả)`, `${total > 1 ? `(There are ${total.toLocaleString('en-US')} results)` : `(There is ${total} result)`}`)}</span>
      </div>
      <div className='video-search-main'>
        <Grid container spacing={2}>
          {videoSearch?.video.map((video) => (
            <Grid item key={video.key} xs={4} sm={4} md={4} xl={3}>
              <CommonVideo {...video} keyId={video.key} />
            </Grid>
          ))}
        </Grid>
      </div>
      {calcPaginationPage(total) > 1 && (
        <div className='common-marginTLR'>
          <PagiCommon {...pagiProps} />
        </div>
      )}
    </div>
  )
}

export default VideoSearch
