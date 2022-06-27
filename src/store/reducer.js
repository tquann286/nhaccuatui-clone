import {TOGGLE_SHOW_MORE, SET_THEME, CHANGE_LIGHT_THEME, CHANGE_DARK_THEME} from 'share/constants'

export const initState = {
	showMoreOptions: false,
	theme: 'light',
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
		default:
			throw new Error('Invalid action.')
	}
}

export default reducer
