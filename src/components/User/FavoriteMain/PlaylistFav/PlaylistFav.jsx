import React, { useEffect } from 'react'

import { getFavPlaylists } from 'services/User/Favorite'
import { handleClearAllFav } from 'services/firebase/firestore'
import { useStore, actions } from 'store'
import { Grid } from '@mui/material'
import { CommonPlaylist } from 'components'

const PlaylistFav = ({ defineLang, currentUser }) => {
  const [state, dispatch] = useStore()
  const { favPlaylists } = state
  console.log('favPlaylists: ', favPlaylists)

  const handlehandleClearAllFav = async () => {
    await handleClearAllFav('playlists', defineLang)
    dispatch(actions.setFavPlaylists([]))
  }

  const handleRemoveFav = async (keyId) => {
    console.log(keyId)
  }

  useEffect(() => {
    try {
      const getFavPlaylistsState = async () => {
        const favPlaylists = await getFavPlaylists(defineLang)

        dispatch(actions.setFavPlaylists(favPlaylists))
      }

      getFavPlaylistsState()
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  if (!currentUser) return null

  return (
    <div className='playlist-fav-container'>
      <div className='playlist-fav-title alcenter-jcbetween'>
        <div className='playlist-fav-title-content common-title color-0-88'>{defineLang('Danh sách phát', 'Playlist')}</div>
        {favPlaylists.length !== 0 && (
          <div className='clear-all clickable small-common color-0-6' onClick={handlehandleClearAllFav}>
            {defineLang('Xóa tất cả', 'Clear all')}
          </div>
        )}
      </div>
      <div className='playlist-fav-main pt-2'>
        <Grid container spacing={2}>
          {favPlaylists.map((playlist) => (
            <Grid item key={playlist.key || playlist.keyId} xs={3} sm={3} md={3} xl={2}>
              <CommonPlaylist {...playlist} keyId={playlist.key || playlist.keyId} addToFav={false} removeFav handleRemoveFav={() => handleRemoveFav(playlist.key || playlist.keyId)} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default PlaylistFav
