import React from 'react'
import no_img_url from 'images/default/nowplaying_default.png'

import { CommonArtist, Image } from 'components'
import { createSongUrl } from 'share/utilities'
import { Link, useNavigate } from 'react-router-dom'
import { GiMicrophone } from 'react-icons/gi'
import Tooltip from '@mui/material/Tooltip'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const PlayingSongMain = ({ defineLang, title = '', keyId = '', thumbnail = '', artists = [], showPlaylist, toggleShowPlaylist }) => {
  const navigate = useNavigate()

  const imageProps = {
    imageUrl: thumbnail,
    backupImg: no_img_url,
    className: 'align-middle w-full h-auto rounded-4px',
    onClick: () => navigate(createSongUrl(title, keyId)),
  }

  return (
    <div className='w-320px flex overflow-hidden justify-center h-[calc(100vh_-_20rem)]'>
      {showPlaylist ? (
        <div className='w-full'>
          <div className="w-full h-[calc(100vh_-_20.2rem)] overflow-x-hidden overflow-y-auto overscroll-contain">
            <div className="pt-26px px-24px flex items-center justify-between color-0-5">
              <div className='inline-block text-sm font-medium'>{defineLang('Đang phát', 'Now playing')}</div>
              <MdOutlineKeyboardArrowDown onClick={toggleShowPlaylist} className='text-md cursor-pointer hoverMainColor' />
            </div>
            <div className="py-16px px-24px">
            
            </div>
          </div>
        </div>
      ) : (
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
                  <Link to={createSongUrl(title, keyId)} className='block w-full text-sm font-semibold color-0-88 overflow-hidden hoverMainColor truncate transition-colors'>
                    {title}
                  </Link>
                </div>
                <CommonArtist artists={artists} />
              </div>
              <div className='w3-col w-52px mt-2px flex items-center justify-end'>
                <Tooltip title='Karaoke'>
                  <GiMicrophone className='text-base color-0-5 cursor-pointer hoverMainColor' />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='clickable mt-16px mb-8px color-0-5 flex justify-center font-medium'>
            <Link to='/bang-xep-hang/realtime'>{defineLang('Playlist: Top 50 Bài Hát Realtime', 'Playlist: Top 50 Realtime Songs')}</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlayingSongMain
