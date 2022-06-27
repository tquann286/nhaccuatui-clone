import {TOGGLE_SHOW_MORE, CHANGE_LIGHT_THEME, CHANGE_DARK_THEME} from 'share/constants'

export const initState = {
	showMoreOptions: false,
	theme: 'light',
}

const reducer = (state, action) => {
	switch (action.type) {
		case TOGGLE_SHOW_MORE:
			return {
				...state,
				showMoreOptions: !state.showMoreOptions,
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
