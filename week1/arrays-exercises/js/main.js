// Your top choices
// Create an array to hold your top five choices of something (colors, presidents, whatever). If you choose movies, the right top choice is "Satantango".
//
// For each choice, log to the screen a string like: "My #1 choice is blue."
// Bonus: Change it to log "My 1st choice, "My 2nd choice", "My 3rd choice", picking the right suffix for the number.

const topDogs = [
  'Novia Scotia Duck-Tolling Retriever',
  'Leonberger',
  'Husky',
  'Pug',
  'Staffordshire',
  'Golden Retriever',
  'Chilean Terrier'
];

const suffixes = [ 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th' ];

for( let i = 0; i < topDogs.length; i++ ){
  const currentDog = topDogs[ i ];
  // console.log( `My #${ i+1 } choice is ${currentDog}.` );

  // let suffix = '';
  // if( i === 0 ){
  //   suffix = 'st';
  // } else if( i === 1 ){
  //   suffix = 'nd';
  // } else if( i === 2 ){
  //   suffix = 'rd'
  // } else {
  //   suffix = 'th';
  // }

  console.log(`My ${ i+1 }${ suffixes[ i ] } is the ${ currentDog }.`);

}
