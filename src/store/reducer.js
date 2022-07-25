import { SET_THEME, CHANGE_LIGHT_THEME, CHANGE_DARK_THEME, SET_LANG, CHANGE_VI_LANG, CHANGE_EN_LANG, TOGGLE_SHOW_LOGIN, TOGGLE_SHOW_SIGN_UP, SIGNED_IN, SIGNED_OUT, SET_LAST_PLAYED_SONG, SET_FAV_SONGS } from 'share/constants'

export const initState = {
  showMoreOptions: false,
  theme: 'light',
  lang: 'vi',
  showLogin: false,
  showSignUp: false,
  isSignedIn: false,
  lastPlayedSongId: '',
  favSongs: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      }
    case CHANGE_LIGHT_THEME:
      return {
        ...state,
        theme: 'light',
      }
    case CHANGE_DARK_THEME:
      return {
        ...state,
        theme: 'dark',
      }
    case SET_LANG:
      return {
        ...state,
        lang: action.payload,
      }
    case CHANGE_VI_LANG:
      return {
        ...state,
        lang: 'vi',
      }
    case CHANGE_EN_LANG:
      return {
        ...state,
        lang: 'en',
      }
    case TOGGLE_SHOW_LOGIN:
      return {
        ...state,
        showLogin: !state.showLogin,
      }
    case TOGGLE_SHOW_SIGN_UP:
      return {
        ...state,
        showSignUp: !state.showSignUp,
      }
    case SIGNED_IN:
      return {
        ...state,
        isSignedIn: true,
      }
    case SIGNED_OUT:
      return {
        ...state,
        isSignedIn: false,
      }
    case SET_LAST_PLAYED_SONG:
      return {
        ...state,
        lastPlayedSongId: action.songId,
      }
    case SET_FAV_SONGS:
      return {
        ...state,
        favSongs: action.favSongs
      }
    default:
      throw new Error('Invalid action.')
  }
}

export default reducer
