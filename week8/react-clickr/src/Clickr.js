import React, { Component } from 'react';


class Clickr extends Component {

  constructor(){
    super();

    this.state = {
      clickCounter: 0
    };

  } // constructor()

  // If we define this method using an arrow function, it won't
  // lose its value of 'this' (which needs to refer to "the current
  // instance of the Clickr class" for this.setState() to work)
  // No more .bind() in the constructor!!!
  handleClick = () => {
    console.log('Clicked!', this);

    const newClickCount = this.state.clickCounter + 1;

    // GOTCHA!!!!!!!!!!!!!
    // setState() is ASYNCHRONOUS! It takes some time to
    // update the state, so you can't rely on the new
    // value being available in the code that follows.
    // Easiest solution is to store the result in a new
    // variable first, and use that var in setState()
    // and anywhere else you need the updated value
    this.setState({ clickCounter: newClickCount });

    // WRONG! The state will not have the updated value yet!
    // console.log('clickCounter', this.state.clickCounter );

    console.log('clickCounter', newClickCount );

    // What we're doing here is calling a method defined
    // in the parent component HistoryEraser, and passed
    // down to this child component Clickr as a prop.
    // By passing arguments to this method, we can send
    // data back up the tree to the parent component.
    this.props.onButtonClick( newClickCount );

  } // handleClick()


  render(){
    return (
      <div>

        <button onClick={ this.handleClick }>
        { this.props.message }
        </button>

      </div>
    );
  } // render()

} // class Clickr


export default Clickr;
