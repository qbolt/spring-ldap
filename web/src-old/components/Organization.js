import React from 'react'

export default class Organization extends React.Component {

  render() {
    const { org } = this.props
    return (
      <table border="1" cellspacing="0" cellpadding="4">
        {org.map(user => {(
          <tr>
            <td>user.empId</td>
            <td><a href='mailto:user.Email'>user.firstName user.lastName</a></td>
            <td>user.phone</td>
            <td>user.jobTitle</td>
            <td>user.jobCode</td>
            <td>user.vendorType</td>
            <td></td>
            <td></td>
          </tr>
          )}
        )}
  	  </table>
    )
  }
}
