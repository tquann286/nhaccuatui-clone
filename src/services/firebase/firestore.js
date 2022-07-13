import { setDoc } from 'firebase/firestore'
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