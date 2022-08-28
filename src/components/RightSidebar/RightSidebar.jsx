import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NoPlayingSong from './NoPlayingSong'
import no_img_url from 'images/default/default_song.png'
import './RightSidebar.scss'

import { CommonArtist, Image } from 'components'
import { getPlayingSong } from 'services/RightSidebar/RightSidebar'
import { useStore } from 'store'
import { createSongUrl } from 'share/utilities'
import { GiMicrophone } from 'react-icons/gi'
import { Tooltip } from '@mui/material'

const RightSidebar = () => {
  const [state] = useStore()
  const { lang, playingSongId } = state

  const navigate = useNavigate()

  const [playingSong, setPlayingSong] = useState(null)
  console.log(playingSong)

  useEffect(() => {
    if (playingSongId) {
      const getPlayingSongState = async () => {
        const playingSong = await getPlayingSong(playingSongId)

        setPlayingSong(playingSong)
      }

      getPlayingSongState()
    }
  }, [playingSongId])

  const defineLang = useCallback((vie, eng) => (lang === 'vi' ? vie : eng), [lang])

  if (!playingSong) return <NoPlayingSong defineLang={defineLang} />

  const { thumbnail = '', title = '', key = '', artists = [] } = playingSong

  const imageProps = {
    imageUrl: thumbnail,
    backupImg: no_img_url,
    className: 'align-middle w-full h-auto rounded-4px',
    onClick: () => navigate(createSongUrl(title, key)),
  }

  return (
    <div className='rb-container'>
      <div className='w-320 flex overflow-hidden justify-center h-[calc(100vh_-_20rem)]'>
        <div className='w-[27.2rem] mx-auto my-0 h-[calc(100vh_-_20rem)] overflow-hidden'>
          <div className='mt-16px py-12px rounded-4px bg-color-0-02'>
            <div>
              <div className='relative w-240px h-240px mx-auto z-1'>
                <div className='cursor-pointer w-240px h-240px relative overflow-hidden rounded-4px shadow-medium'>
                  <Image {...imageProps} />
                </div>
              </div>
            </div>
            <div className='w3-row mx-16px mt-12px'>
              <div className='w3-col w-[calc(100%_-_5.2rem)] pr-8px'>
                <div className='relative'>
                  <Link to={createSongUrl(title, key)} className='block w-full text-sm font-semibold color-0-88 overflow-hidden hoverMainColor truncate transition-colors'>
                    {title}
                  </Link>
                </div>
                <CommonArtist artists={artists} />
              </div>
              <div className='w3-col w-52px mt-2px flex items-center justify-end'>
                <Tooltip title='Karaoke' >
                  <GiMicrophone className='text-base color-0-5 cursor-pointer hoverMainColor' />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="clickable mt-16px mb-8px color-0-5 flex justify-center font-medium">
            <Link to='/bang-xep-hang/realtime'>{defineLang('Playlist: Top 50 Bài Hát Realtime', 'Playlist: Top 50 Realtime Songs')}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar
