import { SET_CURRENT_USER } from '../actions/index'

const initialState = {
  currentUser: {}
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.user
      })
    default:
      return state
  }
}

export default users
