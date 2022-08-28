import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { useStore } from 'store'
import { Container, LoadingV2, TopicDesc } from 'components'
import { getTopicDetailData } from 'services/Topic/TopicMain'

const TopicDetail = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const params = useParams()
  const query = new URLSearchParams(params.topicId)

  const [topicDetail, setTopicDetail] = useState({})
  console.log(topicDetail)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      const getTopicDetailState = async () => {
        const topicDetail = await getTopicDetailData(query.get('k'))

        setTopicDetail(topicDetail)
        setIsLoading(false)
      }

      getTopicDetailState()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [params.topicKey, query.get('k')])

  if (isLoading)
    return (
      <div className='commonMainOutlet flexCenter h-full'>
        <LoadingV2 />
      </div>
    )

  const { coverImageURL = '', description = '', key = '', playlist = [], title = '' } = topicDetail

  const topicDescProps = {
    defineLang,
    description,
  }

  return (
    <div className='commonMainOutlet'>
      <Container>
        <div className='relative w-full pt-[31.25%] bg-color-0-05 bg-no-repeat bg-cover' style={{ backgroundImage: `url(${coverImageURL})` }}></div>
        <TopicDesc {...topicDescProps} />
      </Container>
    </div>
  )
}

export default TopicDetail
