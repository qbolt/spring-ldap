import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import RadioButton from './RadioButton'

import '../app.css'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

// Array of options that will be radio buttons
const searchOptions = [{
    label: 'People',
    route: 'person',
    checked: 'checked'
  }, {
    label: 'Organization',
    route: 'org',
    checked: ''
}]

class SearchComponent extends React.Component {

  constructor(props) {
    super(props)

    // Get current person based on id in url
    this.currentPerson = getPerson(location.pathname.substring(8), this.props.people)

    // Set initial state
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
    this.selectRadioButton = this.selectRadioButton.bind(this)
    this.createRadioButton = this.createRadioButton.bind(this)
  }

  // Lifecycle function for when react has confirmed it will mount the component without errors
  componentWillMount() {
    this.setState({
      currentOptions: this.state.options[this.state.selectedRadioButton]
    })
  }

  // Helper method for creating a radio button component
  createRadioButton({ label, checked, route }) {
    return (
      <RadioButton
        label={label}
        key={label}
        route={route}
        name="searchOption"
        selectRadioButton={this.selectRadioButton}
        { ...checked ? { checked: 'checked' } : {}}
      />
    )
  }

  // Creates a radio button for every searchOption
  createRadioButtons() {
    return searchOptions.map(this.createRadioButton)
  }

  // Persists the toggled checkbox in state
  selectRadioButton(route) {
    this.setState({ selectedRadioButton: route })
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
          {this.createRadioButtons()}
        </form>
        <Select
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
