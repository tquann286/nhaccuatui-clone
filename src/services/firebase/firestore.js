import { auth, db } from 'config/firebase'
import { setDoc, updateDoc, arrayUnion, doc } from 'firebase/firestore'
import { DEFAULT_IMAGE } from 'share/constants'

export const addUser = (docRef, username, email, photoUrl, userId) => {
  setDoc(docRef, {
    username,
    email,
    photoUrl: photoUrl || DEFAULT_IMAGE,
    history: {},
    favorite: {},
    userId,
  })
}

export const addFavSong = (song) => {
  const docRef = doc(db, 'users', auth.currentUser.uid)
  updateDoc(docRef, {
    "favorite.songs": arrayUnion(song)
  })
}