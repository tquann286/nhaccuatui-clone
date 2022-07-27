import React, { useState, useEffect } from 'react'

import { getExplore } from 'services/Explore'
import { asiaCate } from 'share/subCate'
import { SongSquare, PagiCommon, LoadingV2, CateBasic, ErrorBoundary } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'
import { scrollToTop } from 'share'

const Asia = ({ defineLang }) => {
  const [asia, setAsia] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [curCate, setCurCate] = useState(asiaCate[0].value)

  const handleCateChange = (newCate) => {
    setCurCate(newCate)
    setPageIndex(1)
    scrollToTop()
  }

  const cateBasicProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: asiaCate,
  }

  useEffect(() => {
    const getAsiaState = async () => {
      try {
        setIsLoading(true)
        const asia = await getExplore('song', curCate, pageIndex)

        setAsia(asia)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        throw new Error(error)
      }
    }

    getAsiaState()
  }, [pageIndex, curCate])

  if (isLoading)
    return (
      <div className='asia-container common-marginTLR'>
        <div className='asia-cate pb-1-2'>
          <CateBasic {...cateBasicProps} />
        </div>
        <div className='loading-container'>
          <LoadingV2 />
        </div>
      </div>
    )

  if (!asia) return null

  const { data: songs, total, status } = asia

  const pagiProps = {
    pageIndex,
    setPageIndex,
    count: calcPaginationPage(total),
    defineLang,
  }

  return (
    <div className='asia-container common-marginTLR'>
      <div className='asia-cate pb-1-2'>
        <CateBasic {...cateBasicProps} />
      </div>
      <ErrorBoundary>
        <div className='asia-main'>
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
      </ErrorBoundary>
    </div>
  )
}

export default Asia