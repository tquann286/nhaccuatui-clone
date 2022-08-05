import React, { useEffect } from 'react'

import { getFavVideos } from 'services/User/Favorite'
import { handleClearAllFav, removeFavItem } from 'services/firebase/firestore'
import { useStore, actions } from 'store'
import { Grid } from '@mui/material'
import { CommonVideo, NotFoundV2 } from 'components'

const VideoFav = ({ defineLang, currentUser }) => {
  const [state, dispatch] = useStore()
  const { favVideos = [] } = state

  const handlehandleClearAllFav = async () => {
    await handleClearAllFav('videos', defineLang)
    dispatch(actions.setFavVideos([]))
  }

  const handleRemoveFav = async (keyId) => {
    const videoToRemove = favVideos.filter((video) => video.keyId === keyId)[0]

    await removeFavItem(videoToRemove, 'video', defineLang)
    dispatch(actions.setFavVideos(favVideos.filter((video) => video.keyId !== keyId)))
  }

  useEffect(() => {
    try {
      const getFavVideosState = async () => {
        const favVideos = await getFavVideos(defineLang)

        dispatch(actions.setFavVideos(favVideos))
      }

      getFavVideosState()
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  if (!currentUser) return null

  return (
    <div className='relative'>
      <div className='flex justify-between items-center mb-6 color-0-88'>
        <div className='text-xl font-semibold'>Video</div>
        {favVideos?.length !== 0 && <div className='text-xs color-0-6 font-medium transition-colors hover:!text-main cursor-pointer' onClick={handlehandleClearAllFav}>{defineLang('Xóa tất cả', 'Clear all')}</div>}
      </div>
      <div className='pt2'>
        <Grid container spacing={2}>
          {favVideos.slice().reverse()?.map((video) => (
            <Grid item key={video.key || video.keyId} xs={4} sm={4} md={4} xl={3}>
              <CommonVideo {...video} keyId={video.key || video.keyId} addToFav={false} removeFav handleRemoveFav={() => handleRemoveFav(video.key || video.keyId)} />
            </Grid>
          ))}
        </Grid>
      </div>
      {favVideos?.length === 0 && (
        <div className="h100">
          <NotFoundV2 message={defineLang('Chưa có video yêu thích nào', 'There are no favorite video added')} />
        </div>
      )}
    </div>
  )
}

export default VideoFav
