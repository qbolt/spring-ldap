*







/*
Composition
Just as in Java, we favor composition over inheritance. Creating components which are composed of components
allows us to reason very easily about what each component's responsibility is.
*/

// Java
public class ProfilePic {
  Image image;

  public ProfilePic(String username) {
    this.image = new Image("http://photos.facebook.com/" + username)
  }
}

public class ProfileLink {
  String link;

  public ProfileLink(String username) {
    this.link = "http://photos.facebook.com/" + username;
  }
}

public class Avatar {
  ProfilePic profilePic;
  ProfileLink profileLink;

  public Avatar(String username) {
    this.profilePic = new ProfilePic(username);
    this.profileLink = new ProfileLink(username);
  }
}














// React
export const ProfilePic = ({ username }) => (
  <img src={`http://photos.facebook.com/${username}`} alt=""/>
)


export const ProfileLink = ({ username }) => (
  <a href={`http://facebook.com/${username}`}>
    {username}
  </a>
)


const Avatar = ({ username }) => (
  <div>
    <ProfilePic username={username} />
    <ProfileLink username={username} />
  </div>
)


export default Avatar





/************************************************/






/* Example usages of the above component hierarchy*/

// Example 1:
import Avatar from 'Profile'

const UsersPage = ({ users }) => (
  <div>
    users.map(user => <Avatar username={user.username}/>)
  </div>
)



//Example 2:

import { ProfileLink } from 'Profile'

const Directory = ({ users }) => (
  <ul>
    users.map(user => <ProfileLink username={user.username} />)
  </ul>
)

export default Directory





// Then on some main page...
import Directory from 'Directory'
import users from 'someDataSource'

const MainPage = (props) => (
  (some other components)
  <Directory users={users}/>
)



























.
