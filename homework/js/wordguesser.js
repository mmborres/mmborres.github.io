/*You'll create a simple word guessing game where the user gets infinite tries to guess the word
(like Hangman without the hangman, or like Wheel of Fortune without the wheel and fortune).

Create two global arrays: one to hold the letters of the word (e.g. 'F', 'O', 'X'),
and one to hold the current guessed letters (e.g. it would start with '_', '_', '_'
and end with 'F', 'O', 'X').
Write a function called guessLetter that will:
Take one argument, the guessed letter.
Iterate through the word letters and see if the guessed letter is in there.
If the guessed letter matches a word letter, changed the guessed letters array
to reflect that.
When it's done iterating, it should log the current guessed letters ('F__') and
congratulate the user if they found a new letter.
It should also figure out if there are any more letters that need to be guessed,
and if not, it should congratulate the user for winning the game.
Pretend you don't know the word, and call guessLetter multiple times with various
letters to check that your program works.


///
Start with a reward amount of $0
Every time a letter is guessed, generate a random amount and reward the user
if they found a letter (multiplying the reward if multiple letters found),
otherwise subtract from their reward.
When they guess the word, log their final reward amount.

////
Keep track of all the guessed letters (right and wrong) and only
let the user guess a letter once. If they guess a letter twice, do nothing.
Keep track of the state of the hangman as a number (starting at 0),
and subtract or add to that number every time they make a wrong guess.
Once the number reaches 6 (a reasonable number of body parts for a hangman),
inform the user that they lost and show a hangman on the log.
*/

// Global arrays
const wordsDeck = ["Awkward", "Bungler", "Croquet",
"Dwarves", "Fervid","Fishhook", "Memento", "Mystify",
"Oxygen", "Pajama", "Phlegm", "Gazebo", "Hyphen", "Zealous",
"Zigzag"];

let wordToGuess = ""; //contains the selected random word
let guessedLetters = []; //letters guessed by the wordguesser
let guessedCorrectLetters = [];

const handleInputWord = function() {
  let word = document.getElementById("guessWordValue").value;
  //console.log("Input by user: " + word);
  if (word!=="") {
    //ignore empty
    word = word.toUpperCase();
    if (word===wordToGuess) {
      //console.log("equal");
      processEndGame();
      //fill up the whole board
      fillUpBoard();
    } else {
      //greet
      alert("Sorry, wrong answer.")
    }
  }
}

const handleInputLetter = function() {
    let letter = document.getElementById("guessValue").value;
    //console.log("letter===" + letter);

    if (letter!=="") {
      letter = letter.toUpperCase(); //standardize handle case
      //console.log("letter===" + letter);
      guessLetter(letter);
    }
};

const guessLetter = function(str) { //pass the letter
  if (wordToGuess.includes(str)) {
    if (!guessedCorrectLetters.includes(str)) { //not repeat
      // found
      guessedCorrectLetters.push(str);
      alert("Congratulations! Letter " + str + " is there!");
      //console.log(`Found letter ${str}`); //will show letter on screen
      showLetter(str);

      //end game?

      //console.log("===");
      //console.log(wordToGuess.length);
      //console.log(guessedCorrectLetters.length);

      if (checkIfWordComplete()===true) {
        //next level
        processEndGame();
      }

    } else {
      alert("You've guessed Letter " + str + " already!");
    }

  } else {
    // failed try
    if (!guessedLetters.includes(str)) {
      alert("Sorry, NO Letter " + str + ". Try again.");
      guessedLetters.push(str);
    } else {
      alert("Sorry, you already guessed Letter " + str + ". Try again.");
    }
  }
};

const processEndGame = function() {
  alert("Congratulations! Word complete!");
  //console.log("end game");
  document.getElementById("guessValue").value = "";
  document.getElementById("guessValue").disabled = true;
  document.getElementById("guessWordValue").value = "";
  document.getElementById("guessWordValue").disabled = true;
}; 


const checkIfWordComplete = function () {
   const answeredletters = document.getElementsByClassName("answeredword");
   //console.log(answeredletters);
   if (answeredletters.length===wordToGuess.length) {
     return true;
   }
   return false;
};

const fillUpBoard = function() {

for (let i = 1; i <= wordToGuess.length; i++) {
    
      let idb = "guess" + i;

      let boxElement = document.createElement('span');
      boxElement.setAttribute('class', "answeredword");
      boxElement.setAttribute('id', idb);

      let elemOld = document.getElementById(idb);
      //console.log(elemOld)

      //parent
      document.getElementById('gameboard').replaceChild(boxElement, elemOld);

      document.getElementById(idb).innerHTML = wordToGuess.charAt(i-1);
    
  }
};

const showLetter = function(str) {
  //const ind = wordToGuess.indexOf(str);
  //console.log("indexOf = " + ind);

  for (let i = 1; i <= wordToGuess.length; i++) {
    //console.log(wordToGuess.charAt(i-1));
    //console.log(wordToGuess[i]);
    //console.log(str===wordToGuess.charAt(i));

    if (str===wordToGuess.charAt(i-1)) {
      //console.log("here");
      let idb = "guess" + i;

      let boxElement = document.createElement('span');
      boxElement.setAttribute('class', "answeredword");
      boxElement.setAttribute('id', idb);

      let elemOld = document.getElementById(idb);
      //console.log(elemOld)

      //parent
      document.getElementById('gameboard').replaceChild(boxElement, elemOld);

      document.getElementById(idb).innerHTML = str;
    }
  }

};

const clearStorage = function () {
  //should be clean
  wordToGuess = ""; //contains the selected random word
  guessedLetters = []; //letters guessed by the wordguesser
  guessedCorrectLetters = [];
};

const setUpWord = function() {
  clearStorage();

  //setup word
  //random
  const indRandom = Math.floor(Math.random() * wordsDeck.length);
  wordToGuess = wordsDeck[indRandom].toUpperCase();

  console.log(wordToGuess);
  //console.log(wordToGuess.length)

  for (let i = 1; i <= wordToGuess.length; i++) {
    //setup game gameboard

    //<span class="guessword" id="guess5">X</span>

    let boxElement = document.createElement('span');
    boxElement.setAttribute('class', "guessword");
    let idb = "guess" + i;
    boxElement.setAttribute('id', idb);

    document.getElementById('gameboard').appendChild(boxElement);
    document.getElementById(idb).innerHTML = "X";

  }

};

setUpWord();
