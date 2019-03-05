// Javascript File for Memory Card Game, modified by Mabeth Borres WDI March 2019

// GLOBAL Variables

//initial score values
var score = 0;
var wrongMoves = 0;

var maxLevel = 5; //5 default

var playLevel = 1;

var cardsrow = 4;

var showAlerts = true; //default

//Card object
function Card(suit, rank, cardImage){
	this.suit = suit;
	this.rank = rank;
	this.cardImage = cardImage;
	this.altText = rank + " of " + suit;
}

//available KINGs
var kingHearts = new Card("Hearts", "King", "images/king-of-hearts.png");
var kingDiamonds = new Card("Diamonds", "King", "images/king-of-diamonds.png");
//available QUEENs
var queenHearts = new Card("Hearts", "Queen", "images/queen-of-hearts.png");
var queenDiamonds = new Card("Diamonds", "Queen", "images/queen-of-diamonds.png");

// There are 4 unique cards 
// Matched cards example: kingHearts is paired with kingHearts
// Meaning only 2 cards are generated per row, and placed twice each on random slots

var allCards = [kingHearts, kingDiamonds, queenHearts, queenDiamonds];

var cards = []; //holds the cards selected randomly

var cardsInPlay = []; //copy of the cards currently being played

var cardIds = []; //store ids for comparison purposes

var matched = true; //check if matched cards
var cardId = 0; //current card id to be compared


// FUNCTIONS

var checkForMatch = function(){
	var cid = cardsInPlay.length - 1;
	if( cardsInPlay[cid]===cardsInPlay[cid-1]  ) {
			score++; //increase score
			//console.log("Score=" + score); //debug
			if (showAlerts) alert("You found a match!");

		} else {
			wrongMoves++; //unmatched turn
			if (showAlerts) alert("Sorry, TRY Again. TIP: Remember the cards' position.");
			return false;
		}

	return true;
};

var levelUp = function(){
	var level = playLevel;
	var msg = "Congratulations!!! You've just unlocked Level [" + level + "].";
		
	//console.log("level [" + level + "], maxLevel [" + maxLevel + "]");
	if (level <= maxLevel) {
		var newBackgroundImage = "url('images/level" + level + ".png')";
		//console.log("newBackgroundImage=" + newBackgroundImage); //debug
		document.body.style.backgroundImage = newBackgroundImage;
	}
		
	var audio = new Audio("images/applause.mp3");
		
	//console.log("playLevel [" + playLevel + "], maxLevel [" + maxLevel + "]");
	//console.log ("playLevel === maxLevel | " + (playLevel === maxLevel));

	if (playLevel === maxLevel) {
		msg = msg.concat("\nWhat a feat! You are the Winner!")
			
		// end game sound 
		audio = new Audio("images/homerun.mp3"); //done with max level
	}
		
	audio.play(); //applause
	if (showAlerts) alert(msg);

	playLevel++;

	if (playLevel<=maxLevel) {
		resetBoard();
		createBoard();
	}
	
};

var flipCard = function(){ 

	cardId = this.getAttribute('data-id') - 1;

	var repeat = false;

	//check if this is a repeat card or card that's already opened
	if (cardIds.length>0) {
		var cid = this.getAttribute('data-id');
		//console.log("cid =" + cid); //debug
		for (var dd = 0; dd < cardIds.length; dd++) {
			//console.log("cardIds[dd] =" + cardIds[dd]); //debug
			//console.log("cid===cardIds[dd]=" + cid===cardIds[dd]); //debug
			if ( cid===cardIds[dd] ) {
				repeat = true;
				break;
			}
		}
	}

	if (!repeat) { //does not allow to click same, like an already opened card
		repeat = false; 

		this.setAttribute('src', cards[cardId].cardImage);
		this.setAttribute('alt', cards[cardId].altText); //add alt text
		
		var cardFlipped = cards[cardId];
		//console.log("User flipped " + cards[cardId].rank + " of " + cards[cardId].suit); //debug
		//console.log(cardFlipped.cardImage); //debug

		cardsInPlay.push(cards[cardId]); //store card object
		cardIds.push(this.getAttribute('data-id')); //store card ids to check no-repeats
		//console.log(cardIds); //debug

		if ( cardsInPlay.length%2===0 ) { //allow cards IN PAIRS

			matched = checkForMatch();
			if (!matched) {
				//allow to replace 2nd card 
				cardsInPlay.pop();
				cardIds.pop();
				
			} else {
				//MATCHED

				if (cardsInPlay.length === ((playLevel+1)*cardsrow) ) {
					//console.log("next level");
					levelUp();
				}
				
				if (playLevel > maxLevel) { // END GAME
				    processEndGame();
				}
			}
		
		}
	}
};

function processEndGame() {
	resetBoard();
	
	var divCards = document.getElementById('game-board');

	var divrow = document.createElement('div');
	divrow.setAttribute('id', "cardsrow");
	divrow.setAttribute('class', "gameboard");

	var cardElement = document.createElement('img');
	cardElement.setAttribute('src', "images/winner.png");
	
	divrow.appendChild(cardElement);

	divCards.appendChild(divrow);
	
	//leave reset button
	
	var pbuttons = document.getElementById("buttons"); //parent
	
	if (pbuttons.hasChildNodes) {
		for (var c=1; c<5; c++) //except 5
		{
			var idb = "button" + c;
			var nd = document.getElementById(idb);
			pbuttons.removeChild(nd);
		}
	}

	document.getElementById("button5").innerHTML = "Restart Game?";
}

function sleep( millisecondsToWait ) //allow to delay flipping card to back face
{
	var now = new Date().getTime();
	while ( new Date().getTime() < now + millisecondsToWait )
	{
		/* do nothing; this will exit once it reaches the time limit */
	}
}

var backCard = function(){
	
	if (!matched) { //if cards don't match
		sleep(800); //delay
		this.setAttribute('src', "images/back.png"); //latest card
		matched = true; //reset

		//flip remaining card to back face
		//get all images in the document
		var images = document.body.getElementsByClassName("boardimgs");
		//console.log("cards in play = " + cardsInPlay);
		//console.log(images);
		//console.log("cardIds = " + cardIds);

		var cid = cardsInPlay.length - 1;
		//console.log("last card = " + cardIds[cid]);

		for ( var m = 0; m < images.length; m++ ) {
			var did = images[m].getAttribute("data-id");
			//console.log(did); //debug

			if (did === cardIds[cid]) { //compare to remaining card
				images[m].setAttribute('src', "images/back.png"); 
				cardsInPlay.pop(); //allow reset
				cardIds.pop(); //allow reset
				break;
			}
		}
	}
};

function getCustom(){
	var x = window.location.href;
	//console.log("form: " + x); //debug

  	if (x.includes("index.html?")) {
  		var customvals = x.split("?")[1];
  		//console.log(customvals); //debug

  		if (customvals.includes("=")) {
  			var gameLevel = parseInt(customvals.split("=")[1]);
			//console.log(gameLevel); //debug

			if ( gameLevel>=1 && gameLevel<=5 ) {
				// accepted
				maxLevel = gameLevel;
			} 
		}
  	}
}

var createBoard = function(){

	//setup if custom was called
	getCustom();

	//console.log("createBoard level = " + playLevel);
	var level = playLevel;

	//random selection of cards combination
	var levelArray = new Array(level+1); 
	var innerArray = new Array(cardsrow);

	// using truly random logic
	// logic: for each level, generate random row containing 2 cards placed twice each on a row at random
	
	for (var ii = 1; ii <= (level+1); ii++) {
		
		innerArray = []; //empty the array
		
		/// PART 1 
		/// 2 cards to use for matching
		
		var rd1 = Math.floor(Math.random() * cardsrow); 

		var rd2 = rd1;
			// logic: run this loop until values are unique
		do {
			rd2 = Math.floor(Math.random() * cardsrow);
		} while(rd1 === rd2);
			
		/// rd1 is card identity 1
		/// rd2 is card identity 2
		
		console.log("Starting Level " + level + "-------------------------------------------------");
		console.log("Random 2 cards = " + allCards[rd1].altText + ", " + allCards[rd2].altText);
		
		/// PART 2
		/// 4 placements - rd1 gets placed 2x, rd2 gets placed 2x
		/// their placements are determined at random
		
		var ranc1 = Math.floor(Math.random() * cardsrow); 

		var ranc2 = ranc1;
		// same logic
		do {
			ranc2 = Math.floor(Math.random() * cardsrow);
		} while(ranc1 === ranc2);
		
		var ranc3 = ranc2; 
		// same logic
		do {
			ranc3 = Math.floor(Math.random() * cardsrow);
		} while(ranc3 === ranc2 || ranc3 === ranc1);
		
		var ranc4 = ranc3; 
		// same logic
		do {
			ranc4 = Math.floor(Math.random() * cardsrow);
		} while(ranc4 === ranc3 || ranc4 === ranc2 || ranc4 === ranc1);
		

		//// 4 placements
		innerArray[ranc1] = allCards[rd1]; 
		innerArray[ranc2] = allCards[rd1];
		innerArray[ranc3] = allCards[rd2];
		innerArray[ranc4] = allCards[rd2];
			
		console.log("Random placements:");
		console.log("innerArray[" + ranc1 + "] = " + allCards[rd1].altText);
		console.log("innerArray[" + ranc2 + "] = " + allCards[rd1].altText);
		console.log("innerArray[" + ranc3 + "] = " + allCards[rd2].altText);
		console.log("innerArray[" + ranc4 + "] = " + allCards[rd2].altText);
			
		levelArray[ii-1] = innerArray; //setup the array on the row
		
	}
	
	//render board

	var divCards = document.getElementById('game-board');

	for (var l=1; l<=levelArray.length; l++) {
		var divrow = document.createElement('div');
		var rowid = "cardrow" + l
		divrow.setAttribute('id', rowid);
		divrow.setAttribute('class', "gameboard");
		divCards.appendChild(divrow);

		for ( var iid = 1; iid<=cardsrow; iid++) { 
			var cardElement = document.createElement('img');
			cardElement.setAttribute('src', "images/back.png"); 
			
			var imgCardId = "imgCardId" + (l>1 ? iid + cardsrow*(l-1) : iid );
			cardElement.setAttribute('id', imgCardId);
			var imgId = "" + (l>1 ? iid + cardsrow*(l-1) : iid )
			cardElement.setAttribute('data-id', imgId);
			cardElement.setAttribute('class', "boardimgs");
			cardElement.addEventListener('click', flipCard); //listener for flipping to card image
			cardElement.addEventListener('mouseout', backCard); //listener for flipping to back face

			divrow.appendChild(cardElement);

			//setup cards[] from random selection
			cards.push(levelArray[l-1][iid-1]);
			//important to use push, error at runtime (multiple play again) if not
		}

	}

};

createBoard();

function playAgain() { //without reloading 
	resetBoard(); //clear board and cards storage
	createBoard(); //setup board
}

function resetBoard() { //reset board, cards storage

	var images = document.body.getElementsByClassName("boardimgs");
	//console.log("images" + images); //debug

	var len = images.length;
	//clear the card images display to allow for new combination
	if (images.length>0) {
		var pNode = images[0].parentNode;

		for (var iid = 1; iid <= len; iid++) {
			var imgCardId = "imgCardId" + iid;
			var elem = document.getElementById(imgCardId);
			var pNode = elem.parentNode;
			//console.log(elem); //debug
			pNode.removeChild(elem);
		}
	}
	
	var gameboard = document.getElementById("game-board"); //parent

	if (gameboard.hasChildNodes) {
		var divs = gameboard.childNodes;
		var len = divs.length;

		for (var i=0; i< len; i++) {
			var rowid = "cardrow" + (i+1) ;
			var elem = document.getElementById(rowid);
			if (elem!==null) {
				gameboard.removeChild(elem);

			}
		}
	}

	//reset the cards storage
	var ct = 0;

	var len = cards.length;	
	for (ct = len; ct>=0; ct--) {
		cards.pop();
	}

	len = cardsInPlay.length;	
	for (ct = len; ct>=0; ct--) {
		cardsInPlay.pop();
	}

	len = cardIds.length;	
	for (ct = len; ct>=0; ct--) {
		cardIds.pop();
	}

	//console.log(cards); //debug
	//console.log(cardsInPlay); //debug
	//console.log(cardIds); //debug
}

function restartGame() {
	location.reload(); //restart game, everything
}

function updateAlerts() {
	//showAlerts true default
	if (document.getElementById("alertYes").checked === true) {
  		showAlerts = true;
	}
	if (document.getElementById("alertNo").checked === true) {
		showAlerts = false;
  }
}


