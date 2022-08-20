import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import no_img_song from 'images/default/default_song.png'
import no_img_provider from 'images/default/default_provider.png'

import { useStore } from 'store'
import { getSongDetailData } from 'services/Song/Song'
import { LoadingV2, Image, ArtistCircle, CommonArtist, Sharing } from 'components'
import { BsBookmarkPlus, BsPlayCircleFill } from 'react-icons/bs'
import { getCurrentPathname, getSongsView, getLyricData, handleCopyProxy } from 'share/utilities'
import { IconButton, Tooltip } from '@mui/material'
import { toastNotify } from 'share/toast'
import { handleAddToFavSong } from 'share/addToFav'

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

  const { artists, description, key, thumbnail, title, songView, dateRelease, uploadBy, provider } = songDetail

  const sharingProps = { defineLang, placement: 'top', handleCopyShare, onShareWindowClose, shareLink: getCurrentPathname(), shareClass: 'ml-8px' }

  return (
    <div className='commonMainOutlet'>
      <div className='relative px-32px pt-24px'>
        <div className='w3-row'>
          <div className='w3-col relative w-240px h-240px border-0-1 useBorder rounded-8px overflow-hidden shadow-xl'>
            <Image imageUrl={thumbnail} backupImg={no_img_song} title={title} />
            <div className='absolute right-4 bottom-4 text-xl w-42px h-42px flexCenter rounded-circle cursor-pointer'>
              <BsPlayCircleFill className='!text-slate-100' />
            </div>
          </div>
          <div className='w3-rest pl-24px overflow-hidden'>
            <div className='leading-24px'>
              <span className='color-0-5 font-semibold text-sm w-fit'>{defineLang('Bài hát: ', 'Song: ')}</span>
              <span className='color-0-88 font-bold text-base'>{title}</span>
            </div>
            <div className='w3-row mt-8px h-24px leading-24px'>
              <ArtistCircle artists={artists} styles='float-left' />
              <div className='w3-rest truncate leading-[inherit] flex items-center h-full'>
                <CommonArtist artists={artists} styles='!mt-unset ml-8px' />
              </div>
            </div>
            {songView && (
              <div className='w3-row mt-14px flex items-center'>
                <div className='w3-col text-13px color-0-5 w-fit font-normal'>
                  {songView[key].toLocaleString('en-US')} {defineLang('Lượt nghe', 'Listens')}
                </div>
                {dateRelease && (
                  <React.Fragment>
                    <div className='w3-col w-4px h-4px bg-color-0-5 rounded-2px mr-8px ml-14px'></div>
                    <div className='w3-rest text-13px color-0-5 w-fit'>{new Date(dateRelease).toLocaleDateString()}</div>
                  </React.Fragment>
                )}
              </div>
            )}
            {uploadBy && (
              <div className='mt-8 leading-24px text-sm'>
                <span className='color-0-5'>{defineLang('Đăng tải bởi: ', 'Uploaded by: ')}</span>
                <span className='text-main'>{uploadBy.fullName}</span>
              </div>
            )}
            <div className='mt-12px text-sm color-0-5 line-clamp-5 font-normal'>{description}</div>
          </div>
        </div>
        <div className='w-full h-64px rounded-4px bg-color-0-02 mt-24px px-24px py-12px flex justify-between'>
          {provider && (
            <div className='w3-row'>
              <div className='w3-col w-16 h-16 rounded-circle useBorder border-0-05 overflow-hidden'>
                <Image imageUrl={provider.imageUrl} backupImg={no_img_provider} />
              </div>
              <div className='w3-col ml-8px w-fit'>
                <div className='h-18px leading-18px text-13px color-0-5'>{defineLang('Cung cấp bởi:', 'Provided by:')}</div>
                <div className='mt-2 text-sm font-bold text-main uppercase truncate' title={provider.name}>
                  {provider.name}
                </div>
              </div>
            </div>
          )}
          <div className='flex items-center'>
            <Tooltip title={defineLang('Thêm vào yêu thích', 'Add to favorite')} placement='top' arrow enterDelay={400}>
              <IconButton size='large' onClick={() => handleAddToFavSong(key, defineLang)}>
                <BsBookmarkPlus />
              </IconButton>
            </Tooltip>
            <Sharing {...sharingProps} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default SongPageDetail
