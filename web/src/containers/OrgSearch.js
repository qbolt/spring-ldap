import React from 'react'

class OrgSearchComponent extends React.Component {

  constructor() {
    super()

    this.state = {
      inputValue: ''
    }

    this.updateInputValue = this.updateInputValue.bind(this)
  }

  onInputSubmit() {
    this.props.fetchOrg(this.state.inputValue)
  }

  updateInputValue(event) {
    this.setState({ inputValue: event.target.value})
  }

  render() {
    return (
      <div className="orgSearch">
        <form onSubmit={this.onInputSubmit.bind(this)}>
          <input onChange={this.updateInputValue} type="text"/>
        </form>
      {this.props.children}
      </div>
    )
  }
}

export default OrgSearchComponent
