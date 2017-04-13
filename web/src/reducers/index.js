import { combineReducers } from 'redux'
import org from './org'
import user from './user'
import fetch from './fetch'
import searchOption from './searchOption'

const reducer = combineReducers({
  user,
  org,
  searchOption,
  fetch
})

export default reducer
