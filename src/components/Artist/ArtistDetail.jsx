import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { Container, LoadingV2 } from 'components'
import { getArtistDetailData } from 'services/Artist/Artist'

import { useStore } from 'store'

const ArtistDetail = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])
  const params = useParams()
  console.log('params: ', params)

  const [artist, setArtist] = useState({})
  console.log('artist: ', artist)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      const getArtistState = async () => {
        const artist = await getArtistDetailData(params.artistName)
        
        setArtist(artist)
        setIsLoading(false)
      }

      getArtistState()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  },[params.artistName])
  
  if (isLoading)
  return (
    <div className='commonMainOutlet flexCenter h-full'>
      <LoadingV2 />
    </div>
  )

  return (
    <div className='commonMainOutlet'>
      <Container>
        ArtistDetail
      </Container>
    </div>
  )
}

export default ArtistDetail