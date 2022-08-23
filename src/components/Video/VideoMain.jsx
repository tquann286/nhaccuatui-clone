import React from 'react'
import back_up_video_img from 'images/default/default_video.png'
import { Player } from 'react-tuby'
import 'react-tuby/css/main.css'

import { CircleTitleArtist } from 'components'
import { isEmpty } from 'lodash'
import { IconButton, Tooltip } from '@mui/material'
import { BsBookmarkPlus } from 'react-icons/bs'
import { handleAddToFavVideo } from 'share/addToFav'
import { handleSourceUrl } from 'services/Video/VideoDetail'

const VideoMain = ({ defineLang, videoDetail }) => {
  console.log(videoDetail)

  const { streamUrls = [], thumbnail, title, artists = [] } = videoDetail

  const playerProps = {
    src: handleSourceUrl(streamUrls),
    poster: thumbnail || back_up_video_img,
    pictureInPicture: true,
  }

  return (
    <div className='w-[calc(100%_-_35.2rem)] transition-all duration-300 min-h-[150vh]'>
      <div className='relative w-full'>
        <div className='text-sm bg-color-0-05'>{isEmpty(streamUrls) || <Player {...playerProps} />}</div>
        <div>
          <div className='text-md w-fit color-0-88 mt-16px font-semibold' title={title}>
            {title}
          </div>
          <CircleTitleArtist circleStyles='float-left' titleStyles='!mt-unset ml-8px' artists={artists} />
        </div>
      </div>
    </div>
  )
}

export default VideoMain
