import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'

import { setCurrentUser } from '../actions/index'
import RadioButton from './RadioButton'

import '../app.css'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

class AppComponent extends React.Component {

  constructor(props) {
    super(props)

    // Set initial component state
    this.state = {
      placeholder: 'Enter a name...',
      options: {
        users: [],
        org: []
      },
      selectedRadioButton: 'users',
      selectedUser: (this.currentUser) ? this.currentUser : '',
    }

    //bindings
    this.onSelect = this.onSelect.bind(this)
    this.getOptions = this.getOptions.bind(this)
    this.onRadioButtonSelect = this.onRadioButtonSelect.bind(this)
  }

  /*************** Lifecycle methods called by react ***************/
  // Lifecycle function for when react has confirmed it will mount the component without errors
  componentDidMount() {
    this.inputRef.focus();
  }

  componentDidUpdate() {
    this.inputRef.focus();
  }
  /***************************************************************/

  // Passed to and called by the RadioButton component.
  // Persists the toggled checkbox in state and relevant data in this component state and changes route.
  onRadioButtonSelect(route) {
    browserHistory.push('/' + route)
  }

  // Triggers when user selects a person in the autosuggest box
  onSelect(input) {
    switch (this.state.selectedRadioButton) {
      case 'users':
        this.props.setCurrentUser(input.value)
        browserHistory.push('/users/' + input.value.empId)
        break
      case 'org':
        this.props.setCurrentOrg(input.value)
        browserHistory.push('/users/' + input)
        break;
    }
  }

  // Triggers when user edits the input field. Calls server for new list of users to populate auto-suggest.
  getOptions(input) {
    if (!input) return Promise.resolve({ options: [] })
    return fetch('http://localhost:8080/api/users/query/' + input)
      .then(response => response.json())
      .then(json =>
        json.map(option => {
            return { label: option.firstName, value: option }
        })
      )
      .then(options => { return { options } })
  }

  // Render function that react will call
  render() {
    return (
      <div className="searchContainer">
        <form action="">
          {createRadioButtons(this.onRadioButtonSelect)}
        </form>
        <Select.Async
          ref={(input) => { this.inputRef = input }}
          loadOptions={input => { return this.getOptions(input)}}
          placeholder={this.state.placeholder}
          onChange={this.onSelect}
        />
        {this.props.children}
      </div>
    )
  }
}

// Array of options that will be radio buttons
const searchOptions = [{
    label: 'Users',   // label on button
    route: 'users',   // append to url
    checked: 'checked' // default checked value
  }, {
    label: 'Organization',
    route: 'org',
}]

// Creates a radio button for every searchOption
const createRadioButtons = (onRadioButtonSelect) => {
  return searchOptions.map(option => createRadioButton(option, onRadioButtonSelect))
}

// Helper method for creating a radio button component
const createRadioButton = ({ label, route, checked }, onRadioButtonSelect) => {
  return (
    <RadioButton
      label={label}
      key={label}
      route={route}
      name="searchOption"
      onRadioButtonSelect={onRadioButtonSelect}
      { ...checked ? { checked: 'checked' } : {}}
    />
  )
}



// Function called by redux to map the redux state to the component's props
const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  }
}

// Function called by redux to map the dispatch function to different functions
const mapPropsToDispatch = (dispatch) => {
  return bindActionCreators({setCurrentUser}, dispatch)
}

// Function that redux calls to connect the 'SearchComponent' to the
// state store using the 'mapStateToProps' and 'mapPropsToDispatch' functions
const App = connect(mapStateToProps, mapPropsToDispatch)(AppComponent)

// Export component as default module
export default App
