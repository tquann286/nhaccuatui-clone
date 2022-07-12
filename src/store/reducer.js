import { SET_THEME, CHANGE_LIGHT_THEME, CHANGE_DARK_THEME, SET_LANG, CHANGE_VI_LANG, CHANGE_EN_LANG, TOGGLE_SHOW_LOGIN, TOGGLE_SHOW_SIGN_UP, SET_USER_INFO, CLEAR_USER_INFO } from 'share/constants'

export const initState = {
  showMoreOptions: false,
  theme: 'light',
  lang: 'vi',
  showLogin: false,
  showSignUp: false,
  user: {},
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
    case SET_USER_INFO:
      return {
        ...state,
        user: {
          ... state.user,
          [action.key]: action.value,
        }
      }
    case CLEAR_USER_INFO:
      return {
        ...state,
        user: {}
      }
    default:
      throw new Error('Invalid action.')
  }
}

export default reducer
