import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setCurrentOrg } from '../actions'

import '../app.css'

class OrgComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      org: undefined
    }
  }

  // Lifecycle method to check to see if the current user held in the state differs
  // from the url requested. If it does, fetch the url-user and dispatch action to update state
  componentWillMount() {
    const { orgId } = this.props.params
    if (orgId !== this.props.org.orgId)
      fetchOrg(orgId)
        .then(org => this.props.setCurrentOrg(orgId, org))
  }

  render() {
    let { org } = this.props
    if (this.state.org)
      org = this.state.org

    const employees = org.employees
    return (
        <table className="orgTable">
        <tbody>
          {employees.map(employee => {
            return (
              <tr key={employee.empId} className="orgRow">
                <td>{employee.empId}</td>
    						<td><a href='mailto:$!emp.Email'>{employee.firstName + ' ' + employee.lastName}</a></td>
                <td>{employee.phone}</td>
                <td>{employee.jobTitle}</td>
                <td>{employee.jobCod}e</td>
                <td>{employee.vendorType}</td>
                <td>{employee.orgCode}</td>
                <td>{employee.workCity}</td>
                <td>{employee.countryCode}</td>
                <td>{employee.countryName}</td>
              </tr>
            )}
          )}
        </tbody>
      </table>
    )
  }
}

const fetchOrg = (id) => {
  return fetch(`http://localhost:8080/api/org/${id}`)
    .then(response => response.json())
}

const mapStateToProps = (state) => {
  return {
    org: state.org
  }
}

const mapPropsToDispatch = (dispatch) => {
  return bindActionCreators({ setCurrentOrg }, dispatch)
}

const Org = connect(mapStateToProps, mapPropsToDispatch)(OrgComponent)
export default Org
