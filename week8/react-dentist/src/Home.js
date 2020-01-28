import React from 'react';

class Home extends React.Component {

  // You don't actually need a constructor() to initialise
  // state. You can use this shorthand:
  state = {
    searchText: ''
  };


  handleInput = (event) => {
    // console.log('typing!', event.target.value);

    // As the form input changes (is added to, or deleted)
    // save its current value into our state variable
    this.setState({ searchText: event.target.value });
  }

  handleSubmit = () => {
    const route = `/procedures/search/${ this.state.searchText }`;

    console.log('new route:', route);

    this.props.history.push( route );
  }

  render(){
    return (
      <div>
        <input type="text" onChange={ this.handleInput } />
        <button onClick={ this.handleSubmit }>Search Procedures</button>
        <p>I am a good dentist. Let me look in your mouth.</p>
      </div>
    );
  }
};

export default Home;
