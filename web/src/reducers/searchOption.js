import { SET_SEARCH_OPTION } from '../actions'

const searchOption = (state = 'users', action) => {
  switch (action.type) {
    case SET_SEARCH_OPTION:
      return action.searchOption
    default:
      return state
  }
}

export default searchOption
