import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from 'config/firebase'
import { toastNotify } from 'share/toast'
import { getSongDetail } from 'api'

export const favCateNav = [
  { title: { vi: 'Bài hát', en: 'Song' }, value: 'song' },
  { title: { vi: 'Danh sách phát', en: 'Playlist' }, value: 'playlist' },
  { title: { vi: 'Video', en: 'Video' }, value: 'video' },
]

export const getFavSongsKey = async (defineLang) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)
  const userSnap = await getDoc(currentUserRef)

  if (userSnap.exists()) {
    return userSnap.data().favorite.songs || []
  } else {
    toastNotify(defineLang('Không tìm thấy danh sách yêu thích', 'There is no favorite list song found'), 'info')
  }
}

export const getFavPlaylists = async (defineLang) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)
  const userSnap = await getDoc(currentUserRef)

  if (userSnap.exists()) {
    return userSnap.data().favorite.playlists
  } else {
    toastNotify(defineLang('Không tìm thấy danh sách yêu thích', 'There is no favorite playlist found'), 'info')
  }
}

export const getFavVideos = async (defineLang) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)
  const userSnap = await getDoc(currentUserRef)

  if (userSnap.exists()) {
    return userSnap.data().favorite.videos
  } else {
    toastNotify(defineLang('Không tìm thấy video thích', 'There is no favorite video found'), 'info')
  }
}

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