import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import Autocomplete from 'react-autocomplete'

import { fetchQuery, setCurrentUser } from '../actions'

import '../app.css'

class AppComponent extends React.Component {

  constructor() {
    super()

    // Local component state
    this.state = {
      inputValue: '',
      loading: false,
      suggestions: [],
      updatedAt: ''
    }

    // bindings so I can pass the function around directly
    this.loadSuggestions = this.loadSuggestions.bind(this)
    this.selectSuggestion = this.selectSuggestion.bind(this)
  }

  // loads the suggestions based on the current inputText
  loadSuggestions(event, inputValue) {
    // Save request time to avoid overwriting state with an old query that returned late.
    const requestedAt = Date.now()

    this.setState({ loading: true, inputValue })
    if (inputValue.length > 4) {      // TODO - Create shallow copy on java side for id/name so more names can be suggested
      this.props.fetchQuery(inputValue)
        .then(result => {
          console.log(result)
          if (this.state.updatedAt < requestedAt)
            this.setState({ loading: false, suggestions: result.results, updatedAt: result.receivedAt  })
        })
    } else {
      this.setState({loading: false, suggestions: [] })
    }
  }

  // Sets local state inputValue, dispatches action to set the currentUser, and changes route.
  selectSuggestion(inputValue, user) {
    this.setState({ inputValue, items: [ user ]})
    this.props.setCurrentUser(user)
    hashHistory.push('/users/' + user.empId)
  }

  render() {
    return (
      <div className="userSearch">
        <Autocomplete
          value={this.state.inputValue}
          items={this.state.suggestions}
          getItemValue={item => item.firstName + ' ' + item.lastName}
          onSelect={this.selectSuggestion}
          onChange={this.loadSuggestions}
          renderItem={(item, isHighlighted) => (
            <div className={isHighlighted ? 'highlightedItem' : 'item'}>
              {`${item.firstName} ${item.lastName}`}
            </div>
          )}
        />
        {this.props.children}
      </div>
    )
  }
}

// Function called by redux to map the redux state to the component's props
const mapStateToProps = (state) => {
  return {
    query: state.query
  }
}

// Function called by redux to map the dispatch function to different functions
const mapPropsToDispatch = (dispatch) => {
  return bindActionCreators({fetchQuery, setCurrentUser}, dispatch)
}

// Connects component to the redux store via the two supplied functions and component
const App = connect(mapStateToProps, mapPropsToDispatch)(AppComponent)
export default App
