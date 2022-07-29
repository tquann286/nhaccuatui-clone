import React, { useState, useEffect, useCallback } from 'react'

import { Title } from 'components'
import { getTopicsMain } from 'services/Topic/TopicMain'
import { useStore } from 'store'

const TopicMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => state.lang === 'vi' ? vie :eng, [state.lang])

  const [topicContent, setTopicContent] = useState(null)
  console.log('topicContent: ', topicContent)

  useEffect(() => {
    const getTopicsState = async () => {
      try {
        const topicContent = await getTopicsMain()

        setTopicContent(topicContent)
      } catch (error) {
        throw new Error(error)
      }
    }

    getTopicsState()
  },[])

  if (!topicContent) return null

  return (
    <div className='commonMainOutlet'>
    <Title title={defineLang('Nghe nhạc cực HOT theo chủ đề - NhacCuaTui Clone', 'Listen to HOT music by topic - NhacCuaTui')} />
    
    </div>
  )
}

export default TopicMain