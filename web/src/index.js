import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'
import { setCurrentUser, fetchQuery } from './actions'

import App from './containers/App'

const loggerMiddleware = createLogger()
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="users"/>
        <Route path="/org">
          {/* <Route path="/org/:orgId" component={Organization} /> */}
        </Route>
        <Route path="/users">
          {/* <Route path="/users/:userId" component={User} /> */}
        </Route>

      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
