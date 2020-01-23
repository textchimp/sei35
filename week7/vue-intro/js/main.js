
console.log('Hello Vue!');

const getResults = () => {};

Vue.component('dogs-form', {
  props: [ 'title', 'roundness' ],
  data: function(){
    return {
      name: '',
      age: ''
    };
  },
  methods: {

  },
  template: `
  <div>
    <h4>{{ title }}</h4>
    Roundness: {{ roundness }}
  </div>
  `
});



const myApp = new Vue({
  // Where does this app live in the DOM:
  el: '#app',

  // What is the state for this app:
  data: {

    message: 'Hello Vuorld!',
    loadTime: 'You loaded this page on ' + new  Date().toLocaleString(),
    canSee: true,
    errorStatus: 'allGood',
    todoList: [
      { text: 'Learn Vue.js'},
      { text: 'Finish homework'},
      { text: 'Relax'},
    ],

    dogs: []

  }, // data

  // Like jQuery's $(document).ready(): this
  // function will be run for you when the DOM
  // is loaded and the Vue app has been mounted
  // onto it ("lifecycle method")
  created: function(){
    console.log('loaded!');
    $.getJSON('http://localhost:3000/dogs')
    .done( data => this.dogs = data )
    .fail( console.warn );
  },

  // What are the event handlers or other functions our
  // template might need to run:
  methods: {

    sayHello: function(){
      console.log('HELLO!!!!!!!!!!!!!');
    },

    reverseMessage: function(){
      this.message = this.message.split('').reverse().join('');
    }

  } // methods

}); // myApp
