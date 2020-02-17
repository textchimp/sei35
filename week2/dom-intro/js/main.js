
console.log('hello dom');

// Ask the DOM to give us the element we want to change
const billImage = document.getElementById( 'firstBill' );

console.log( billImage );

// Change something about the element -
// it looks the same as changing the value of an object's key
// (because that's exactly what is happening)
billImage.src = 'http://placebear.com/300/300';


const bestDogItem = document.getElementById( 'bestDog' ) ;
const bestDogItem = document.getElementById( 'bestDog' ) ;
const bestDogItem = document.getElementById( 'bestDog' ) ;
const bestDogItem = document.getElementById( 'bestDog' ) ;
const bestDogItem = document.getElementById( 'bestDog' ) ;

console.log( 'best dog:', bestDogItem );

// Change the *contents* of this tag (the stuff inside the tags)


// get all paragraph tags and print their contents

// const pTags = document.getElementsByTagName( 'li' );
const pTags = document.querySelectorAll( 'p' );

bestDogItem.innerHTML = '<strong>Ruby</strong>';


// Actually attach our new detached DOM node to the DOM (making it visible)
// document.body.appendChild( newBillImage );

// Because getElementsByTagName() returns an array-like thing,
// we can use a for loop to do something with each <p> tag
for( let i = 0; i < pTags.length; i++ ){
  const p = pTags[i];
  // console.log( p.innerText );
  console.log( p.innerHTML );
  p.innerHTML += ' <strong>HAXXX00RREED!!</strong>';  // change each p tag's content!

  p.style.backgroundColor  = 'darkgoldenrod';



  // Create a brand new DOM node (currently detached from page, just in JS memory)
  let newBillImage = document.createElement( 'img' );

  // Set some attributes of the object
  newBillImage.src = 'http://www.fillmurray.com/400/400';
  newBillImage.style.border = '10px solid lavender';
  p.appendChild( newBillImage );

}
