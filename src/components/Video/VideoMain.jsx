import React from 'react'
import back_up_video_img from 'images/default/default_video.png'
import { Player } from 'react-tuby'
import 'react-tuby/css/main.css'

import { CircleTitleArtist, LyricDetail, Provider, Sharing, UploadBy, ViewDate } from 'components'
import { isEmpty } from 'lodash'
import { IconButton, Tooltip } from '@mui/material'
import { BsBookmarkPlus } from 'react-icons/bs'
import { handleAddToFavVideo } from 'share/addToFav'
import { handleSourceUrl } from 'services/Video/VideoDetail'
import { getCurrentPathname, handleCopyProxy } from 'share/utilities'
import { toastNotify } from 'share/toast'

const VideoMain = ({ defineLang, videoDetail }) => {

  const { key = '', streamUrls = [], thumbnail, title, artists = [], videoView = {}, dateRelease = 0, uploadBy = {}, provider = {}, lyric = {} } = videoDetail

  const playerProps = {
    src: handleSourceUrl(streamUrls),
    poster: thumbnail || back_up_video_img,
    pictureInPicture: true,
    autoplay: false
  }

  const handleCopyShare = () => {
    handleCopyProxy(defineLang, getCurrentPathname())
  }

  const onShareWindowClose = () => {
    toastNotify(defineLang('Chia sẻ lên facebook thành công', 'Share to facebook successfully'), 'success')
  }

  const sharingProps = { defineLang, placement: 'top', handleCopyShare, onShareWindowClose, shareLink: getCurrentPathname(), shareClass: 'ml-8px' }

  return (
    <div className='w-[calc(100%_-_35.2rem)] transition-all duration-300'>
      <div className='relative w-full'>
        <div className='text-sm bg-color-0-05'>{isEmpty(streamUrls) || <Player {...playerProps} />}</div>
        <div>
          <div className='text-md w-fit color-0-88 mt-16px font-semibold' title={title}>
            {title}
          </div>
          <CircleTitleArtist circleStyles='float-left' titleStyles='!mt-unset ml-8px' artists={artists} />
          {videoView && videoView[key] && <ViewDate view={videoView[key]} dateRelease={dateRelease} defineLang={defineLang} />}
          <UploadBy uploadBy={uploadBy} defineLang={defineLang} />
          <div className='w-full h-64px rounded-4px bg-color-0-02 mt-24px px-24px py-12px flex justify-between'>
            <Provider provider={provider} defineLang={defineLang} />
            <div className='flex items-center'>
              <Tooltip title={defineLang('Thêm vào yêu thích', 'Add to favorite')} placement='top' arrow enterDelay={400}>
                <IconButton size='large' onClick={() => handleAddToFavVideo(key, defineLang)}>
                  <BsBookmarkPlus />
                </IconButton>
              </Tooltip>
              <Sharing {...sharingProps} />
            </div>
          </div>
          <LyricDetail lyric={lyric} defineLang={defineLang} />
        </div>
      </div>
    </div>
  )
}

export default VideoMain
