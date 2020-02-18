import React, {  useState, useEffect }  from 'react';
import axios from 'axios';

import './Profile.css';

const BASE_URL = 'https://api.github.com/users';
const AUTH_TOKENS = '?client_id=4ec1b8f9c149f7c46ffd&client_secret=a05ec287c29ebd9633131b5a08298530709130e9';


const Profile = (props) => {

  const [ user, setUser   ] = useState(null);
  const [ repos, setRepos ] = useState(null);

  const loadGitHubData = () => {

    const { user } = props.match.params;

    axios.get(`${BASE_URL}/${ user }${ AUTH_TOKENS }`)
    .then( res => {
      console.log( 'response:', res );
      setUser( res.data );
    })
    .catch( err => console.warn('Error loading user info:', err) );


    axios.get(`${BASE_URL}/${ user }/repos${ AUTH_TOKENS }`)
    .then( res => setRepos( res.data ) )
    .catch( err => console.warn('Error loading repos:', err) );

  }; // loadGitHubData()

  // useEffect( loadGitHubData, [] );
  // empty array means run once when the component mounts!
  // same as componentDidMount()

  // Actually the below effect runs when the component first
  // mounts too, so there's no need for the above one! 👆
  // Now that's clean!™️

  useEffect( loadGitHubData, [props.match.params.user] );
  // Reload the AJAX data when that prop changes
  // same as componentDidUpdate()

  return (
    <div className="profile">
      <h1>Profile for { props.match.params.user }</h1>

      <UserInfo   user={ user } />
      <UserRepos repos={ repos } />

    </div>
  );
};

export default Profile;







// export default class Profile extends React.Component {
//
//   state = {
//     user: null,
//     repos: null
//   };
//
//
//   componentDidUpdate( prevProps, prevState ){
//     console.log('updated!!!');
//     console.log( prevProps, prevState );
//
//     // We have to make sure this componentDidUpdate() call is happening because
//     // the data we care about has changed (in this example, the user param passed
//     // to us as a prop by the router). We know that's the case if the old value
//     // for this bit of data is not the same as the current value.
//     // If they are the same, it must mean that componentDidUpdate() has been triggered
//     // in response to something else changing - and the only other option here
//     // is the setState() that is happening in our ajax response code, in
//     // loadGitHubData(). We do not want to call loadGitHubData() again in response
//     // to loadGitHubData() being run, or we have an infinite loop. Yay React!
//     if( prevProps.match.params.user !== this.props.match.params.user ){
//       console.log('reload data?');
//       this.loadGitHubData();
//     }
//
//   } // componentDidUpdate
//
//
//   loadGitHubData(){
//
//     const { user } = this.props.match.params;
//
//     axios.get(`${BASE_URL}/${ user }${ AUTH_TOKENS }`)
//     .then( res => {
//       console.log( 'response:', res );
//       this.setState({ user: res.data });
//     })
//     .catch( err => console.warn('Error loading user info:', err) );
//
//
//     axios.get(`${BASE_URL}/${ user }/repos${ AUTH_TOKENS }`)
//     .then( res => this.setState({ repos: res.data }) )
//     .catch( err => console.warn('Error loading repos:', err) );
//
//
//   } // loadGitHubData()
//
//
//   // runs once when this component is mounted
//   componentDidMount(){
//     this.loadGitHubData();
//   } // componentDidMount()
//
//
//
//   render(){
//
//     return (
//       <div className="profile">
//         <h1>Profile for { this.props.match.params.user }</h1>
//
//         <UserInfo   user={ this.state.user } />
//         <UserRepos repos={ this.state.repos } />
//
//       </div>
//     );
//   } // render()
//
// } // class Profile


const UserRepos = (props) => {

  let reposList;

  if( props.repos === null ){
    reposList = <div>Loading...</div>;
  } else {
    reposList = props.repos.map( repo => (
      <li key={ repo.id }>
        <a href={ repo.html_url } target="_blank">{ repo.name }</a>
      </li>
    ));
  }

  return (
    <div className="reposInfo">
      <ul>
        { reposList }
      </ul>
    </div>
  );

}; // UserRepos()



const UserInfo = (props) => {

  let infoContent;

  if( props.user === null ){
    infoContent = <div>Loading...</div>;
  } else {

    const { avatar_url, followers, following, public_repos, public_gists, html_url, login } = props.user;

    infoContent = (
      <div>
        <img src={ avatar_url } alt={ login } />
        <p>Followers: { followers }</p>
        <p>Following: { following }</p>
        <p>Repos: { public_repos }</p>
        <p>Gists: { public_gists }</p>
        <p>
          <a href={ html_url } target="_blank">View on GitHub</a>
        </p>
      </div>
    );
  }

  return (
    <div className="userInfo">
      <h3>Stats</h3>
      { infoContent }
    </div>
  );

}; // UserInfo()
