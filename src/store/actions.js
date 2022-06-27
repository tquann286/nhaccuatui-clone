import {TOGGLE_SHOW_MORE, CHANGE_LIGHT_THEME, CHANGE_DARK_THEME} from 'share/constants'

export const toggleShowMore = (payload) => ({
	type: TOGGLE_SHOW_MORE,
	payload,
})

export const changeLightTheme = () => ({
	type: CHANGE_LIGHT_THEME,
})

export const changeDarkTheme = () => ({
	type: CHANGE_DARK_THEME,
})
