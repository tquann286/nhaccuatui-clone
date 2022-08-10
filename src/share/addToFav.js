import { auth, db } from 'config/firebase'
import { addFavSong, addFavPlaylist, addFavVideo, getUserDetail } from 'services/firebase/firestore'
import { toastNotify } from 'share/toast'
import { isEmpty } from 'lodash'

export const handleAddToFavSong = async (songId, defineLang) => {
  if (auth.currentUser) {
    if (songId) {
      const { favorite } = await getUserDetail()
      if (favorite.songs) {
        const isDuplicate = favorite.songs.includes(songId)
        
        if (isDuplicate) {
          toastNotify(defineLang('Bài hát đã có trong yêu thích.', 'Song already exists in favorite playlist.'))
          return null
        }
      }

      await addFavSong(songId)
      toastNotify(defineLang('Thêm bài hát vào danh sách yêu thích thành công.', 'Successfully added song to favorite list.'), 'success')
    } else {
      toastNotify(defineLang('Có lỗi khi thêm bài hát vào danh sách yêu thích.', 'Add song to favorite list failed due to an error.'), 'error')
    }
  } else {
    toastNotify(defineLang('Vui lòng đăng nhập để thực hiện chức năng này.', 'Login is required to use this feature.'), 'error')
  }
}

export const handleAddToFavPlaylist = async (playlistId, defineLang) => {
  if (auth.currentUser) {
    if (playlistId) {
      const { favorite } = await getUserDetail()
      if (favorite.playlists) {
        const isDuplicate = favorite.playlists.includes(playlistId)
        
        if (isDuplicate) {
          toastNotify(defineLang('Danh sách phát đã có trong yêu thích.', 'Playlist already exists in favorite playlist.'))
          return null
        }
      }

      await addFavPlaylist(playlistId)
      toastNotify(defineLang('Thêm danh sách phát vào danh sách yêu thích thành công.', 'Successfully added playlist to favorite list.'), 'success')
    } else {
      toastNotify(defineLang('Có lỗi khi thêm danh sách phát vào danh sách yêu thích.', 'Add playlist to favorite list failed due to an error.'), 'error')
    }
  } else {
    toastNotify(defineLang('Vui lòng đăng nhập để thực hiện chức năng này.', 'Login is required to use this feature.'), 'error')
  }
}

export const handleAddToFavVideo = async (video, favVideos = [], defineLang) => {
  if (auth.currentUser) {
    if (video) {
      const isDuplicate = favVideos.filter(vd => (vd.key || vd.keyId) === (video.key || video.keyId))
      
      if (!isEmpty(isDuplicate)) {
        toastNotify(defineLang('Video đã có trong yêu thích.', 'Video already exists in favorite lists.'))
        return null
      }

      await addFavVideo(video)
      toastNotify(defineLang('Thêm video vào danh sách yêu thích thành công.', 'Successfully added video to favorite list.'), 'success')
    } else {
      toastNotify(defineLang('Có lỗi khi thêm video vào danh sách yêu thích.', 'Add video to favorite list failed due to an error.'), 'error')
    }
  } else {
    toastNotify(defineLang('Vui lòng đăng nhập để thực hiện chức năng này.', 'Login is required to use this feature.'), 'error')
  }
}