import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'

import { useStore, actions } from 'store'
import { Explore, Homepage, NotFound, Search, User, Favorite, SongPage, Playlist, Video, Artist, Topic } from 'pages'
import { auth } from 'config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { MainHomepage, SongPlaylistVideo, ArtistMain, TopicMain, Collection } from 'components'
import { getFavSongs, getFavPlaylists, getFavVideos } from 'services/User/Favorite'

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
    
    // Get Favorite lists
    if (auth.currentUser) {
      const getFavState = async () => {
        const favSongs = await getFavSongs(defineLang)
        dispatch(actions.setFavSongs(favSongs))

        const favPlaylists = await getFavPlaylists(defineLang)
        dispatch(actions.setFavPlaylists(favPlaylists))

        const favVideos = await getFavVideos(defineLang)
        dispatch(actions.setFavVideos(favVideos))
      }
  
      getFavState()
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
            <Route path='tags' element={<Collection />} />
          </Route>
          <Route path='video' element={<Video />}>
            <Route index element={<SongPlaylistVideo type='mv' />} />
          </Route>
          <Route path='nghe-si' element={<Artist />}>
            <Route index element={<ArtistMain />} />
          </Route>
          <Route path='chu-de' element={<Topic />}>
            <Route index element={<TopicMain />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
