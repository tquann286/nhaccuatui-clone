import { auth, db } from 'config/firebase'
import { setDoc, updateDoc, arrayUnion, arrayRemove, doc, FieldValue } from 'firebase/firestore'
import { DEFAULT_IMAGE } from 'share/constants'

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

export const removeFavSong = (song) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)

  updateDoc(currentUserRef, {
    'favorite.songs': arrayRemove(song),
  })
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
