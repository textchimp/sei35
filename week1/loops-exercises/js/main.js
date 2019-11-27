// console.log('hello world!');

// The even/odd reporter
// Write a for loop that will iterate from 0 to 20. For each iteration, it will check if the current number is even or odd, and report that to the screen (e.g. "2 is even").
//

for( let i = 0; i <= 20; i++ ){

  // Test if the loop counter is currently even or odd
  // if( i % 2 === 0 ){
  //   console.log(`${i} is even.`);
  // } else {
  //   console.log(`${i} is odd.`);
  // }

  let status = 'odd';  // initialise status string to a default value

  if( i % 2 === 0 ){
    status = 'even'; // only change status if the loop counter is even
  }

  console.log(`${i} is ${status}.`);

}  // for





// Multiplication Tables
// Write a for loop that will iterate from 0 to 10. For each iteration of the for loop, it will multiply the number by 9 and log the result (e.g. "2 * 9 = 18").
//
// Bonus: Use a nested for loop to show the tables for every multiplier from 1 to 10 (100 results total).
//

for( let i = 0; i <= 10; i++ ){
  // console.log(`Outer loop! Value of i is: ${i}`);
  for( let j = 0; j <= 10; j++ ){
    const product = i * j;
    if( product % 10 === 0 ){
      console.log(`%c${i} * ${j} = ${ product }`, 'color: red; font-size: 20pt');
    } else {
      console.log(`${i} * ${j} = ${ product }`);
    }
  }
}


// The Grade Assigner
// Check the results of assignGrade function from the conditionals exercise for every value from 60 to 100 - so your log should show "For 89, you got a B. For 90, you got an A.", etc.

// original question:
// Write a function named assignGrade that:
//
// takes 1 argument, a number score.
// returns a grade for the score, either "A", "B", "C", "D", or "F" (for example, scores above 90 receive an "A", scores between 90 and 80 receive a "B", and so on).
// Call that function for a few different scores and log the result to make sure it works.
const assignGrade = function( score ){
  if( score >= 90 ){
    return 'A';
  } else if( score >= 80 ){
    return 'B';
  } else if( score >= 70 ){
    return 'C';
  } else if( score >= 60 ){
    return 'D';
  } else {
    return 'F';
  }
};




for( let i = 0; i < 100; i++ ){
  console.log(`The grade for ${i} is ${ assignGrade(i) }.`);
}
