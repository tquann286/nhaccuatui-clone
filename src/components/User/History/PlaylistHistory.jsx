import React, { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import { getUserPlaylists } from 'services/User/User'
import { getUserDetail, handleClearAllHistory, removeHistoryItem } from 'services/firebase/firestore'
import { CommonPlaylist, NotFoundV2 } from 'components'
import { isValid } from 'share/utilities'

const PlaylistHistory = ({ defineLang, currentUser }) => {
  const [historyPlaylists, setHistoryPlaylists] = useState([])

  const handlehandleClearAllHistory = async () => {
    await handleClearAllHistory('playlists', defineLang)
    setHistoryPlaylists([])
  }

  const handleRemoveHistory = async (keyId) => {
    const { history } = await getUserDetail()

    const playlistToRemove = history.playlists.filter((playlistId) => playlistId === keyId)[0]

    await removeHistoryItem(playlistToRemove, 'playlist', defineLang)
    setHistoryPlaylists(historyPlaylists.filter((playlist) => playlist.key !== keyId))
  }

  useEffect(() => {
    try {
      const getHistoryPlaylistsData = async () => {
        const { history } = await getUserDetail()
        if (history.playlists) {
          const data = await getUserPlaylists(history.playlists)

          setHistoryPlaylists(data)
        }
      }

      getHistoryPlaylistsData()
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  if (!currentUser) return null

  return (
    <div>PlaylistHistory</div>
  )
}

export default PlaylistHistory