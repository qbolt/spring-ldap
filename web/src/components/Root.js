// React imports
import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'

// Links react store to redux components
import { Provider } from 'react-redux'

// Component imports
import App from './App'
import UserSearch from '../containers/UserSearch'
import OrgSearch from '../containers/OrgSearch'
import User from '../components/User'

// Root render component. Renders all of our components within the specified routes.
// Provider provides the store to all of the components within the application.
// (The store is what gives us access to the state via dispatching actions and store.getState())
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="users"/>
        <Route path="/org" component={OrgSearch}>
          {/* <Route path="/org/:orgId" component={Organization} /> */}
        </Route>
        <Route path="/users" component={UserSearch}>
          {<Route path="/users/:userId" component={User} />}
        </Route>
      </Route>
    </Router>
  </Provider>
)

export default Root
