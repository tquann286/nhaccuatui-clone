import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getTop100Item } from 'services/Top100/Top100'


const Top100Item = ({ defineLang }) => {
  const params = useParams()
  const query = new URLSearchParams(params.top100Id)

  const [top100, setTop100] = useState({})
  console.log('top100: ', top100)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      const getTop100State = async () => {
        const top100 = await getTop100Item(query.get('k'))
  
        setTop100(top100)
        setIsLoading(false)
      }
      getTop100State()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }

  },[params.top100Id])

  return (
    <div>Top100Item</div>
  )
}

export default Top100Item