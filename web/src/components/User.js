import React from 'react'

import { connect } from 'react-redux'

class UserComponent extends React.Component {
  render() {
    const { user } = this.props
    return (
      <div>
        <h3>{user.firstName + ' ' + user.lastName}</h3>
        <h5>{user.email}</h5>
        <h5></h5>
        <h5></h5>
        <h5></h5>
        <h5></h5>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  }
}

const User = connect(mapStateToProps)(UserComponent)
export default User
