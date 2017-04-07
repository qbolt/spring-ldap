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
    const { person } = this.state
    return (
      <div className="personContainer">
        <h3>{person.name}</h3>
        <h5>E-mail: {person.email}</h5>
        <h5>Age: {person.age}</h5>
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
