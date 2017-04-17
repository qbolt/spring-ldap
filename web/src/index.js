// React imports
import React from 'react'
import { render } from 'react-dom'

// Redux store configuration
import configureStore from './configureStore'

// Root component
import Root from './components/Root'

/****************************************/

// Store configuration and root render method.
// Store is passed to root component, which passes it to the react-redux
// provider, which provides the store to all of the components in the application.
const store = configureStore()

// Showing that the localStorage is persisting the state.
console.log(store.getState())

render(
  <Root store={store} />,
  document.getElementById('root')
);
