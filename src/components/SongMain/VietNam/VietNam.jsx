import React, { useState, useEffect } from 'react'

import { getExplore } from 'services/Explore'
import { vietnamCate } from 'share/subCate'
import { SongSquare, PagiCommon, LoadingV2, CateBasic } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'
import { scrollToTop } from 'share'

const VietNam = ({ defineLang }) => {
  const [vnContent, setVnContent] = useState(null)
  console.log('vnContent: ', vnContent)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [curCate, setCurCate] = useState(vietnamCate[0].value)
  console.log('curCate: ', curCate)

  const handleCateChange = (newCate) => {
    setCurCate(newCate)
    setPageIndex(1)
    scrollToTop()
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: vietnamCate,
  }

  useEffect(() => {
    const getVnContentState = async () => {
      setIsLoading(true)
      const vnContent = await getExplore('song', curCate, pageIndex)

      setVnContent(vnContent)
      setIsLoading(false)
    }

    getVnContentState()
  }, [pageIndex, curCate])

  if (isLoading)
    return (
      <div className='song-main-loading'>
        <LoadingV2 />
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
        <CateBasic { ... cateCommonProps } />
      </div>
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
    </div>
  )
}

export default VietNam
