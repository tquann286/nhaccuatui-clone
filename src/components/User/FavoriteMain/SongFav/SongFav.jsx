import React, { useState, useEffect } from 'react'
import './SongFav.scss'

import initImage from 'images/default/default_personal_playlist.png'
import { ShadowThumb } from 'components'
import { getFavSong } from 'services/User/Favorite'

const SongFav = ({ defineLang }) => {
  const [favSongs, setFavSongs] = useState(null)
  console.log('favSongs: ', favSongs)

  useEffect(() => {
    const getFavSongsState = async () => {
      const favSongs = await getFavSong(defineLang)

      setFavSongs(favSongs)
    }

    getFavSongsState()
  }, [])


  return (
    <div className='song-fav-container'>
      <div className="sf-header w3-row">
        <div className="sf-thumb-img w3-col">
          <ShadowThumb width='16rem' shadowHeight='0.6rem' imageUrl={initImage}  />
        </div>
        <div className="sf-info w3-rest">
          <div className="common-sub-title color-0-5">
            Playlist:
            <span className='color-0-88'>{defineLang('Bài hát yêu thích', 'Favorite songs')}</span>
          </div>
          <div className="sf-total-number w3-row">
            <div className="width-fit-content color-0-5">
              {defineLang(`4 bài hát`, `4 songs`)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongFav
