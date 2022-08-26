import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { ArtistCover, CateCommon, Container, Image, LoadingV2 } from 'components'
import { getArtistDetailData } from 'services/Artist/Artist'

import { useStore } from 'store'
import { artistDetailCate } from 'share/Categories'

const ArtistDetail = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])
  const params = useParams()

  const [artistDetail, setArtistDetail] = useState({})
  console.log(artistDetail)
  const [isLoading, setIsLoading] = useState(false)

  const [curCate, setCurCate] = useState(artistDetailCate[0].value)
  const [pageIndex, setPageIndex] = useState(1)

  const handleCateChange = (e, newCate) => {
    setCurCate(newCate)
  }

  useEffect(() => {
    try {
      setIsLoading(true)
      const getArtistDetailState = async () => {
        const size = artistDetailCate.filter(cate => cate.value === curCate)[0].size
        const artistDetail = await getArtistDetailData(params.artistName, curCate, size, pageIndex)

        setArtistDetail(artistDetail)
        setIsLoading(false)
      }

      getArtistDetailState()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [params.artistName, curCate, pageIndex])

  if (isLoading)
    return (
      <div className='commonMainOutlet flexCenter h-full'>
        <LoadingV2 />
      </div>
    )

  const { artist = {} } = artistDetail
  const { coverImageURL = '', imageUrl = '', name = '' } = artist

  const artistCoverProps = {
    coverImageURL,
    imageUrl,
    name,
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: artistDetailCate,
  }

  return (
    <div className='commonMainOutlet'>
      <Container>
        <div className='flex flex-col justify-center'>
          <div className='px-16 mt-24px'>
            <ArtistCover { ... artistCoverProps } />
          </div>
          <div className="mt-24px">
            <CateCommon { ... cateCommonProps } cateStyles='normal-case' />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ArtistDetail
