// (In JS) Change the body tag's style so it has a font-family of "Arial, sans-serif".
const body = document.querySelector('body');

console.log( body );

body.style.fontFamily = 'Comic Sans MS';

// (In JS) Replace each of the spans (nickname, favorites, hometown) with your own information.
const nickname = document.querySelector('#nickname');
nickname.innerHTML = 'Textchimp';

const favorites = document.querySelector('#favorites');
favorites.innerHTML = 'Happy dogs';

const hometown = document.querySelector('#hometown');
hometown.innerHTML = 'Syd';




// Iterate through each li and change the class to "listitem". Add a style tag that sets a rule for "listitem" to make the color red.

const listItems = document.querySelectorAll('li');

for( let i = 0; i < listItems.length; i++ ){
  listItems[i].className = 'listitem';
}

// Create a new img element and set its src attribute to a picture of you. Append that element to the page.
const bill = document.createElement( 'img' );

bill.src = 'http://www.fillmurray.com/500/500';

document.body.appendChild( bill );
