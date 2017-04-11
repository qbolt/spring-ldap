import { combineReducers } from 'redux'
import currentUser from './users'
import query from './query'
import setSearchOption from './searchOption'

const reducer = combineReducers({
  currentUser,
  setSearchOption,
  query
})

export default reducer
