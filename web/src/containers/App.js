import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Autocomplete from 'react-autocomplete'

import { fetchQuery, setCurrentUser } from '../actions'

import '../app.css'

class AppComponent extends React.Component {

  constructor() {
    super()
    this.state = {
      inputVale: '',
      loading: false,
      suggestions: [],
      updatedAt: ''
    }

    this.loadSuggestions = this.loadSuggestions.bind(this)
    this.selectSuggestion = this.selectSuggestion.bind(this)
  }

  loadSuggestions(event, inputValue) {
    this.setState({ loading: true, inputValue })
    if (inputValue.length > 4) {      // TODO - Create shallow copy on java side for id/name so more names can be suggested
      this.props.fetchQuery(inputValue)
        .then(result => {
          if (this.state.updatedAt < result.receivedAt)
            this.setState({ loading: false, suggestions: result.results, updatedAt: result.receivedAt  })
        })
    } else {
      this.setState({loading: false, suggestions: [] })
    }
  }

  selectSuggestion(inputValue, user) {
    this.setState({ inputValue, items: [ user ]})
    this.props.setCurrentUser(user)
  }

  render() {
    return (
      <div className="root">
        <Autocomplete
          inputProps={{name: "query", id: "<q></q>uery-autocomplete"}}
          ref="autocomplete"
          value={this.state.inputValue}
          items={this.state.suggestions}
          getItemValue={item => item.empId}
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
