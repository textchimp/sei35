
import React from 'react';

class SecretsForm extends React.Component {

  state = {
    secret: ''
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ secret: event.target.value });
  }

  handleSubmit = (event) => {
    // stop page from reloading!
    event.preventDefault();

    console.log('submitted!', this.state.secret);

    this.props.onSubmit( this.state.secret );

  }

  render(){

    return(
      <form onSubmit={ this.handleSubmit }>
        <textarea onChange={ this.handleChange } />
        <br/>
        <input type="submit" value="Share" />
      </form>
    );

  } // render()

} // class SecretsForm

export default SecretsForm;
