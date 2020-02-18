
import React from 'react';

export default class Search extends React.Component {

  state = {
    username: ''
  };

  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({ username: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/profile/${ this.state.username }`);
  }

  render(){
    return (
      <div>
        <h2>Search GitHub by Username</h2>
        <hr/>

        <form onSubmit={ this.handleSubmit } >
          <input type="text" placeholder="Username"  onChange={ this.handleChange } />
          &nbsp;
          <input type="submit" value="Search" />
        </form>

      </div>
    );
  } // render()

}

// export default Search;
