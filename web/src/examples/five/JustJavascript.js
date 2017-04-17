./*
  The React API is actually pretty small because it relies heavily on Javascript itself.
*/

import React from 'react'

/***************Friends Component****************/
const FriendsList = ({ friends }) => (
  <ul>
    {friends.map(name => <div>{name}</div>)}
  </ul>
)
/**********************************************/

const friends = ['John', 'Bryan', 'Chris', 'Joe']
const usageExample = <FriendsList friends={friends}></FriendsList>

export default FriendsList
