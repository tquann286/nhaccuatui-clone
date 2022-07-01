import { SET_THEME, CHANGE_LIGHT_THEME, CHANGE_DARK_THEME, CHANGE_VI_LANG, CHANGE_EN_LANG, SET_LANG } from 'share/constants'

export const setTheme = (payload) => ({
  type: SET_THEME,
  payload,
})

export const changeLightTheme = () => ({
  type: CHANGE_LIGHT_THEME,
})

export const changeDarkTheme = () => ({
  type: CHANGE_DARK_THEME,
})

export const setLang = (payload) => ({
  type: SET_LANG,
  payload,
})

export const changeViLang = () => ({
  type: CHANGE_VI_LANG,
})

export const changeEnLang = () => ({
  type: CHANGE_EN_LANG,
})
