import React from 'react'
import back_up_video_img from 'images/default/default_video.png'

import { IconButton, Tooltip } from '@mui/material'
import { BsBookmarkPlus } from 'react-icons/bs'
import { handleAddToFavVideo } from 'share/addToFav'
import { Player } from 'react-tuby'
import 'react-tuby/css/main.css'

const VideoMain = ({ defineLang, videoDetail }) => {
  console.log(videoDetail)

  const { streamUrls = [], thumbnail }  = videoDetail

  const playerProps = {
    src: streamUrls.map(stream => ({
      ... stream,
      url: stream.streamUrl
    })),
    poster: thumbnail || back_up_video_img,
    pictureInPicture: true,
  }

  return (
    <div className='w-[calc(100%_-_35.2rem)] transition-all duration-300'>
      <div className='relative w-full bg-color-0-05'>
        <Player { ... playerProps } />
      </div>
    </div>
  )
}

export default VideoMain
