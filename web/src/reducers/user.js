import { SET_CURRENT_USER } from '../actions'

const user = (state = '', action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user
    default:
      return state
  }
}

export default user
