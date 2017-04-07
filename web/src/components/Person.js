import React from 'react'
import { connect } from 'react-redux'

import '../app.css'

export class PersonComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      person: this.props.people.find(person => person.id === this.props.params.personId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.personId !== this.props.params.personId) {
      this.setState({
        person: this.props.people.find(person =>
          person.id === nextProps.params.personId)
      })
    }
  }

  render() {
    return (
      <div className="personContainer">
        {this.state.person.name}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    people: state.people
  }
}

const Person = connect(mapStateToProps)(PersonComponent)
export default Person
