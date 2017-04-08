import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import RadioButton from './RadioButton'

import '../app.css'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

class SearchComponent extends React.Component {

  constructor(props) {
    super(props)

    // Get current person based on id in url
    this.currentPerson = getPerson(location.pathname.substring(8), this.props.people)

    // Set initial component state
    this.state = {
      placeholder: 'Enter a name...',
      selectedRadioButton: 'person',
      selectedPerson: (this.currentPerson) ? this.currentPerson : '',
      options: {
        person: this.props.people.map(person => {
          return { label: person.name, value: person }
        }),
        org: []
      },
      currentOptions: [],
      suggestions: []
    }

    //bindings
    this.onInputChange = this.onInputChange.bind(this)
    this.onRadioButtonSelect = this.onRadioButtonSelect.bind(this)
  }

  /*************** Lifecycle methods called by react ***************/
  // Lifecycle function for when react has confirmed it will mount the component without errors
  componentWillMount() {
    this.setState({
      currentOptions: this.state.options[this.state.selectedRadioButton]
    })
  }

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
    this.setState({
      selectedRadioButton: route,
      currentOptions: this.state.options[route],
      selectedPerson: ''
    })
    browserHistory.push('/' + route)
  }

  // Triggers when they select a person in the autosuggest box
  onInputChange(person) {
    this.setState({ selectedPerson: person })
    browserHistory.push('/person/' + person.value.id)
  }

  // Render function that react will call
  render() {
    return (
      <div className="searchContainer">
        <form action="">
          {createRadioButtons(this.onRadioButtonSelect)}
        </form>
        <Select
          ref={(input) => { this.inputRef = input }}
          placeholder={this.state.placeholder}
          options={this.state.currentOptions}
          value={this.state.selectedPerson}
          onChange={this.onInputChange}
          noResultsText={false}
        />
        {this.props.children}
      </div>
    )
  }
}

// Array of options that will be radio buttons
const searchOptions = [{
    label: 'People',   // label on button
    route: 'person',   // append to url
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

// Helper method for getting person object from people array based on id
const getPerson = (id, people) => {
  const person = people.find(person => person.id === id)
  return {
    label: person ? person.name : '',
    value: person
  }
}

// Function called by redux to map the redux state to the component's props
const mapStateToProps = (state) => {
  return {
    people: state.people
  }
}

// Function that redux calls to connect the 'SearchComponent' to the state store using the 'mapStateToProps' function
const Search = connect(mapStateToProps)(SearchComponent)

// Export store-connected component as default module
export default Search
