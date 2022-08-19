import React, { useState, useEffect, useCallback } from 'react'

import { useStore } from 'store'
import { useParams } from 'react-router-dom'
import { getSongDetailData } from 'services/Song/SongPageDetail'

const SongPageDetail = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const params = useParams()
  const query = new URLSearchParams(params.songKey)

  const [songDetail, setSongDetail] = useState({})
  console.log('songDetail: ', songDetail)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    try {
      setIsLoading(true)
      const getSongDetailState = async () => {
        const songDetail = await getSongDetailData(query.get('k'))

        setSongDetail(songDetail)
        setIsLoading(false)
      }

      getSongDetailState()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  },[params.songKey])

  return (
    <div className='commonMainOutlet'>
    
    </div>
  )
}

export default SongPageDetail