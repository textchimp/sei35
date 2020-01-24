import React from 'react';
import './App.css';

import Calculator from './Calculator';

class App extends React.Component {
  render(){
    console.log('rendering App!');
    return (
      <div className="calculatorApp">
        <Calculator />
        {
          /*
          This is a multi-line comment you can use
          inside JSX code
          */
        }
      </div>
    );
  }
} // App

export default App;
