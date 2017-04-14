import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'

import { fetchOrg, setCurrentOrg } from '../actions'

class OrgSearchComponent extends React.Component {

  constructor() {
    super()

    // local component state for holding the current inputValue
    this.state = {
      inputValue: ''
    }

    // bindings so I can pass the function around directly
    this.updateInputValue = this.updateInputValue.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  // Creates and dispatches action to fetch the org data, passing it the inputValue
  onSubmit(event) {
    // Prevents default behavior for submitting a form (refreshing page)
    event.preventDefault()

    const { inputValue } = this.state

    // Fetch org then dispatch an action to update the state's currentOrg
    this.props.fetchOrg(inputValue)
      .then(response => this.props.setCurrentOrg(inputValue, response.org))
    hashHistory.push('/org/' + inputValue)
  }

  // Called every time the input field is changed
  updateInputValue(event) {
    this.setState({ inputValue: event.target.value})
  }

  render() {
    return (
      <div className="orgSearch">
        <form onSubmit={this.onSubmit}>
          <input onChange={this.updateInputValue} type="text"/>
        </form>
      {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapPropsToDispatch = (dispatch) => {
  return bindActionCreators({fetchOrg, setCurrentOrg}, dispatch)
}

const OrgSearch = connect(mapStateToProps, mapPropsToDispatch)(OrgSearchComponent)
export default OrgSearch
