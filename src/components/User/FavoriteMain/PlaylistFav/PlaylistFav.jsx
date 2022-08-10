import React, { useState, useEffect } from 'react'

import { getFavPlaylists } from 'services/User/Favorite'
import { getUserDetail, handleClearAllFav, removeFavItem } from 'services/firebase/firestore'
import { Grid } from '@mui/material'
import { CommonPlaylist, NotFoundV2 } from 'components'

const PlaylistFav = ({ defineLang, currentUser }) => {
  const [favPlaylists, setFavPlaylists] = useState([])
  console.log('favPlaylists: ', favPlaylists)

  const handlehandleClearAllFav = async () => {
    await handleClearAllFav('playlists', defineLang)
    setFavPlaylists([])
  }

  const handleRemoveFav = async (keyId) => {
    const { favorite } = await getUserDetail()

    const playlistToRemove = favorite.playlists.filter((playlistId) => playlistId === keyId)[0]

    await removeFavItem(playlistToRemove, 'playlist', defineLang)
    setFavPlaylists(favPlaylists.filter((playlist) => playlist.key !== keyId))
  }

  useEffect(() => {
    try {
      const getFavPlaylistsData = async () => {
        const { favorite } = await getUserDetail()
        if (favorite.playlists) {
          const data = await getFavPlaylists(favorite.playlists)

          setFavPlaylists(data)
        }
      }

      getFavPlaylistsData()
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  if (!currentUser) return null

  return (
    <div className='playlist-fav-container'>
      <div className='playlist-fav-title alcenter-jcbetween'>
        <div className='playlist-fav-title-content common-title color-0-88'>{defineLang('Danh sách phát', 'Playlist')}</div>
        {favPlaylists?.length !== 0 && (
          <div className='clear-all clickable small-common color-0-6' onClick={handlehandleClearAllFav}>
            {defineLang('Xóa tất cả', 'Clear all')}
          </div>
        )}
      </div>
      <div className='playlist-fav-main pt2'>
        <Grid container spacing={2}>
          {favPlaylists
            .slice()
            .reverse()
            ?.map((playlist) => (
              <Grid item key={playlist.key || playlist.keyId} xs={3} sm={3} md={3} xl={2}>
                <CommonPlaylist {...playlist} keyId={playlist.key || playlist.keyId} addToFav={false} removeFav handleRemoveFav={() => handleRemoveFav(playlist.key || playlist.keyId)} />
              </Grid>
            ))}
        </Grid>
      </div>
      {favPlaylists?.length === 0 && (
        <div className='no-fav-playlist h100'>
          <NotFoundV2 message={defineLang('Chưa có danh sách yêu thích nào', 'There are no favorite playlist added')} />
        </div>
      )}
    </div>
  )
}

export default PlaylistFav
