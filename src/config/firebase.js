import { initializeApp } from 'firebase/app'
import { env } from './environment'

import {
	getAuth,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

const app = initializeApp(env.FIREBASE_CONFIG)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

const db = getFirestore(app)

export { auth, googleProvider, facebookProvider, db }