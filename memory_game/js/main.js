// Javascript File for Memory Card Game, modified by Mabeth Borres WDI March 2019

// GLOBAL Variables

//initial score values
var score = 0;
var tries = 0;

var maxLevel = 20; //20 default
var minHighScore = 10; //10 default

var playLevel = 0;

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

// K+Q x Suits combinations 
var cards1 = [kingHearts, queenHearts, kingHearts, queenHearts];
var cards2 = [kingHearts, kingHearts, queenHearts, queenHearts];
var cards3 = [queenHearts, queenHearts, kingHearts, kingHearts];
var cards4 = [queenHearts, kingHearts, queenHearts, kingHearts];
var cards5 = [kingHearts, queenHearts, queenHearts, kingHearts];
var cards6 = [queenHearts, kingHearts, kingHearts, queenHearts];

var cards7 = [kingDiamonds, queenDiamonds, kingDiamonds, queenDiamonds];
var cards8 = [kingDiamonds, kingDiamonds, queenDiamonds, queenDiamonds];
var cards9 = [queenDiamonds, queenDiamonds, kingDiamonds, kingDiamonds];
var cards10 = [queenDiamonds, kingDiamonds, queenDiamonds, kingDiamonds];
var cards11 = [kingDiamonds, queenDiamonds, queenDiamonds, kingDiamonds];
var cards12 = [queenDiamonds, kingDiamonds, kingDiamonds, queenDiamonds];

var cards13 = [kingHearts, queenDiamonds, kingHearts, queenDiamonds];
var cards14 = [kingHearts, kingHearts, queenDiamonds, queenDiamonds];
var cards15 = [queenDiamonds, queenDiamonds, kingHearts, kingHearts];
var cards16 = [queenDiamonds, kingHearts, queenDiamonds, kingHearts];
var cards17 = [kingHearts, queenDiamonds, queenDiamonds, kingHearts];
var cards18 = [queenDiamonds, kingHearts, kingHearts, queenDiamonds];

var cards19 = [kingDiamonds, queenHearts, kingDiamonds, queenHearts];
var cards20 = [kingDiamonds, kingDiamonds, queenHearts, queenHearts];
var cards21 = [queenHearts, queenHearts, kingDiamonds, kingDiamonds];
var cards22 = [queenHearts, kingDiamonds, queenHearts, kingDiamonds];
var cards23 = [kingDiamonds, queenHearts, queenHearts, kingDiamonds];
var cards24 = [queenHearts, kingDiamonds, kingDiamonds, queenHearts];

// K+K combinations
var cards25 = [kingHearts, kingDiamonds, kingHearts, kingDiamonds];
var cards26 = [kingHearts, kingHearts, kingDiamonds, kingDiamonds];
var cards27 = [kingDiamonds, kingDiamonds, kingHearts, kingHearts];
var cards28 = [kingDiamonds, kingHearts, kingDiamonds, kingHearts];
var cards29 = [kingHearts, kingDiamonds, kingDiamonds, kingHearts];
var cards30 = [kingDiamonds, kingHearts, kingHearts, kingDiamonds];

// Q+Q combinations
var cards31 = [queenDiamonds, queenHearts, queenDiamonds, queenHearts];
var cards32 = [queenDiamonds, queenDiamonds, queenHearts, queenHearts];
var cards33 = [queenHearts, queenHearts, queenDiamonds, queenDiamonds];
var cards34 = [queenHearts, queenDiamonds, queenHearts, queenDiamonds];
var cards35 = [queenDiamonds, queenHearts, queenHearts, queenDiamonds];
var cards36 = [queenHearts, queenDiamonds, queenDiamonds, queenHearts];

//combinations to be chosen randomly at runtime
var randomChoices = [cards1, cards2, cards3, cards4, cards5, cards6,
	cards7, cards8, cards9, cards10, cards11, cards12,
	cards13, cards14, cards15, cards16, cards17, cards18,
	cards19, cards20, cards21, cards22, cards23, cards24,
	cards25, cards26, cards27, cards28, cards29, cards30,
	cards31, cards32, cards33, cards34, cards35, cards36];

var cards = []; //holds the cards selected randomly

var cardsInPlay = []; //copy of the cards currently being played

var cardIds = []; //store ids for comparison purposes

var matched = true; //check if matched cards
var cardId = 0; //current card id to be compared


// FUNCTIONS

var checkForMatch = function(){
	if(cardsInPlay[0]===cardsInPlay[1] || (cardsInPlay.length===4 && (cardsInPlay[2]===cardsInPlay[3])) ) {
			score++; //increase score
			//console.log("Score=" + score); //debug
			alert("You found a match! That's 1 point.");

			//realtime
			document.getElementById("button3").innerHTML = "Check Status, Score[" + score + "]";
		} else {
			tries++; //unmatched turn
			alert("Sorry, TRY Again. TIP: Remember the cards' position.");
			return false;
		}

	return true;
};

var levelUp = function(){
	var level = 1;
	var msg = "";

	if(score%minHighScore===0) {
		level = level * (score/minHighScore);
		msg = "Congratulations!!! You've just unlocked Level [" + level + "].";
		
		//console.log("level [" + level + "], maxLevel [" + maxLevel + "]");
		if (level <= maxLevel) {
			var newBackgroundImage = "url('images/level" + level + ".png')";
			//console.log("newBackgroundImage=" + newBackgroundImage); //debug
			document.body.style.backgroundImage = newBackgroundImage;
		}
		
		// add Text only once
		if (level==1) {
			var gameinfo = document.getElementById("gameinfo");
			var oldText = gameinfo.innerHTML;
			//console.log("gameinfo=" + gameinfo);
			var addText = "<br><br>If you love this background, score higher to the next level to see the next surprise. ";
			gameinfo.innerHTML = oldText + addText;
		}
		
		if (playLevel < level) playLevel = level;

		var audio = new Audio("images/applause.mp3");
		
		//console.log("playLevel [" + playLevel + "], maxLevel [" + maxLevel + "]");
		//console.log ("playLevel === maxLevel | " + (playLevel === maxLevel));

		if (playLevel === maxLevel) {
			msg = msg.concat("\nWhat a feat! You are the Winner!")
			
			// end game sound 
			audio = new Audio("images/homerun.mp3"); //done with level20
		}
		
		audio.play(); //applause
		alert(msg);
	}
};

var flipCard = function(){ //cardId){

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

		if ( cardsInPlay.length%2===0 ) { //allow 2 or 4 cards, be generous
			//tries++; //incriease tries //if scored turn count as try
			//console.log("Tries=" + tries); //debug

			matched = checkForMatch();
			if (!matched) {
				//allow to replace 2nd card 
				cardsInPlay.pop();
				cardIds.pop();
				
			} else {
				//MATCHED
				//check score if eligible for level unlock
				if (score>=minHighScore) {
					levelUp();
				}
				
				if (playLevel === maxLevel) { // END GAME
				    processEndGame();
				}
			}
		
		}
	}
};

function processEndGame() {
	resetBoard();
	
	var cardElement = document.createElement('img');
	cardElement.setAttribute('src', "images/winner.png");
	
	var divCards = document.getElementById('game-board');
	divCards.appendChild(cardElement);
	
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
		var images = document.body.getElementsByTagName("img");
		
		for ( var m = 0; m < images.length; m++ ) {
			var did = images[m].getAttribute("data-id");
			//console.log(did); //debug

			if (did === cardIds[0]) { //compare to remaining card
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

  	//minHiScore=2&gameLevel=2 //sample
  	if (x.includes("index.html?")) {
  		var customvals = x.split("?")[1];
  		//console.log(customvals); //debug

  		var custvals = [];
  		if (customvals.includes("&")) {
  			custvals = customvals.split("&");
  			//console.log(custvals); //debug

  			if (custvals.length>0) {
  				var minScore = parseInt(custvals[0].split("=")[1]);
  				//console.log(minScore); //debug

  				var gameLevel = parseInt(custvals[1].split("=")[1]);
  				//console.log(gameLevel); //debug

  				if (minScore>0 && minScore!==minHighScore) { //cannot be negative or 0
  					minHighScore = minScore;
  				}

  				if (gameLevel>0 && gameLevel<=maxLevel) { //cannot be less 0 or more than 20
  					maxLevel = gameLevel;
  				}

   			}
  		}
  	}

  	//console.log("Using custom values: minHighScore[" + minHighScore + "], maxLevel[" + maxLevel + "]")

}

var createBoard = function(){

	//setup if custom was called
	getCustom();

	//random selection of cards combination
	var rid = Math.floor(Math.random() * 36);     //returns a random integer from 0 to 35
	//console.log("randomChoice[" + rid + "]"); //debug

	for (var iid = 1; iid < 5; iid++) { //index needed
	//for (var ccard of cards) { //can use this if index not needed
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png"); 
		
		var imgCardId = "imgCardId" + iid;
		cardElement.setAttribute('id', imgCardId);
		cardElement.setAttribute('data-id', iid);
		cardElement.addEventListener('click', flipCard); //listener for flipping to card image
		cardElement.addEventListener('mouseout', backCard); //listener for flip[ping to back face
		var divCards = document.getElementById('game-board');
		divCards.appendChild(cardElement);
		//iid++; //if index not needed

		//setup cards[] from random selection
		var ridd = iid-1;
		cards.push(randomChoices[rid][ridd]); 
		//important to use push, error at runtime (multiple play again) if not
	}
};

createBoard();

function showScore() {
	var msg = "Score is [" + score + "] with [" + tries + "] wrong move" + (tries>1 ? "s." : ".") ;

	if (score>0) {
		if (score>tries) { msg = msg.concat("\nGood Job! Now, go score some more..."); }
		else if (tries>score) { msg = msg.concat("\nWhat happened, mate? Level up!"); }
		else { msg = msg.concat("\nNot bad, but you can do better. Eh?"); }

		if (playLevel>0) {
			msg = msg.concat("\n\nLevel Unlocked [" + playLevel + "]");
		}
	} else {
		msg = msg.concat("\nYour turn, mate! Game face on now...");
	}

	var points = (playLevel+1)*minHighScore - score;
	msg = msg.concat("\n\nTIP: Score " + points + " point" + (points>1 ? "s" : "") + " to unlock Level " + (playLevel+1) + ".");

	alert(msg);
}

function playAgain() { //without reloading to allw to accumulate a higher score
	resetBoard(); //clear board and cards storage
	createBoard(); //setup board
}

function resetBoard() { //reset board, cards storage

	var images = document.body.getElementsByTagName("img");
	//console.log("images" + images); //debug

	//clear the card images display to allow for new combination
	if (images.length>0) {
		var pNode = images[0].parentNode;

		for (var iid = 1; iid < 5; iid++) {
			var imgCardId = "imgCardId" + iid;
			var elem = document.getElementById(imgCardId);
			var pNode = elem.parentNode;
			//console.log(elem); //debug
			pNode.removeChild(elem);
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
	location.reload(); //restart game, score back to zero
}

