
console.log('Underscore time!');

const bros = [ 'Groucho', 'Harpo', 'Chico' ];


// _(bros).each( console.log );

// _.each( bros, function( item ){
//   console.log( item );
// });
//
// _.each( bros, console.log );


const printArg = function( item, index ){
  // console.log( arguments );
  console.log(`item number ${ index } is: ${ item }`);
};

// _(bros).each( printArg );

_(bros).each( function( item ){
  console.log( item );
});

// Vanilla JS
// bros.forEach( printArg );

bros.forEach( function( item ){
  console.log(`forEach item: ${item}`);
});

bros.forEach( item => console.log(`arrow foreach item:`, item) );


// .each works for objects too
const groucho = {
  name: 'Groucho',
  instrument: 'Guitar',
  vice: 'Cigars'
};

_(groucho).each( function(val, key){
  console.log(key, val);
});

// Arrow fn:
_(groucho).each( (val, key) => console.log(key, val)  );

console.log('map ------------------------------ ');

const nums = [ 1, 2, 3, 4, 5 ];

const squaredOldskool = _(nums).map( function(n){
  return n * n;
});
console.log('squaredOldskool:', squaredOldskool);

// How would you do this yourself? Square every item in the array, without .map?
const mapOutput = [];
for( let i = 0; i < nums.length; i++ ){
  const elem = nums[i];
  const result = elem * elem;
  mapOutput.push( nums[i] * nums[i] );
}
console.log('Long-way map:', mapOutput);

// Lovely ES6 arrow fn one-liner, with implicit return
const squared = _(nums).map( n => n * n );     // ES6 map:  nums.map(...)
console.log('squared ES6 arrow:', squared);

// You can do non-numerical transformations of an array, too:
const brosUpper = _(bros).map( bro => bro.toUpperCase() );
console.log('Marx bros uppercased:', brosUpper);


console.log('reduce -------------');

// const nums = [ 1, 2, 3, 4, 5 ];

const sum = _(nums).reduce( function( runningTotal, item ){
  console.log(`runningTotal: ${ runningTotal }, current item: ${ item }`);
  return runningTotal + item; // the value returned by the fn becomes the runningTotal val for the next fn call
} );

const arrowSum = _(nums).reduce( (acc, item) => acc + item );  // ES6: nums.reduce(...)
console.log('arrowSum:', arrowSum);

const brosConcatenated = _(bros).reduce( function( accum, bro ){
  console.log(`accum: ${ accum }, current bro: ${ bro }`);
  return accum + ', ' + bro;
});
console.log( brosConcatenated );

// ActiveRecord-style Underscore methods for searching through data (arrays of objects, usually)
console.log('===================');

const brothers = [
  { name: 'Groucho', instrument: 'guitar', vice: 'cigars',     age: 44, nums: [1,2,3,5] },
  { name: 'Harpo',   instrument: 'harp',   vice: 'mutism',     age: 42, nums: [1,2,3] },
  { name: 'Chico',   instrument: 'guitar', vice: 'infidelity', age: 39, nums: [1,2,3,5] }
];

// Like ActiveRecord's ` Brother.find_by instrument: 'harp' `
const harpist = _(brothers).findWhere({ instrument: 'harp' });
console.log('The harpist is:', harpist);

// ES6 version: you have to give a callback function, not an object, as the argument.
// This makes it versatile because you can perform any kind of check, but it's a bit
// longer to write.
const es6Harpist = brothers.find( function(item){
  // .find returns the FIRST item in the array for which this function returns true(thy)
  return item.nums.length < 4;
});
console.log('es6Harpist:', es6Harpist);

const arrowHarpist = brothers.find( bro => bro.nums.length < 4 );
console.log('arrowHarpist:', arrowHarpist);

// Same as ActiveRecord's `where`:
const guitarists = _(brothers).where({ instrument: 'guitar' });
console.log('guitarists:', guitarists);

// Chaining array methods: the output array produced by filter is the input array to map:
// first narrow down the list of brothers to only the ones with more than 3 favourite numbers,
// then instead of dealing with an array of objects, use .map to just get an array of the name
// strings from the objects.
const es6guitarists = brothers.filter( bro => bro.nums.length > 3 ).map( o => o.name );
console.log('es6guitarists:', es6guitarists);

// Which brothers have the number 5 in their array of favourite numbers?
const fansOfFive = brothers.filter( bro => bro.nums.includes(5) );
console.log('fans of the number five:', fansOfFive);
