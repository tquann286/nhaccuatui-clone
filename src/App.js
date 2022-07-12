import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useStore, actions } from 'store'

import './App.scss'
import { Homepage, NotFound } from 'pages'
import { auth } from 'config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const App = () => {
  const [state, dispatch] = useStore()

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    const localLanguage = localStorage.getItem('lang')

    if (localTheme) {
      dispatch(actions.setTheme(localTheme))
    } else {
      localStorage.setItem('theme', 'light')
    }

    if (localLanguage) {
      dispatch(actions.setLang(localLanguage))
    } else {
      localStorage.setItem('lang', 'vi')
    }
  }, [])

  useEffect(() => {
		if (state.theme) {
			document.body.setAttribute('data-theme', state.theme)
		}
	}, [state.theme])

  useEffect(() => {
    console.log('vo')
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('sign in')
        dispatch(actions.onSignedIn())
      } else {
        console.log('sign out')
        dispatch(actions.onSignedOut())
      }
    })
	}, [auth.currentUser])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
