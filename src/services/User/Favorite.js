import { getSongDetail, getPlaylistDetail, getVideoDetail } from 'api'

export const favCateNav = [
  { title: { vi: 'Bài hát', en: 'Song' }, value: 'song' },
  { title: { vi: 'Danh sách phát', en: 'Playlist' }, value: 'playlist' },
  { title: { vi: 'Video', en: 'Video' }, value: 'video' },
]

export const getFavSongs = async (songKeys) => {
  if (songKeys) {
    const data = songKeys.map(async (key) => {
      const songDetail = await getSongDetail(key)

      return songDetail.song
    })

    const result = await Promise.all(data) 

    return result
  }
}

export const getFavPlaylists = async (playlistKeys) => {
  if (playlistKeys) {
    const data = playlistKeys.map(async (key) => {
      const playlistDetail = await getPlaylistDetail(key)

      return playlistDetail.playlist
    })

    const result = await Promise.all(data) 

    return result
  }
}

export const getFavVideos = async (videoKeys) => {
  if (videoKeys) {
    const data = videoKeys.map(async (key) => {
      const videoDetail = await getVideoDetail(key)

      return videoDetail.video
    })

    const result = await Promise.all(data) 

    return result
  }
}