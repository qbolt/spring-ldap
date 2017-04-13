import React from 'react'

import SearchOptions from '../containers/SearchOptions'

export default class App extends React.Component {

  render() {
    return (
      <div className="root">
        <SearchOptions />
        {this.props.children}
      </div>
    )
  }
}
