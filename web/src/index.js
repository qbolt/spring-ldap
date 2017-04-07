import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import people from './reducers/people'

import App from './components/App'
import Search from './containers/Search'
import Person from './components/Person'

fetch('http://localhost:8080/api/personList')
  .then(response => response.json())
  .then(result => startApp(result))

const startApp = (result) => {
  const initialState = {
    people: result
  }

  const store = createStore(people, initialState)
  render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Search}>
          <Route path="/:personId" component={Person} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}
