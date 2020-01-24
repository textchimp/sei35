import React from 'react';
import logo from './logo.svg';
import './App.css';

import HelloWorld from './HelloWorld';
import HelloUser from './HelloUser';

class App extends React.Component {

  // Every component class must define at minimum
  // a render() method, which must return some JSX (HTML)
  render(){
    return (
      <div>
        <h1>App component</h1>
        <p>Welcome to my cool React app! So performant!</p>

        <HelloWorld />

        <HelloUser name="Jordan" imgWidth="300" imgHeight="200 "/>
        <HelloUser name="Tony" imgWidth="200" imgHeight="400 "/>

      </div>
    );
  }

} // class App

export default App;
