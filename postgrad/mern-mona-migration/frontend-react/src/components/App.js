import React from 'react';
import './App.css';

import Routes from '../routes';

function App() {
  return (
    <div className="App">
      <header>
        <h1>MoMA!</h1>
        <hr/>
      </header>
      { Routes }
      <footer>
        <hr/>
        &copy; Art School Dropout Productions, 2020
      </footer>
    </div>
  );
}

export default App;
