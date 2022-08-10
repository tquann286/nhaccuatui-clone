import { SET_THEME, CHANGE_LIGHT_THEME, CHANGE_DARK_THEME, CHANGE_VI_LANG, CHANGE_EN_LANG, SET_LANG, TOGGLE_SHOW_LOGIN, TOGGLE_SHOW_SIGN_UP, SIGNED_IN, SIGNED_OUT, SET_LAST_PLAYED_SONG, SET_FAV_PLAYLISTS, SET_FAV_VIDEOS } from 'share/constants'

// Theme
export const setTheme = (payload) => ({
  type: SET_THEME,
  payload,
})

export const changeLightTheme = () => {
  localStorage.setItem('theme', 'light')

  return {
    type: CHANGE_LIGHT_THEME,
  }
}

export const changeDarkTheme = () => {
  localStorage.setItem('theme', 'dark')

  return {
    type: CHANGE_DARK_THEME,
  }
}

// Language
export const setLang = (payload) => ({
  type: SET_LANG,
  payload,
})

export const changeViLang = () => {
  localStorage.setItem('lang', 'vi')

  return {
    type: CHANGE_VI_LANG,
  }
}

export const changeEnLang = () => {
  localStorage.setItem('lang', 'en')

  return {
    type: CHANGE_EN_LANG,
  }
}

// Authenciation
export const toggleShowLogin = () => ({
  type: TOGGLE_SHOW_LOGIN,
})

export const toggleShowSignUp = () => ({
  type: TOGGLE_SHOW_SIGN_UP,
})

export const onSignedIn = () => ({
  type: SIGNED_IN,
})

export const onSignedOut = () => ({
  type: SIGNED_OUT,
})

// Play
export const setLastPlayedSongId = (songId) => {
  localStorage.setItem('lastPlayedSongId', songId)

  return {
    type: SET_LAST_PLAYED_SONG,
    songId,
  }
}

// Favorite
export const setFavPlaylists = (favPlaylists) => ({
  type: SET_FAV_PLAYLISTS,
  favPlaylists,
})

export const setFavVideos = (favVideos) => ({
  type: SET_FAV_VIDEOS,
  favVideos,
})
