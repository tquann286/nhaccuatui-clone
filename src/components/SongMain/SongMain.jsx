import React, { useState, useEffect } from 'react'
import './SongMain.scss'

import { getSongMain } from 'services/SongPage/SongMain'
import { SongSquare, PagiCommon, LoadingV2 } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'

const SongMain = () => {
  const [songMain, setSongMain] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)


  return (
    <div className="song-main-container">
      Song Main
    </div>
  )
}

export default SongMain