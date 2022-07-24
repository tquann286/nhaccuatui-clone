import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from 'config/firebase'
import { toastNotify } from 'share/toast'

export const favCateNav = [
  { title: { vi: 'Bài hát', en: 'Song' }, value: 'song' },
  { title: { vi: 'Danh sách phát', en: 'Playlist' }, value: 'playlist' },
  { title: { vi: 'Video', en: 'Video' }, value: 'video' },
]

export const getFavSong = async (defineLang) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)
  const userSnap = await getDoc(currentUserRef)

  if (userSnap.exists()) {
    return userSnap.data().favorite.songs
  } else {
    toastNotify(defineLang('Không tìm thấy danh sách yêu thích', 'There is no favorite list song found'), 'error')
  }
}