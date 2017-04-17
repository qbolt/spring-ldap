import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setSearchOption } from '../actions'
import RadioButton from './RadioButton'

class SearchOptionsComponent extends React.Component {

  constructor(props) {
    super(props)

    this.onRadioButtonSelect = this.onRadioButtonSelect.bind(this)
  }

  onRadioButtonSelect(route) {
    this.props.setSearchOption(route)
    hashHistory.push('/' + route)
  }

  render() {
    return <div>{createRadioButtons(this.onRadioButtonSelect)}</div>
  }
}

const searchOptions = [{
    label: 'Users',   // label on button
    route: 'users',   // append to url
    checked: 'checked' // default checked value
  }, {
    label: 'Organization',
    route: 'org',
}]

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

// Creates a radio button for every searchOption
const createRadioButtons = (onRadioButtonSelect) => {
  return searchOptions.map(option => createRadioButton(option, onRadioButtonSelect))
}

const mapStateToProps = (state) => {
  return {
    searchOption: state.searchOption,
    org: state.org,
    user: state.user

  }
}

// Function called by redux to map the dispatch function to different functions
const mapPropsToDispatch = (dispatch) => {
  return bindActionCreators({setSearchOption}, dispatch)
}

const SearchOptions = connect(mapStateToProps, mapPropsToDispatch)(SearchOptionsComponent)
export default SearchOptions
