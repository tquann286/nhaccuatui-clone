import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import { Top3Realtime, LoadingV2 } from 'components'
import { getRealtimeData } from 'services/Chart/Realtime'

const Realtime = () => {
  const [defineLang] = useOutletContext()

  const [top3, setTop3] = useState([])
  const [top50, setTop50] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [size, setSize] = useState(10)

  useEffect(() => {
    try {
      setIsLoading(true)
      const getRealtimeState = async () => {
        const top3 = await getRealtimeData(3)
        const top50 = await getRealtimeData(50)

        setTop3(top3)
        setTop50(top50)
        setIsLoading(false)
      }

      getRealtimeState()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [])

  const top3RealtimeProps = {
    top3,
    defineLang,
  }

  if (isLoading) return (
    <div className='flexCenter w-full h-[calc(100vh_-_6.4rem)]'>
      <LoadingV2 />
    </div>
  )
  // overflow-hidden
  return (
    <div>
      <div className='mt-24px ml-32px mr-32px relative z-1 h-[296px] min-w-[600px] rounded-4px'>
        <Top3Realtime {...top3RealtimeProps} />
      </div>
    </div>
  )
}

export default Realtime
