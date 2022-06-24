import { TOGGLE_SHOW_MORE } from 'share/constants'

export const initState = {
  showMoreOptions: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SHOW_MORE:
      return {
        ...state,
        showMoreOptions: !state.showMoreOptions
      }
    default:
      throw new Error('Invalid action.')
  }
}

export default reducer