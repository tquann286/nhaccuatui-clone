import { SET_THEME, CHANGE_LIGHT_THEME, CHANGE_DARK_THEME, CHANGE_VI_LANG, CHANGE_EN_LANG, SET_LANG, TOGGLE_SHOW_LOGIN, TOGGLE_SHOW_SIGN_UP, SET_USER_INFO, CLEAR_USER_INFO } from 'share/constants'

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

export const setUserInfo = (key, value) => ({
  type: SET_USER_INFO,
  key,
  value,
})

export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO,
})
