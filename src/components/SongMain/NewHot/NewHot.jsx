import React, { useState, useEffect } from 'react'

import { SongSquare, PagiCommon, LoadingV2 } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'
import { getExplore } from 'services/Explore'

const NewHot = ({ defineLang }) => {
  const [newHot, setNewHot] = useState(null)
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
      <div className='loading-container'>
        <LoadingV2 />
      </div>
    )

  if (!newHot) return null

  const { data: songs, total } = newHot

  const pagiProps = {
    pageIndex,
    setPageIndex,
    count: calcPaginationPage(total),
    defineLang,
  }

  return (
    <div className='new-hot-container common-section common-marginTLR' style={{ paddingTop: '2rem' }}>
      <div className='new-hot-title color-0-88 common-title pb-1-2'>{defineLang('Mới & Hot', 'New & Hot')}</div>
      <div className='new-hot-main'>
        <Grid container spacing={2}>
          {songs?.map((song) => (
            <Grid item key={song.key} xs={3} sm={3} md={3} xl={2}>
              <SongSquare {...song} keyId={song.key} />
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

export default NewHot
