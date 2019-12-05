
console.log('hello dom');

// Ask the DOM to give us the element we want to change
// const billImage = document.getElementById( 'firstBill' );
const $billImage   = $('#firstBill');
console.log( $billImage );

// billImage.src = '...';

// Calling attr() with one argument means GET the current value of this attribute
console.log('current src:', $billImage.attr('src') );

// Calling attr() with two arguments means SET this attribute to the second arg value
$billImage.attr('src', 'http://placebear.com/300/300');


// const bestDogItem = document.getElementById( 'bestDog' ) ;
// console.log( 'best dog:', bestDogItem );
// // Change the *contents* of this tag (the stuff inside the tags)
// bestDogItem.innerHTML = '<strong>Ruby</strong>';

const $bestDogItem = $( '#bestDog' );

const dogText = $bestDogItem.html();  // This is the getter!
console.log( 'Best dog text:', dogText );

$bestDogItem.html('Ruby');  // This is the setter!


$('#bestDog').html('Ruby');



// This only gives us the contents of the FIRST matching element
console.log(   $('p').html()  );

// If we want to print them all, we can loop through each element
// by passing a function to the each() method:
$('p').each( function(){
  // The special variable 'this' will contain the current element,
  // as we iterate through all of them
  const contents = $(this).html();
  console.log( contents );
} );


// get all paragraph tags and print their contents

// const pTags = document.getElementsByTagName( 'li' );
// const pTags = document.querySelectorAll( 'p' );
//
//
//
// // Actually attach our new detached DOM node to the DOM (making it visible)
// // document.body.appendChild( newBillImage );
//
// // Because getElementsByTagName() returns an array-like thing,
// // we can use a for loop to do something with each <p> tag
// for( let i = 0; i < pTags.length; i++ ){
//   const p = pTags[i];
//   // console.log( p.innerText );
//   console.log( p.innerHTML );
//   p.innerHTML += ' <strong>HAXXX00RREED!!</strong>';  // change each p tag's content!
//
//   p.style.backgroundColor  = 'darkgoldenrod';
//
//
//   // Create a brand new DOM node (currently detached from page, just in JS memory)
//   const newBillImage = document.createElement( 'img' );
//
//   // Set some attributes of the object
//   newBillImage.src = 'http://www.fillmurray.com/400/400';
//   newBillImage.style.border = '10px solid lavender';
//   p.appendChild( newBillImage );
//
// }
