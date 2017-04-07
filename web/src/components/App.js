import React from 'react'
import Search from '../containers/Search'

import '../index.css'

export default class App extends React.Component {
  render() {
    return (
      <div className="root">
        {this.props.children}
      </div>
    )
  }
}
