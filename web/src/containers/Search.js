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
    route: 'people',
    checked: 'checked'
  }, {
    label: 'Organization',
    route: 'org',
    checked: ''
}]

class SearchComponent extends React.Component {

  constructor(props) {
    super(props)

    // pull people and location from this.props so I don't have to type 'this.props.*' every time
    const { people, location } = this.props

    // Get current person based on id in url
    this.currentPerson = getPerson(location.pathname.substring(1), this.props.people)

    // Set initial state
    this.state = {
      selectedRadioButton: '',
      value: (this.currentPerson) ? this.currentPerson : '',
      suggestions: []
    }

    // options for auto-suggest
    this.options = people.map(person => {
        return { label: person.name, value: person }
      }
    )

    //bindings
    this.onInputChange = this.onInputChange.bind(this)
    this.selectRadioButton = this.selectRadioButton.bind(this)
    this.createRadioButton = this.createRadioButton.bind(this)
  }

  // Helper method for creating a checkbox component
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
  selectRadioButton({ route }) {
    this.setState({ selectedRadioButton: route })
  }

  // Triggers when they select a person in the autosuggest box
  onInputChange(person) {
    this.setState({ value: person })
    browserHistory.push(person.value.id)
  }

  render() {
    return (
      <div className="searchContainer">
        <form action="">
          {this.createRadioButtons()}
        </form>
        <Select
          options={this.options}
          placeholder="Enter a name"
          onChange={this.onInputChange}
          onValue={(value) => console.log(value)}
          value={this.state.value}
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

const mapStateToProps = (state) => {
  return {
    people: state.people
  }
}

const Search = connect(mapStateToProps)(SearchComponent)
export default Search
