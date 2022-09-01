import React from 'react'
import no_img_url from 'images/default/nowplaying_default.png'

import Tooltip from '@mui/material/Tooltip'
import { CommonArtist, Image, LineBreak } from 'components'
import { createSongUrl, getPlayingSong, handlePlayNewSong } from 'share/utilities'
import { Link, useNavigate } from 'react-router-dom'
import { GiMicrophone } from 'react-icons/gi'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { BsHeadphones } from 'react-icons/bs'
import { formatNumber } from 'share'
import { toastNotify } from 'share/toast'

const PlayingSongMain = ({ defineLang, title = '', keyId = '', thumbnail = '', artists = [], showPlaylist, toggleShowPlaylist, songView = 0, curPlaylist = [], setCurPlaylist, songsView = {}, actions, dispatch }) => {
  const navigate = useNavigate()

  const imageProps = {
    imageUrl: thumbnail,
    backupImg: no_img_url,
    className: 'align-middle w-full h-auto rounded-4px',
    onClick: () => navigate(createSongUrl(title, keyId)),
  }

  const handlePlaySong = async (songId) => {
    if (songId) {
      const tempSong = await getPlayingSong(songId)

      if (tempSong.streamUrls.length !== 0) {
        dispatch(actions.setPlayingSongId(songId))
      } else {
        toastNotify(defineLang('Bài hát hiện không có sẵn, vui lòng thử lại sau.', 'The song is currently not available, please try again later.'))
      }
    }
  }

  return (
    <div className='w-320px flex overflow-hidden justify-center h-[calc(100vh_-_20rem)]'>
      {showPlaylist ? (
        <div className='w-full'>
          <div className='w-full h-[calc(100vh_-_20.2rem)] overflow-x-hidden overflow-y-auto overscroll-contain scrollbar-hide'>
            <div className='pt-26px px-24px flex items-center justify-between color-0-5'>
              <div className='inline-block text-sm font-medium'>{defineLang('Đang phát', 'Now playing')}</div>
              <MdOutlineKeyboardArrowDown onClick={toggleShowPlaylist} className='text-md cursor-pointer hoverMainColor' />
            </div>
            <div className='py-14px px-24px'>
              <div className='h-16 w3-row'>
                <div className='w3-col w-16 h-16 useBorder border-0-05 rounded-4px overflow-hidden mr-8px'>
                  <Link to={createSongUrl(title, keyId)}>
                    <Image className='w-full h-full rounded-4px' imageUrl={thumbnail} backupImg={no_img_url} />
                  </Link>
                </div>
                <div className='w3-col w3-right text-13px w-fit h-full flex items-end pb-4px color-0-5'>
                  <div className='w-fit'>
                    <div className='flex h-fit items-center'>
                      <BsHeadphones className='mr-1' />
                      <span className=''>{formatNumber(songView)}</span>
                    </div>
                  </div>
                </div>
                <div className='w3-rest pr-8px'>
                  <div className='w-fit max-w-full text-sm font-semibold color-0-88 truncate' title={title}>
                    {title}
                  </div>
                  <CommonArtist artists={artists} styles='!mt-4px' />
                </div>
              </div>
            </div>
            <div className='w-full h-fit min-h-[calc(100%_-_11.4rem)] bg-color-0-02'>
              <div className='pt-24px pl-24px text-sm font-medium color-0-5'>{defineLang('Danh sách bài hát', 'Song list')}</div>
              <div className='px-24px mt-8px'>
                <LineBreak />
              </div>
              {curPlaylist.map((song) => (
                <div key={song.key} className='px-16px py-8px cursor-pointer hover-bg-color-0-05 transition-colors'>
                  <div className='h-42px w3-row'>
                    <div className='w3-col w3-right text-13px w-fit h-full flex items-end color-0-5'>
                      <div className='w-fit'>
                        <div className='flex h-fit items-center'>
                          <BsHeadphones className='mr-1' />
                          <span>{formatNumber(songsView[song.key] || 0)}</span>
                        </div>
                      </div>
                    </div>
                    <div className='w3-rest pr-8px' onClick={() => handlePlayNewSong(song.key, dispatch, actions, defineLang)}>
                      <div className='w-fit max-w-full text-sm font-semibold color-0-88 truncate transition-colors hoverMainColor' title={song.title}>
                        <Link to={createSongUrl(song.title, song.key)}>{song.title}</Link>
                      </div>
                      <CommonArtist artists={song.artists} />
                    </div>
                  </div>
                </div>
              ))}
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
