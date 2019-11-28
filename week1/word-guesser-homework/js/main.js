/*
Homework: The Word Guesser
You'll create a simple word guessing game where the user gets infinite tries to guess the word (like Hangman without the hangman, or like Wheel of Fortune without the wheel and fortune).

• Create two global arrays: one to hold the letters of the word (e.g. 'F', 'O', 'X'), and one to hold the current • guessed letters (e.g. it would start with '_', '_', '_' and end with 'F', 'O', 'X').
• Write a function called guessLetter that will:
• Take one argument, the guessed letter.
• Iterate through the word letters and see if the guessed letter is in there.
• If the guessed letter matches a word letter, changed the guessed letters array to reflect that.
• When it's done iterating, it should log the current guessed letters ('F__') and congratulate the user if they • found a new letter.
• It should also figure out if there are any more letters that need to be guessed, and if not, it should • congratulate the user for winning the game.
• Pretend you don't know the word, and call guessLetter multiple times with various letters to check that your program works.
*/

const secretWord = [ 'F', 'O', 'X', 'X' ];
const guessedLetters = [ '_', '_', '_', '_' ];

let correctGuesses = 0;

const guessLetter = function( letterGuess ){


  letterGuess = letterGuess.toUpperCase();

  console.log(`guessLetter('${ letterGuess }')`);

  let found = false;

  // 1) Iterate through the secret word letters
  for( let i = 0; i < secretWord.length; i++ ){

    const currentLetter = secretWord[ i ].toUpperCase();

    // 2) 'See if the guessed letter is in there'
    if( letterGuess === currentLetter ){
      console.log(`Correct guess for ${letterGuess} at position ${ i }`);
      // Set our found flag to true - so we can determine after the loop is finished,
      // whether or not we found any matches
      guessedLetters[ i ] = letterGuess;
      found = true;
      correctGuesses++;
    }

  } // for

  console.log(guessedLetters.join(' '));

  // We have to wait until the loop is finished, to
  // check whether we actually found ANY matches during any iteration of the loop
  if( found ){
    console.log('Nice job!');
  } else {
    console.log('Sorry, bad guess!');
  }

  // Check if the game is over
  if( correctGuesses === secretWord.length ){
    console.log('CONGRATULATIONS! YOU WIN!!!');
  }


}; // guessLetter()

// guessLetter('f');
