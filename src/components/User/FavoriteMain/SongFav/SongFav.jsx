import React, { useState, useEffect } from 'react'
import './SongFav.scss'

import initImage from 'images/default/default_personal_playlist.png'
import initUser from 'images/default/default_user.jpg'

import { ShadowThumb, SongItem, SquareImg } from 'components'
import { getFavSong } from 'services/User/Favorite'
import { getSongsView, getListSongsKey } from 'share/utilities'
import { clearAllSong } from 'services/firebase/firestore'
import { toastNotify } from 'share/toast'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useStore, actions } from 'store'

const SongFav = ({ defineLang, currentUser }) => {
  const [state, dispatch] = useStore()
  const { favSongs } = state
  const [animationParent] = useAutoAnimate()

  const [songsView, setSongView] = useState({})

  const handleClearAllSong = async () => {
    await clearAllSong()
    dispatch(actions.setFavSongs([]))
    toastNotify(defineLang('Xóa tất cả bài hát khỏi yêu thích thành công', 'Removed all songs from favorite list successfully'), 'success')
  }

  useEffect(() => {
    const getFavSongsState = async () => {
      const favSongs = await getFavSong(defineLang)
      
      dispatch(actions.setFavSongs(favSongs))
    }

    getFavSongsState()
  }, [])

  useEffect(() => {
    try {
      if (favSongs) {
        const getSongsViewState = async (listSongsKey) => {
          const songsView = await getSongsView(listSongsKey)
          setSongView(songsView)
        }

        getSongsViewState(getListSongsKey(favSongs))
      }
    } catch (error) {
      throw new Error(error)
    }
  }, [favSongs])

  if (!currentUser) return null

  const { displayName, photoURL } = currentUser

  const songItemProps = {
    songsView,
    favSongs,
    setFavSongs: (favSongs) => dispatch(actions.setFavSongs(favSongs)),
    defineLang,
  }

  return (
    <div className='song-fav-container'>
      <div className='sf-header w3-row'>
        <div className='sf-thumb-img w3-col'>
          <ShadowThumb width='16rem' shadowHeight='0.6rem' imageUrl={initImage} />
        </div>
        <div className='sf-info w3-rest'>
          <div className='common-sub-title color-0-5'>
            Playlist:
            <span className='color-0-88'>{defineLang('Bài hát yêu thích', 'Favorite songs')}</span>
          </div>
          <div className='sf-total-number w3-row'>
            <div className='width-fit-content color-0-5'>{defineLang(`${favSongs.length || 0} bài hát`, `${favSongs.length || 0} songs`)}</div>
          </div>
          <div className='bottom-position'>
            <div className='sf-author w3-row bg-color-0-02'>
              <div className='sf-author-main w3-rest w3-row'>
                <div className='sf-author-img border-0-05 w3-col'>
                  <SquareImg imageUrl={photoURL || initUser} title={displayName} />
                </div>
                <div className='sf-author-desc w3-col'>
                  <div className='small-common color-0-5'>{defineLang('Được tạo bởi:', 'Created by:')}</div>
                  <div className='sf-author-name'>{displayName}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='sf-main'>
        <div className='song-list color-0-88 alcenter-jcbetween'>
          <div className='sf-title-content'>{defineLang('Danh sách bài hát', 'Song list')}</div>
          {favSongs.length !== 0 && (
            <div className='clear-all-song color-0-5' onClick={handleClearAllSong}>
              {defineLang('Xóa tất cả', 'Clear all')}
            </div>
          )}
        </div>
        <div style={{ marginTop: '1.6rem' }}>
          <ul ref={animationParent}>
            <li className='song-list-common song-list-header bg-color-0-02'>
              <div className='song-list-title-artist'>
                <div className='song-list-title song-list-title-header color-0-88'>{defineLang('Tiêu đề', 'Title')}</div>
                <div className='song-list-title song-list-artist-header color-0-88'>{defineLang('Nghệ sỹ', 'Artist')}</div>
              </div>
              <div className='song-list-title listen-title'>{defineLang('Lượt nghe', 'Listens')}</div>
              <div className='song-list-title duration-title'>{defineLang('Thời gian', 'Duration')}</div>
            </li>

            {favSongs?.map((song) => (
              <SongItem {...song} { ... songItemProps } key={song.key || song.keyId || song.songId} realKey={song.key || song.keyId || song.songId} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SongFav
