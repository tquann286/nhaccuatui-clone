import React, { useState, useEffect, useCallback } from 'react'
import artist_share_fb from 'images/artist_share_fb.png'

import { TrendingArtists, Title, ShareImage, ErrorBoundary, Navbar, CateBasic, Select } from 'components'
import { useStore } from 'store'
import { artistCate, subArtistCate, charactersCate } from 'share/Categories'
import { getArtistsMain } from 'services/Artist/Artist'
import { Grid } from '@mui/material'
import { manualPagi } from 'share/utilities'

const ArtistMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const [artists, setArtists] = useState(null)
  const [renderArtists, setRenderArtists] = useState(null)
  console.log('renderArtists: ', renderArtists)
  const [curCate, setCurCate] = useState(artistCate[0].value)
  const [curSubCate, setCurSubCate] = useState(subArtistCate[0].value)
  const [selectValue, setSelectValue] = useState(charactersCate[0].value)
  const [pageIndex, setPageIndex] = useState(1)

  const handleCateChange = (newCate) => {
    setCurCate(newCate)
  }

  const handleSubCateChange = (newCate) => {
    setCurSubCate(newCate)
  }

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value)
  }

  const navbarProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: artistCate,
  }

  const cateBasicProps = {
    defineLang,
    curCate: curSubCate,
    handleCateChange: handleSubCateChange,
    categories: subArtistCate,
  }

  const selectProps = {
    selectValue,
    handleChange: handleSelectChange,
    options: charactersCate,
    defineLang,
  }

  useEffect(() => {
    const getArtistsState = async () => {
      try {
        const artists = await getArtistsMain(curCate, curSubCate)

        setArtists(artists)
      } catch (error) {}
    }

    getArtistsState()
  }, [curCate, curSubCate])

  useEffect(() => {
    if (artists) {
      const renderArtists = artists.slice(manualPagi(pageIndex, 24).start, manualPagi(pageIndex, 24).end)

      setRenderArtists(renderArtists)
    }
  }, [artists, pageIndex])

  if (!artists) return null

  return (
    <ErrorBoundary>
      <div className='artist-main-container commonMainOutlet'>
        <Title title={defineLang('Nghệ sĩ - Danh sách ca sĩ, nhóm nhạc mới hot nhất hiện nay', 'Artist - New singers and groups today')} />
        <ShareImage imageUrl={artist_share_fb} />
        <TrendingArtists defineLang={defineLang} />
        <div className='po-re'>
          <div>
            <Navbar {...navbarProps} />
            <div className='pt-2 common-paddingLR'>
              <CateBasic {...cateBasicProps} />
            </div>
          </div>
          <div className='artists-select po-ab'>
            <Select {...selectProps} />
          </div>
        </div>
        <div className='artist-wrapper'>
          <Grid container spacing={2}>
            artists
          </Grid>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default ArtistMain
