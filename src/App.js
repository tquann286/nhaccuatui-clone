import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useStore, actions } from 'store'

import './App.scss'
import { Explore, Homepage, NotFound, Search, User, Favorite, SongPage, Playlist, Video } from 'pages'
import { auth } from 'config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { MainHomepage, SongPlaylistVideo } from 'components'
import { getFavSong } from 'services/User/Favorite'


const App = () => {
  const [state, dispatch] = useStore()
  const defineLang = (vie, eng) => state.lang === 'vi' ? vie : eng

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
    
    // Get Favorite songs
    if (auth.currentUser) {
      const getFavSongsState = async () => {
        const favSongs = await getFavSong(defineLang)
        dispatch(actions.setFavSongs(favSongs))
      }
  
      getFavSongsState()
    }
	}, [auth.currentUser])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}>
          <Route index element={<MainHomepage />} />
          <Route path='user' element={<User />}>
            <Route path='yeu-thich' element={<Favorite />} />
          </Route>
          <Route path='kham-pha' element={<Explore />} />
          <Route path='tim-kiem' element={<Search />} />
          <Route path='bai-hat' element={<SongPage />}>
            <Route index element={<SongPlaylistVideo type='song' />} />
          </Route>
          <Route path='playlist' element={<Playlist />}>
            <Route index element={<SongPlaylistVideo type='playlist' />} />
          </Route>
          <Route path='video' element={<Video />}>
            <Route index element={<SongPlaylistVideo type='video' />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
