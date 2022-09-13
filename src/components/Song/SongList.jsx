import React from 'react'
import './SongList.scss'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { SongItem } from 'components'
import { getValidArr } from 'share/utilities'

const SongList = ({ defineLang, listSong = [], removeFav, addToFav, songsView, setFavSongs, removeHistory, setHistorySongs }) => {
  const [animationParent] = useAutoAnimate()

  const songItemProps = {
    songsView,
    setFavSongs,
    defineLang,
    removeFav,
    addToFav,
    removeHistory,
    setHistorySongs
  }

  return (
    <div className='mt-16px'>
      <ul ref={animationParent}>
        <li className='song-list-common song-list-header bg-color-0-02'>
          <div className='song-list-title-artist sm:w-[calc(100%_-_18.4rem)] ip5:w-[calc(100%_-_13.7rem)]'>
            <div className='song-list-title fz-13px song-list-title-header sm:pl-16px ip5:pl-6px color-0-88'>{defineLang('Tiêu đề', 'Title')}</div>
            <div className='song-list-title fz-13px song-list-artist-header sm:px-12px ip5:px-4px color-0-88'>{defineLang('Nghệ sỹ', 'Artist')}</div>
          </div>
          <div className='song-list-title fz-13px listen-title sm:w-[82px] ip5:w-28 sm:mr-22px ip5:mr-12px'>{defineLang('Lượt nghe', 'Listens')}</div>
          <div className='song-list-title fz-13px duration-title sm:w-32 ip5:w-64px'>{defineLang('Thời gian', 'Duration')}</div>
        </li>
        {getValidArr(listSong).map((song) => song.key && <SongItem {...song} {...songItemProps} key={song.key} keyId={song.key} />)}
      </ul>
    </div>
  )
}

export default SongList
