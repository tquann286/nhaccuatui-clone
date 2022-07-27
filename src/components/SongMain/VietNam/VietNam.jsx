import React, { useState, useEffect } from 'react'

import { getExplore } from 'services/Explore'
import { vietnamCate } from 'share/subCate'
import { SongSquare, PagiCommon, LoadingV2, CateBasic, ErrorBoundary } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'
import { scrollToTop } from 'share'

const VietNam = ({ defineLang }) => {
  const [vnContent, setVnContent] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [curCate, setCurCate] = useState(vietnamCate[0].value)

  const handleCateChange = (newCate) => {
    setCurCate(newCate)
    setPageIndex(1)
    scrollToTop()
  }

  const cateBasicProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: vietnamCate,
  }

  useEffect(() => {
    try {
      const getVnContentState = async () => {
        setIsLoading(true)
        const vnContent = await getExplore('song', curCate, pageIndex)
  
        setVnContent(vnContent)
        setIsLoading(false)
      }
  
      getVnContentState()
    } catch (error) {
      setIsLoading(false)
      throw new Error
      
    }
  }, [pageIndex, curCate])

  if (isLoading)
    return (
      <div className='viet-nam-container common-marginTLR'>
        <div className='vn-cate pb-1-2'>
          <CateBasic {...cateBasicProps} />
        </div>
        <div className='loading-container'>
          <LoadingV2 />
        </div>
      </div>
    )

  if (!vnContent) return null

  const { data: songs, total } = vnContent

  const pagiProps = {
    pageIndex,
    setPageIndex,
    count: calcPaginationPage(total),
    defineLang,
  }

  return (
    <div className='viet-nam-container common-marginTLR'>
      <div className='vn-cate pb-1-2'>
        <CateBasic {...cateBasicProps} />
      </div>
      <ErrorBoundary>
        <div className='vn-main'>
          <Grid container spacing={2}>
            {songs.map((song) => (
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

export default VietNam
