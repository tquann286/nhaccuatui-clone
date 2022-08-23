import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'

import { useStore } from 'store'
import { LeftSidebar, LoadingV2, VideoMain } from 'components'
import { getVideoDetailData } from 'services/Video/VideoDetail'
import { toastNotify } from 'share/toast'
import { getCurrentPathname, getMaybeLike, handleCopyProxy } from 'share/utilities'

const VideoDetail = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const params = useParams()
  const query = new URLSearchParams(params.videoId)

  const [videoDetail, setVideoDetail] = useState({})
  const [maybeLike, setMaybeLike] = useState(null)
  console.log(videoDetail)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      const getVideoDetailState = async () => {
        const videoDetail = await getVideoDetailData(query.get('k'))
        const maybeLike = await getMaybeLike(videoDetail.key, 'video')

        setVideoDetail(videoDetail)
        setMaybeLike(maybeLike)
        setIsLoading(false)
      }

      getVideoDetailState()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [params.videoKey, query.get('k')])

  const handleCopyShare = () => {
    handleCopyProxy(defineLang, getCurrentPathname())
  }

  const onShareWindowClose = () => {
    toastNotify(defineLang('Chia sẻ lên facebook thành công', 'Share to facebook successfully'), 'success')
  }

  const videoMainProps = {
    defineLang,
    videoDetail,
  }

  return (
    <div className='hp-container'>
      <div className='h-full bg-color-0-02'>
        <LeftSidebar />
        {isLoading ? (
          <div className='ml-8 flexCenter h-screen'>
            <LoadingV2 />
          </div>
        ) : (
          <div className='commonMainOutlet mr-unset'>
            <div className='common-min-h h-full'>
              <div className="ml-32px">
                <div className="flex pt-24px">
                  <VideoMain { ... videoMainProps } />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoDetail
