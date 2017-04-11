import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setCurrentUser } from '../actions/index'

import '../app.css'

export class UserComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user
    }
  }

  /********** Life cycle methods - called by react ************/
  componentWillMount() {
    const urlId = location.pathname.substring(7)
    if (urlId) {
      getUser(urlId)
        .then(user => {
          setCurrentUser(user.value)
          this.setState({ user: user })
        })
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.params.userId !== this.props.params.userId) {
      this.setState({ user: nextProps.user})
    }
  }
  /***************************************************************/

  render() {
    const { user } = this.state
    return (
      <div className="userContainer">
        <h3>{user.firstName}</h3>
        <h5>E-mail: {user.email}</h5>
        <h5>Id: {user.empId}</h5>
      </div>
    )
  }
}

const getUser = (id) => {
  return fetch('http://localhost:8080/api/users/user/' + id)
    .then(response => response.json())
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.users.currentUser
  }
}

const mapPropsToDispatch = (dispatch) => {
  return bindActionCreators({setCurrentUser}, dispatch)
}

const User = connect(mapStateToProps, mapPropsToDispatch)(UserComponent)
export default User
