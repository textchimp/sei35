var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

var people = [
  { id: 1, username: "A", active: true,  age: 20 },
  { id: 2, username: "B", active: false, age: 35 },
  { id: 3, username: "C", active: false, age: 50 },
  { id: 4, username: "D", active: true,  age: 65 },
  { id: 5, username: "E", active: true,  age: 80 },
  { id: 6, username: "E", active: true,  age: 95 },
];

// Iterate through numbers and log each number to the console
_(numbers).each( item => console.log(item) );

// Iterate through numbers and multiply each one of them by 5
const timesFive = _(numbers).map( n => n * 5 );
console.log('timesFive:', timesFive);

// Iterate through numbers and reduce it by adding them together
const grandTotal = _(numbers).reduce( (total, current) => total + current );
// const grandTotal = _(numbers).reduce( function(total, current){
//     return total + current;
// });

console.log('grandTotal:', grandTotal);

// Get an array of all of the people in people that have the username "E"

// const allTheEs = _(people).where({ username: 'E' });
const allTheEs = people.filter( p => p.username === 'E' );
console.log('allTheEs:', allTheEs);

// Find the first object in people that has the id of 3
// const idThree = _(people).findWhere({ id: 3 });
const idThree = people.find( p => p.id === 3 );
console.log('idThree:', idThree);

// Find the first person who has an age of less than 50
const lessThanFifty = people.find( p => p.age < 50 );
console.log('lessThanFifty:', lessThanFifty);

// Get an array of all of the people with an age of over 60
const allOverSixty = _(people).filter( p => p.age > 60 );
console.log('allOverSixty:', allOverSixty);

// Remove all of the people with an age less than 40
const onlyOverForty = people.filter( p => p.age >= 40 );
console.log('onlyOverForty:', onlyOverForty);

const _onlyOverForty = _(people).reject( p => p.age < 40 );
console.log('_onlyOverForty:', _onlyOverForty);
