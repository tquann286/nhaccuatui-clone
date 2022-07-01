import { SET_THEME, CHANGE_LIGHT_THEME, CHANGE_DARK_THEME, SET_LANG, CHANGE_VI_LANG, CHANGE_EN_LANG } from 'share/constants'

export const initState = {
  showMoreOptions: false,
  theme: 'light',
  lang: 'vi',
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
    default:
      throw new Error('Invalid action.')
  }
}

export default reducer
