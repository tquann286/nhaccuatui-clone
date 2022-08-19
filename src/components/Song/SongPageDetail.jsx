import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import no_img_song from 'images/default/default_song.png'

import { useStore } from 'store'
import { getSongDetailData } from 'services/Song/SongPageDetail'
import { LoadingV2, Image, ArtistCircle, CommonArtist } from 'components'
import { BsPlayCircleFill } from 'react-icons/bs'
import { getSongsView } from 'share/utilities'

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

        setSongDetail(songDetail)
        setIsLoading(false)
      }

      getSongDetailState()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [params.songKey])

  if (isLoading)
    return (
      <div className='commonMainOutlet flexCenter h-full'>
        <LoadingV2 />
      </div>
    )

  const { artists, description, key, thumbnail, title, songView, dateRelease } = songDetail

  return (
    <div className='commonMainOutlet'>
      <div className='relative px-32px pt-24px'>
        <div className='w3-row'>
          <div className='w3-col relative w-240px h-240px border-0-1 useBorder rounded-8px overflow-hidden'>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongPageDetail
