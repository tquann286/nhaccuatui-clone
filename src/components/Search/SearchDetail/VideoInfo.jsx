import React from 'react'

import { CommonVideo } from 'components'
import { Grid } from '@mui/material'

const VideoInfo = ({ videos, defineLang }) => {
  console.log(videos)

  return (
    <div className='video-info-container common-section'>
      <div class='video-info-title common-header common-title color-0-88'>Video</div>
      <div className="video-info-main common-main">
        <Grid className='list-videos' container spacing={2}>
          {videos.map(video => (
            <Grid item key={video.key} xs={3} sm={3} md={3} lg={3} xl={3}>
              <CommonVideo { ... video } keyId={video.key} videoHeight='12rem' />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default VideoInfo