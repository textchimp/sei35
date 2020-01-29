
import React from 'react';
import axios from 'axios';

import SecretsForm from './SecretsForm';

import '../App.css';

const SECRETS_URL = 'http://10.1.7.201:3000/secrets.json';

class Secrets extends React.Component {

  state = {
    secrets: []
  };

  fetchSecrets(){
    axios.get( SECRETS_URL )
    .then( res => this.setState({ secrets: res.data }) )
    .catch( err => console.warn(err) );
  } // fetchSecrets()


  // Kind of like jQuery $(document).ready(): do something when this component
   // is first added to the page
  // 'Lifecycle method'
  componentDidMount(){
    console.log('mounted!');

    this.fetchSecrets();  // Load the initial list of secrets

    // Keep checking in with the server to get the latest list of secrets, in case
    // there are new ones to display (otherwise we need to reload the page to see
    // secrets that have been added by other users)
    // This is called 'polling' the server and it's very inefficient
    // (we get the entire list each time, not just the new secrets,
    // and most of the time the list will not have changed)
    window.setInterval( () => this.fetchSecrets(), 500 );

  } // componentDidMount()


  saveSecret = (secret) => {

    console.log('in saveSecret():', secret);

    axios.post( SECRETS_URL, { content: secret } )
      .then( res => {
        // this.state.secrets.push( res.data );

        // Not allowed to change state directly, including pushing onto arrays
        // const secretsCopy = this.state.secrets.slice();
        // secretsCopy.push( res.data );
        // this.setState({ secrets: secretsCopy });

        this.setState({
          secrets: [ ...this.state.secrets, res.data ]
        });

      })
      .catch( console.warn );

  } // saveSecret()



  render(){
    return (
      <div className="App">
        <h1>Spill Yer Guts</h1>

        <SecretsForm onSubmit={ this.saveSecret } />

        <hr />
        {
          this.state.secrets.reverse().map( s => <div className="secret" key={ s.id }>{ s.content }</div> )
        }


      </div>
    );
  }  // render()

} // class Secrets

export default Secrets;
