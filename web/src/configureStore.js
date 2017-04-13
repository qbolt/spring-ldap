// Redux package imports
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

// My redux reducers and a utility module for saving to localStorage
import { loadState, saveState } from './util/localStorage'
import rootReducer from './reducers'

/**********************************************************************/

const configureStore = () => {
  // Logs state changes
  const loggerMiddleware = createLogger()

  // Pulls state from localStorage
  const persistedState = loadState()

  // Creates store using the rootReducer, logging and util middleware, and default state as persisted state
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )

  // Subscribe the saveState function to any state updates and save it to localStorage
  // Allows the state to be persisted through refreshes/reloads
  store.subscribe(() => {
    saveState(store.getState())
  })

  return store
}

export default configureStore
