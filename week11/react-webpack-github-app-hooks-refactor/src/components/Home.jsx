
import React from 'react';

import { Link } from 'react-router-dom'

const Home = props => {

  const randomUser = () => {
    console.log('Rando');
  };

  return (
    <div>
      <h1>GitHub Search</h1>
      <hr />

      <Link to="/search">
        <button>Search for a user</button>
      </Link>

      &nbsp;

      <button onClick={ randomUser }>Random User</button>


    </div>
  );

};

export default Home;
