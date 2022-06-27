import { SET_THEME, CHANGE_LIGHT_THEME, CHANGE_DARK_THEME} from 'share/constants'

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
