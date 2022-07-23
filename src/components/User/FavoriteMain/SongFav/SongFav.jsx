import React, { useState, useEffect } from 'react'
import './SongFav.scss'

import initImage from 'images/default/default_personal_playlist.png'
import initUser from 'images/default/default_user.jpg'
import { ShadowThumb, SquareImg } from 'components'
import { getFavSong } from 'services/User/Favorite'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { Button, IconButton, Tooltip } from '@mui/material'

const SongFav = ({ defineLang, currentUser }) => {
  const [favSongs, setFavSongs] = useState(null)

  useEffect(() => {
    const getFavSongsState = async () => {
      const favSongs = await getFavSong(defineLang)

      setFavSongs(favSongs)
    }

    getFavSongsState()
  }, [])

  if (!favSongs) return null

  if (!currentUser) return null

  const { displayName, photoURL } = currentUser

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
            <div className='width-fit-content color-0-5'>{defineLang(`${favSongs.length} bài hát`, `${favSongs.length} songs`)}</div>
          </div>
          <div className='bottom-position'>
            <div className='sf-author w3-row bg-color-0-02'>
              <div className='sf-extend w3-col w3-right'>
                <Tooltip className='sf-tooltip color-0-5' title={defineLang('Chia sẻ', 'Share')} placement='top' arrow enterDelay={400}>
                  <IconButton aria-label='share' size='large'>
                    <AiOutlineShareAlt />
                  </IconButton>
                </Tooltip>
              </div>
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
    </div>
  )
}

export default SongFav
