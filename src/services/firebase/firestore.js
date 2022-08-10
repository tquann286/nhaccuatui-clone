import { auth, db } from 'config/firebase'
import { setDoc, updateDoc, arrayUnion, arrayRemove, doc, deleteField } from 'firebase/firestore'
import { DEFAULT_IMAGE } from 'share/constants'
import { toastNotify } from 'share/toast'

export const addUser = (docRef, username, email, photoUrl, userId) =>
  setDoc(docRef, {
    username,
    email,
    photoUrl: photoUrl || DEFAULT_IMAGE,
    history: {},
    favorite: {},
    userId,
  })

export const addFavSong = (song) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)

  updateDoc(currentUserRef, {
    'favorite.songs': arrayUnion(song),
  })
}

export const removeFavItem = (key, cate, defineLang) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)

  switch (cate) {
    case 'song':
      updateDoc(currentUserRef, {
        'favorite.songs': arrayRemove(key),
      })
      toastNotify(defineLang('Xóa bài hát khỏi yêu thích thành công', 'Removed song from favorite list successfully'), 'success')
      break
    case 'playlist':
      updateDoc(currentUserRef, {
        'favorite.playlists': arrayRemove(key),
      })
      toastNotify(defineLang('Xóa danh sách phát khỏi yêu thích thành công', 'Removed playlist from favorite successfully'), 'success')
      break
    case 'video':
      updateDoc(currentUserRef, {
        'favorite.videos': arrayRemove(key),
      })
      toastNotify(defineLang('Xóa video khỏi yêu thích thành công', 'Removed video from favorite successfully'), 'success')
      break
    default:
      break
  }
}

export const handleClearAllFav = (cate, defineLang) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)

  switch (cate) {
    case 'songs':
      updateDoc(currentUserRef, {
        'favorite.songs': deleteField(),
      })
      toastNotify(defineLang('Xóa tất cả bài hát khỏi yêu thích thành công', 'Removed all songs from favorite list successfully'), 'success')
      break
    case 'playlists':
      updateDoc(currentUserRef, {
        'favorite.playlists': deleteField(),
      })
      toastNotify(defineLang('Xóa tất cả danh sách phát khỏi yêu thích thành công', 'Removed all playlists from favorite list successfully'), 'success')
      break
    case 'videos':
      updateDoc(currentUserRef, {
        'favorite.videos': deleteField(),
      })
      toastNotify(defineLang('Xóa tất cả video khỏi yêu thích thành công', 'Removed all videos from favorite list successfully'), 'success')
      break
    default:
      break
  }
}

export const addFavPlaylist = (playlist) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)

  updateDoc(currentUserRef, {
    'favorite.playlists': arrayUnion(playlist),
  })
}

export const addFavVideo = (video) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)

  updateDoc(currentUserRef, {
    'favorite.videos': arrayUnion(video),
  })
}
