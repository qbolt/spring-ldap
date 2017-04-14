/*
  The React API is actually pretty small because it relies heavily on Javascript itself.
*/

import React from 'react'

const friends = ['John', 'Bryan', 'Chris', 'Joe']
const friendsComponent = () => (
  <ul>
    {friends.map(name => <ul>{name}</ul>)}
  </ul>
)

export default friendsComponent
