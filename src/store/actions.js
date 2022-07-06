import { SET_THEME, CHANGE_LIGHT_THEME, CHANGE_DARK_THEME, CHANGE_VI_LANG, CHANGE_EN_LANG, SET_LANG, TOGGLE_SHOW_LOGIN } from 'share/constants'

export const setTheme = (payload) => ({
  type: SET_THEME,
  payload,
})

export const changeLightTheme = () => {
  localStorage.setItem('theme', 'light')

  return ({
    type: CHANGE_LIGHT_THEME,
  })
}

export const changeDarkTheme = () => {
  localStorage.setItem('theme', 'dark')

  return ({
    type: CHANGE_DARK_THEME,
  })
} 

export const setLang = (payload) => ({
  type: SET_LANG,
  payload,
})

export const changeViLang = () => {
  localStorage.setItem('lang', 'vi')

  return ({
    type: CHANGE_VI_LANG,
  })
}

export const changeEnLang = () => {
  localStorage.setItem('lang', 'en')

  return ({
    type: CHANGE_EN_LANG,
  })
}

export const toggleShowLogin = () => ({
  type: TOGGLE_SHOW_LOGIN,
})
