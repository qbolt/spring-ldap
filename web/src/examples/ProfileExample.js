import React from 'react'

const ProfilePic = (props) => {
  return (
    <img src={`http://photos.facebook.com/${this.props.username}`} alt=""/>
  )
}

const ProfileLink = (props) => {
  return (
    <a href={`http://facebook.com/${this.props.username}`}>
      {this.props.username}
    </a>
  )
}

const Profile = (props) => {
  return (
    <div>
      <ProfilePic username={this.props.username} />
      <ProfileLink username={this.props.username} />
    </div>
  )
}

const profile = <Profile username={'quintonbolt'} />
