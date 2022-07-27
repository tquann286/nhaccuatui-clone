import React, { useState, useEffect } from 'react'

import { getExplore } from 'services/Explore'
import { othersCate } from 'share/Categories'
import { SongSquare, PagiCommon, LoadingV2, CateBasic, ErrorBoundary, CommonPlaylist } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'
import { scrollToTop } from 'share'

const Others = ({ defineLang, type }) => {
  const [others, setOthers] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [curCate, setCurCate] = useState(othersCate[0].value)
  
  const handleCateChange = (newCate) => {
    setCurCate(newCate)
    setPageIndex(1)
    scrollToTop()
  }

  const cateBasicProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: othersCate,
  }

  useEffect(() => {
    try {
      const getOthersState = async () => {
        setIsLoading(true)
        const others = await getExplore(type, curCate, pageIndex)

        setOthers(others)
        setIsLoading(false)
      }

      getOthersState()
    } catch (error) {
      setIsLoading(false)
      throw new Error()
    }
  }, [pageIndex, curCate, type])

  if (isLoading)
    return (
      <div className='others-container common-marginTLR'>
        <div className='others-cate pb-1-2'>
          <CateBasic {...cateBasicProps} />
        </div>
        <div className='loading-container'>
          <LoadingV2 />
        </div>
      </div>
    )

  if (!others) return null

  const { data, total } = others

  const pagiProps = {
    pageIndex,
    setPageIndex,
    count: calcPaginationPage(total),
    defineLang,
  }

  return (
    <div className='others-container common-marginTLR'>
      <div className='others-cate pb-1-2'>
        <CateBasic {...cateBasicProps} />
      </div>
      <ErrorBoundary>
        <div className='others-main'>
          <Grid container spacing={2}>
            {data?.map((content) => (
              <Grid item key={content.key} xs={3} sm={3} md={3} xl={2}>
                {type === 'song' && <SongSquare {...content} keyId={content.key} />}
                {type === 'playlist' && <CommonPlaylist {...content} keyId={content.key} />}
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

export default Others