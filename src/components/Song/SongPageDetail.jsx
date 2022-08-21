import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import no_img_song from 'images/default/default_song.png'
import parse from 'html-react-parser'

import { useStore } from 'store'
import { getSongDetailData } from 'services/Song/Song'
import { LoadingV2, Image, Sharing, LineBreak, Title, TitleCommon, CircleTitleArtist, ViewDate, UploadBy, Description, Provider, LyricDetail } from 'components'
import { BsBookmarkPlus, BsPlayCircleFill } from 'react-icons/bs'
import { getCurrentPathname, getSongsView, getLyricData, handleCopyProxy, handleCopyLyric } from 'share/utilities'
import { Button, IconButton, Tooltip } from '@mui/material'
import { toastNotify } from 'share/toast'
import { handleAddToFavSong } from 'share/addToFav'
import { AiOutlineCopy } from 'react-icons/ai'

const SongPageDetail = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const params = useParams()
  const query = new URLSearchParams(params.songKey)

  const [songDetail, setSongDetail] = useState({})
  console.log(songDetail)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      const getSongDetailState = async () => {
        const songDetail = await getSongDetailData(query.get('k'))
        songDetail.songView = await getSongsView(songDetail.key)
        songDetail.lyric = await getLyricData(songDetail.key, 'song')

        setSongDetail(songDetail)
        setIsLoading(false)
      }

      getSongDetailState()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [params.songKey])

  const handleCopyShare = () => {
    handleCopyProxy(defineLang, getCurrentPathname())
  }

  const onShareWindowClose = () => {
    toastNotify(defineLang('Chia sẻ lên facebook thành công', 'Share to facebook successfully'), 'success')
  }

  if (isLoading)
    return (
      <div className='commonMainOutlet flexCenter h-full'>
        <LoadingV2 />
      </div>
    )

  const { artists = [], description, key, thumbnail, title, songView, dateRelease, uploadBy, provider, lyric } = songDetail

  const sharingProps = { defineLang, placement: 'top', handleCopyShare, onShareWindowClose, shareLink: getCurrentPathname(), shareClass: 'ml-8px' }

  return (
    <div className='commonMainOutlet'>
      {artists.length !== 0 && <Title title={`${title} - ${artists.map((art) => art.name).join(', ')} - NhacCuaTui Clone`} />}
      <div className='relative px-32px pt-24px'>
        <div className='w3-row'>
          <div className='w3-col relative w-240px h-240px border-0-1 useBorder rounded-8px overflow-hidden shadow-xl'>
            <Image imageUrl={thumbnail} backupImg={no_img_song} title={title} />
            <div className='absolute right-4 bottom-4 text-xl w-42px h-42px flexCenter rounded-circle cursor-pointer'>
              <BsPlayCircleFill className='!text-slate-100' />
            </div>
          </div>
          <div className='w3-rest pl-24px overflow-hidden'>
            <TitleCommon type='song' defineLang={defineLang} title={title} />
            <CircleTitleArtist circleStyles='float-left' titleStyles='!mt-unset ml-8px' artists={artists} />
            {songView && songView[key] && <ViewDate songView={songView[key]} dateRelease={dateRelease} defineLang={defineLang} />}
            <UploadBy uploadBy={uploadBy} defineLang={defineLang} />
            <Description description={description} />
          </div>
        </div>
        <div className='w-full h-64px rounded-4px bg-color-0-02 mt-24px px-24px py-12px flex justify-between'>
          <Provider provider={provider} defineLang={defineLang} />
          <div className='flex items-center'>
            <Tooltip title={defineLang('Thêm vào yêu thích', 'Add to favorite')} placement='top' arrow enterDelay={400}>
              <IconButton size='large' onClick={() => handleAddToFavSong(key, defineLang)}>
                <BsBookmarkPlus />
              </IconButton>
            </Tooltip>
            <Sharing {...sharingProps} />
          </div>
        </div>
        <LyricDetail lyric={lyric} defineLang={defineLang} />
      </div>
    </div>
  )
}

export default SongPageDetail
