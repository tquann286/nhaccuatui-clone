import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import { useStore, actions } from 'store'

import './App.scss'
import { Homepage, NotFound, User } from 'pages'
import { auth } from 'config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { MainHomepage } from 'components'

import 'theme/_dark.scss'
const App = () => {
  const [state, dispatch] = useStore()

  useEffect(() => {
    // Theme
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      dispatch(actions.setTheme(localTheme))
    } else {
      localStorage.setItem('theme', 'light')
    }

    // Language
    const localLanguage = localStorage.getItem('lang')
    if (localLanguage) {
      dispatch(actions.setLang(localLanguage))
    } else {
      localStorage.setItem('lang', 'vi')
    }
    
		// Get last played song
    const lastPlayedSongId = localStorage.getItem('lastPlayedSongId')
    if (lastPlayedSongId) {
      dispatch(actions.setLastPlayedSongId(lastPlayedSongId))
    }
  }, [])

  useEffect(() => {
		if (state.theme) {
			document.body.setAttribute('data-theme', state.theme)
		}
	}, [state.theme])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(actions.onSignedIn())
      } else {
        dispatch(actions.onSignedOut())
      }
    })
	}, [auth.currentUser])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}>
          <Route index element={<MainHomepage />} />
          <Route path='user' element={<User />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
