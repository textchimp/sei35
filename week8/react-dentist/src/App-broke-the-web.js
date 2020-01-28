import React from 'react';
import './App.css';

import TeethSales from './TeethSales';
import Procedures from './Procedures';

class App extends React.Component {

  // You don't actually need a constructor() to initialise
  // state. You can use this shorthand:
  state = {
    currentPage: 'home'
  };

  navigateTo = (destination) => {
    console.log('navigating to:', destination);
    this.setState({ currentPage: destination });
  }

  render(){

    let pageContent;
    if( this.state.currentPage === 'procedures'  ){
      pageContent = <Procedures />;
    } else if( this.state.currentPage === 'teethshop' ){
      pageContent = <TeethSales />;
    } else {
      // 'home' is the default
      pageContent = <p>I am a good dentist. Let me look in your mouth.</p>;
    }

    return (
      <div className="App">
        <h1>Let Me Be Your Dentist. I insist.</h1>
        <hr />
        <nav>
          <button onClick={ () => this.navigateTo('home') }>Home</button> | &nbsp;
          <button onClick={ () => this.navigateTo('procedures') }>Procedures</button> | &nbsp;
          <button onClick={ () => this.navigateTo('contact') }>Contact Us</button> | &nbsp;
          <button onClick={ () => this.navigateTo('teethshop') }>Teeth Sales</button>
        </nav>
        <br/>
        <br/>

        { pageContent }

        <hr />
        <footer>
          &copy; 2020 Unsettling Professionals
        </footer>
      </div>
    );
  } // render

} // class App

export default App;
