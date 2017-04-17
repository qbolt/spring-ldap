*

/*
Composition
Just as in Java, we favor composition over inheritance. Creating components which are composed of components
allows us to reason very easily about what each component's responsibility is.
*/

// Java
public class ProfilePic {
  private Image;

  public ProfilePic(String username) {
    this.image = new Image("http://photos.facebook.com/" + username)
  }
}

public class ProfileLink {
  private String link;

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

/******************************************************/













// Javascript/React
const ProfilePic = ({ username }) => {
  return (
    <img src={`http://photos.facebook.com/${username}`} alt=""/>
  )
}

const ProfileLink = ({ username }) => {
  return (
    <a href={`http://facebook.com/${username}`}>
      {username}
    </a>
  )
}

const Avatar = ({ username }) => {
  return (
    <div>
      <ProfilePic username={username} />
      <ProfileLink username={username} />
    </div>
  )
}

const Avatar = <Avatar username={'quintonbolt'} />




























.
