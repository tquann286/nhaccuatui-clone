import { auth } from 'config/firebase'
import { addFavSong, addFavPlaylist, addFavVideo } from 'services/firebase/firestore'
import { toastNotify } from 'share/toast'

export const handleAddToFavSong = async (song, defineLang) => {
  if (auth.currentUser) {
    if (song) {
      await addFavSong(song)
      toastNotify(defineLang('Thêm bài hát vào danh sách yêu thích thành công.', 'Successfully added song to favorite list.'), 'success')
    } else {
      toastNotify(defineLang('Có lỗi khi thêm bài hát vào danh sách yêu thích.', 'Add song to favorite list failed due to an error.'), 'error')
    }
  } else {
    toastNotify(defineLang('Vui lòng đăng nhập để thực hiện chức năng này.', 'Login is required to use this feature.'), 'error')
  }
}

export const handleAddToFavPlaylist = async (playlist, defineLang) => {
  if (auth.currentUser) {
    if (playlist) {
      await addFavPlaylist(playlist)
      toastNotify(defineLang('Thêm danh sách phát vào danh sách yêu thích thành công.', 'Successfully added playlist to favorite list.'), 'success')
    } else {
      toastNotify(defineLang('Có lỗi khi thêm danh sách phát vào danh sách yêu thích.', 'Add playlist to favorite list failed due to an error.'), 'error')
    }
  } else {
    toastNotify(defineLang('Vui lòng đăng nhập để thực hiện chức năng này.', 'Login is required to use this feature.'), 'error')
  }
}

export const handleAddToFavVideo = async (video, defineLang) => {
  if (auth.currentUser) {
    if (video) {
      await addFavVideo(video)
      toastNotify(defineLang('Thêm video vào danh sách yêu thích thành công.', 'Successfully added video to favorite list.'), 'success')
    } else {
      toastNotify(defineLang('Có lỗi khi thêm video vào danh sách yêu thích.', 'Add video to favorite list failed due to an error.'), 'error')
    }
  } else {
    toastNotify(defineLang('Vui lòng đăng nhập để thực hiện chức năng này.', 'Login is required to use this feature.'), 'error')
  }
}