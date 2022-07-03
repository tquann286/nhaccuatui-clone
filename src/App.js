import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useStore, actions } from 'store'

import './App.scss'
import { Homepage, NotFound } from 'pages'

const App = () => {
  const [state, dispatch] = useStore()

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      dispatch(actions.setTheme(localTheme))
    } else {
      localStorage.setItem('theme', 'light')
    }
  }, [])

  useEffect(() => {
		if (state.theme) {
			document.body.setAttribute('data-theme', state.theme)
		}
	}, [state.theme])

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
