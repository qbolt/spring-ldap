import { SET_SEARCH_OPTION } from '../actions'

const setSearchOption = (state = '', action) => {
  switch (action.type) {
    case SET_SEARCH_OPTION:
      return {
        ...state,
        searchOption: action.searchOption
      }
    default:
      return state
  }
}

export default setSearchOption
