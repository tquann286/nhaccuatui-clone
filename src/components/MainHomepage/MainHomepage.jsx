import React, { useState, useEffect, useCallback } from 'react'
import './MainHomepage.scss'

import { fetchHomeData } from 'services/HomeContent'

import { NotFound } from 'pages'
import { Loading, ShowcaseSlider, TopicEvent, NewRelease, MusicRanking, NewVideo, Song, HotTopic, Top100, Footer } from 'components'
import { toastNotify } from 'share/toast'

import { useStore } from 'store'

const MainHomepage = () => {
  const [homeContent, setHomeContent] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isFetchingFail, setIsFetchingFail] = useState(false)

  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  useEffect(() => {
    fetchHomeData()
      .then((res) => {
        setHomeContent(res)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        setIsFetchingFail(true)
        toastNotify(defineLang('Có lỗi khi lấy dữ liệu từ server.', 'A server error occurred while retrieving data.'), 'error')

        return <NotFound />
      })
  }, [defineLang])

  if (isFetchingFail) return <NotFound />
  
  if (isLoading) {
    return (
      <div className='hp-main'>
        <Loading />
      </div>
    )
  }

  const { showcase, topicEvent, newRelease, ranking, usukRanking, kpopRanking, video, song, topic, top100 } = homeContent

  return (
    <div className='hp-main'>
      <ShowcaseSlider showcase={showcase} />
      <TopicEvent topicEvent={topicEvent} />
      <NewRelease newRelease={newRelease} />
      <MusicRanking ranking={[ranking, usukRanking, kpopRanking]} />
      <NewVideo videos={video} />
      <Song song={song} />
      <HotTopic hotTopic={topic} />
      <Top100 top100List={top100} />
      <Footer />
    </div>
  )
}

export default MainHomepage
