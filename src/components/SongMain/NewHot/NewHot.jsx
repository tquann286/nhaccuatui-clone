import React, { useState, useEffect } from 'react'
import './NewHot.scss'

import { getExplore } from 'services/SongPage/SongMain'
import { SongSquare, PagiCommon, LoadingV2 } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'

const NewHot = ({ defineLang }) => {
  const [newHot, setNewHot] = useState(null)
  console.log('newHot: ', newHot)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getNewHotState = async () => {
      setIsLoading(true)
      const newHot = await getExplore('song', 'moi-hot', pageIndex)

      setNewHot(newHot)
      setIsLoading(false)
    }

    getNewHotState()
  }, [pageIndex])

  if (isLoading)
    return (
      <div className='song-main-loading'>
        <LoadingV2 />
      </div>
    )

  return (
    <div className='new-hot-container common-section common-marginTLR'>
      <div className='new-hot-title color-0-88 common-title'>
        {defineLang('Mới & Hot', 'New & Hot')}
      </div>
    </div>
  )
}

export default NewHot
