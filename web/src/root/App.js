import React from 'react'

import SearchOptions from '../containers/SearchOptions'

const App = props => {
    return (
      <div className="root">
        <SearchOptions />
        {props.children}
      </div>
    )
}

export default App
