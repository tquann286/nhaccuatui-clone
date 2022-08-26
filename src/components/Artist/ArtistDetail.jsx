import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { ArtistCover, Container, Image, LoadingV2 } from 'components'
import { getArtistDetailData } from 'services/Artist/Artist'

import { useStore } from 'store'

const ArtistDetail = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])
  const params = useParams()

  const [artistDetail, setArtistDetail] = useState({})
  console.log(artistDetail)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      const getArtistDetailState = async () => {
        const artistDetail = await getArtistDetailData(params.artistName)

        setArtistDetail(artistDetail)
        setIsLoading(false)
      }

      getArtistDetailState()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [params.artistName])

  if (isLoading)
    return (
      <div className='commonMainOutlet flexCenter h-full'>
        <LoadingV2 />
      </div>
    )

  const { artist = {} } = artistDetail
  const { coverImageURL = '', id = 0, imageUrl = '', name = '', role = [] } = artist

  const artistCoverProps = {
    coverImageURL,
    imageUrl,
    name,
  }

  return (
    <div className='commonMainOutlet'>
      <Container>
        <div className='flex flex-col justify-center'>
          <div className='px-16 mt-24px'>
            <ArtistCover { ... artistCoverProps } />
          </div>
          <div className="mt-24px">
            
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ArtistDetail
