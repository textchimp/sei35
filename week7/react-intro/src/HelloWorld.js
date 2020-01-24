// Import the core functionality of React into
// this file, so things like JSX work properly
import React from 'react';

// "Pure functional" component: just a function
// that returns some JSX code to be rendered
// on the DOM
const HelloWorld = function(){
  return (
    <h3>Hello from the HelloWorld component.</h3>
  );
};

// Make the function available for importing
// in other component files
export default HelloWorld;
