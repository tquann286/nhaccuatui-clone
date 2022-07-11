import { db } from 'config/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { DEFAULT_IMAGE } from 'share/constants'

export const addUser = (username, email, userId) => {
  addDoc(collection(db, 'users'), {
    username,
    email,
    photoUrl: DEFAULT_IMAGE,
    songHistory: '',
    userId,
  })
}