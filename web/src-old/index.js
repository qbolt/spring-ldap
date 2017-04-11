import React from 'react';
import { render } from 'react-dom'
import { Router, Route,  browserHistory } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers/index'
import { initialState } from './reducers/users'

import App from './containers/App'
import User from './components/User'

const store = createStore(reducer, initialState)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/org">
          <Route path="/org/:orgId"/>
        </Route>
        <Route path="/users">
          <Route path="/users/:userId" component={User} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
