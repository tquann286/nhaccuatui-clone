import React, { useState, useEffect, useCallback } from 'react'
import './TopicMain.scss'

import { LoadingV2, Title } from 'components'
import { getTopicsMain } from 'services/Topic/TopicMain'
import { useStore } from 'store'

const TopicMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const [topicContent, setTopicContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  console.log('topicContent: ', topicContent)

  useEffect(() => {
    const getTopicsState = async () => {
      try {
        setIsLoading(true)
        const topicContent = await getTopicsMain()

        setTopicContent(topicContent)
        setIsLoading(false)
      } catch (error) {
        throw new Error(error)
      }
    }

    getTopicsState()
  }, [])

  if (isLoading)
    return (
      <div className='commonMainOutlet flexCenter h100vh'>
        <LoadingV2 />
      </div>
    )

  return (
    <div className='commonMainOutlet'>
      <Title title={defineLang('Nghe nhạc cực HOT theo chủ đề - NhacCuaTui Clone', 'Listen to HOT music by topic - NhacCuaTui')} />
    </div>
  )
}

export default TopicMain
