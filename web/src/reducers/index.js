import { combineReducers } from 'redux'
import currentUser from './users'
import fetch from './query'
import searchOption from './searchOption'

const reducer = combineReducers({
  currentUser,
  searchOption,
  fetch
})

export default reducer
