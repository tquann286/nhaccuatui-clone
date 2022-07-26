import React, { useState, useEffect } from 'react'
import './PlaylistSearch.scss'

import { getPlaylistResult } from 'services/Search/SearchResult'
import { PagiCommon, LoadingV2 } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'

const PlaylistSearch = ({ searchTerm, searchQuery, defineLang }) => {
  const [playlistSearch, setPlaylistSearch] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div>PlaylistSearch</div>
  )
}

export default PlaylistSearch