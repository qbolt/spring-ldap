import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setCurrentUser } from '../actions'

class UserComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: undefined
    }
  }

  // Lifecycle method to check to see if the current user held in the state differs
  // from the url requested. If it does, fetch the url-user and dispatch action to update state
  componentWillMount() {
    const { userId } = this.props.params
    if (userId !== this.props.user.empId)
      fetchUser(userId)
        .then(user => this.props.setCurrentUser(user))
  }

  render() {
    let { user } = this.props
    if (this.state.user)
      user = this.state.user

    return (
      <div className="userContainer">
        <h3>{user.firstName + ' ' + user.lastName}</h3>
        <div>{user.empId}</div>
        <div>{user.email}</div>
        <div>{user.phone}</div>
        <div>{user.jobTitle}</div>
        <div>{user.jobCode}</div>
        <div>{user.orgCode}</div>
        <div>
          {`${user.addressLine1} ${user.workCity} ${user.workState}`}
        </div>
        <div>
          {`${user.workCity} ${user.workState} ${user.postalCode}`}
        </div>
        <div>{user.countryName}</div>
      </div>
    )
  }
}

const fetchUser = (id) => {
  return fetch(`http://localhost:8080/api/users/user/${id}`)
    .then(response => response.json())
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapPropsToDispatch = (dispatch) => {
  return bindActionCreators({ setCurrentUser }, dispatch)
}

const User = connect(mapStateToProps, mapPropsToDispatch)(UserComponent)
export default User
