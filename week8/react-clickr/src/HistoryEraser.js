import React, { Component } from 'react';

import Clickr from './Clickr';

class HistoryEraser extends Component {

  constructor(){
    super(); // call the constructor() of the parent class, Component

    // initialise the state of this component
    this.state = {
      historyStillExists: true
    };

  } // constructor()


  maybeEraseHistory = (clickCount) => {

    console.log('in maybeEraseHistory(): ', clickCount);

    if( clickCount > 4 ){
      this.setState({ historyStillExists: false });
    }

  } // maybeEraseHistory()


  render(){

    // let history;
    // if( this.state.historyStillExists ){
    //   history = <p>All is well - history still exists</p>;
    // } else {
    //   history = <h2>YOU FOOL!! YOU ERASED HISTORY!!!^&%@#!</h2>;
    // }

    return (
      <div>
        <h1>HISTORY ERASER BUTTON!!!</h1>

        {
          this.state.historyStillExists
          ?
          <p>All is well - history still exists</p>
          :
          <h2>YOU FOOL!! YOU ERASED HISTORY!!!^&%@#!</h2>
        }

        <Clickr
          message="Possibly Erase History"
          onButtonClick={ this.maybeEraseHistory }
        />


      </div>
    );

  } // render()

} // class HistoryEraser

export default HistoryEraser;
