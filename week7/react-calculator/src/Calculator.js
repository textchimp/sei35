import React from 'react';

class Calculator extends React.Component {

  constructor(){
    super();  // Call the constructor() method of the superclass, React.Component
    console.log('New Calculator component object made!', this);

    // Initialise the state for this component:
    // (in Vue, this is called 'data')
    this.state = {
      firstNum: 0,
      secondNum: 0
    };

    // We need to lock down the value of 'this' inside our updateFirstNum()
    // event handler. To do this, we can use .bind, which when you call it on
    // a function, returns a new version of that function which has its 'this'
    // value set as the argument given to bind() - and the argument to bind()
    // here is the value of 'this' as it is in the constructor function, where it
    // has the value we want (the current Calculator component object).
    // It is by setting updateFirstNum() as the onChange event handler for the
    // text input that it loses the correct value of 'this'.
    this.updateFirstNum = this.updateFirstNum.bind( this );
    this.updateSecondNum = this.updateSecondNum.bind( this );
  }

  updateFirstNum( event ){
    console.log('event:', event.target.value);
    console.log('this:', this);
    // Store the value of the form input into app state, so we can use it
    // to update the DOM:

    // BUT: YOU ARE NOT ALLOWED TO MUTATE STATE DIRECTLY IN REACT
    // this.state.firstNum = event.target.value --- NOT ALLOWED!!!

    // You must use the setState() method of the object, which updates
    // the state and then triggers a re-render of the component, using render()
    this.setState({ firstNum: parseFloat(event.target.value) });
  }

  updateSecondNum( event ){
    this.setState({ secondNum: parseFloat(event.target.value) });
  }

  render(){
    const firstNum = this.state.firstNum;
    const secondNum = this.state.secondNum;

    return (
      <div>
        <h2>CalculatoReact!</h2>

        <input type="text" placeholder="First Number" onChange={ this.updateFirstNum } />
        <br/>
        <input type="text" placeholder="Second Number" onChange={ this.updateSecondNum } />

        <h3>Results:</h3>

        { firstNum } + { secondNum } = { firstNum + secondNum }<br/>
        { firstNum } - { secondNum } = { firstNum - secondNum }<br/>
        { firstNum } / { secondNum } = { firstNum / secondNum }<br/>
        { firstNum } * { secondNum } = { firstNum * secondNum }

      </div>
    );
  }

} // Calculator

export default Calculator;
