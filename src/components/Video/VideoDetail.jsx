import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'

import { useStore } from 'store'
import { LeftSidebar, LoadingV2 } from 'components'
import { IconButton, Tooltip } from '@mui/material'
import { getVideoDetailData } from 'services/Video/VideoDetail'
import { BsBookmarkPlus } from 'react-icons/bs'
import { toastNotify } from 'share/toast'
import { handleAddToFavVideo } from 'share/addToFav'
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

  return (
    <div className='hp-container'>
      <div className='h-full bg-color-0-02'>
        <LeftSidebar />
        {isLoading ? (
          <div className='commonMainOutlet flexCenter h-full'>
            <LoadingV2 />
          </div>
        ) : (
          <React.Fragment>
            <div className='commonMainOutlet mr-unset'>
              <div className='common-min-h h-full'></div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default VideoDetail
