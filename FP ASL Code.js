	// This Class is not integrated with code. Ran out of time.
class wordStatus {
	constructor(word){
	  this.word = word;
	  this.trys = 0;
  	this.numLetters = 0;
  }
	
		// updates the number of guessed attempts by user
	set wordUpdate(x) {
    this.trys += x;
	}
	
		// logs the number to letters the word has
	set countLetters(y) {
		this.numLetters =+ y;
	}
	
    // displays the words info; no. of letters and no. of attempts
	get wordInfo() {
			let node;
			let para = document.createElement("li");
			node = document.createTextNode(this.word + " No. of letters: " + this.numLetters + " No. of trys: " + this.trys);
			para.appendChild(node);		
			let element = document.getElementById("output");
			element.appendChild(para);
		
	}
}

// functions for the html buttons  ---------------------------------------

	// registers the "Add" button
function registerAddButton() {
	document.getElementById("btnAdd").addEventListener("click", wordProcess);
}
	// registers the "Start" button
function registerStartButton() {
	document.getElementById("start").addEventListener("click", startQuiz);
}
	// registers the "Reset" button
function registerResetButton() {
	document.getElementById("reset").addEventListener("click", resetPage);
}
	// registers the "Submit" button
function registerSubmitButton() {
	document.getElementById("submit").addEventListener("click", submitAnswer);
}
	// registers the "Replay" button
function registerReplayWordButton() {
	document.getElementById("replay").addEventListener("click", replayWord);
}

	// registers the "Next" button
function registerContinueButton() {
	document.getElementById("continue").addEventListener("click", nextWord);
}

// functions used by the register functions  ----------------------------------

	// activates the functions for the user input field and word listing
function wordProcess() {
	clearOutput();
	addWord();
	wordList();
	clearInput();
}
	// used to start the quiz
function startQuiz() {
	if (startingWords.length == 0) {
		clearOutput();
		let node;
		let para = document.createElement("li");
		node = document.createTextNode("You have not submitted any words.  Add some words, then 	press Start again.");
		para.appendChild(node);		
		let element = document.getElementById("output");
		element.appendChild(para);
	} else {
		randomWords = startingWords
		clearInput();
		clearOutput();
		getRandomWord();
		wordChecker();
	}
}
	// resets the whole page along with the startingWords array
function resetPage() {
	location.reload();
}
	// Compares users answer to the random word, gives message if correct or wrong.
function submitAnswer() {
	clearInput();
	clearOutput();
	retrieveSubmittedAnswer();
	userSubmitedAnswer();
}
	// replays the current random word
function replayWord() {
	clearInput();
	clearOutput();
	wordChecker();
}

	// removes the current random word and selects a new one
function nextWord() {
	clearInput();
	clearOutput();
	removingUsedWord();
	if (randomWords.length <= 0) {
		noMoreWords();
	} else {
		getRandomWord();
		wordChecker();
	}
}

// the functions used by the functions  --------------------------------------

function getRandomWord() {
	wordString = wordRandomizer();
	lowerCaseRandomWord = wordString.toLowerCase();
}

	// removes the random word from the array so it is only used once.
function removingUsedWord() {
	let tempWords = randomWords;
	for (let r = 0; r < tempWords.length; r++) {
		if (tempWords[r] == lowerCaseRandomWord) {
			tempWords.splice(r, 1);
			break;
		} else {
			//randomWords = tempWords[r];
		}
	}
}

function noMoreWords() {
	let node;
	let para = document.createElement("li");
	node = document.createTextNode("You have guessed all words.");
	para.appendChild(node);		
	let element = document.getElementById("output");
	element.appendChild(para);
}

	// retrieves the users answer from the field and saves to userAnswer variable
function retrieveSubmittedAnswer() {
	userAnswer = document.getElementById("userAnswer").value;
	return userAnswer;
}

	// takes the user answer and compares to the random word to determine
	// 		if it right or wrong.
function userSubmitedAnswer() {
	let node;
	let lowerCaseAnswer = userAnswer.toLowerCase();
	let para = document.createElement("li");
	if (lowerCaseRandomWord === lowerCaseAnswer) {
		node = document.createTextNode(correctAnswer1 + wordString + correctAnswer2);
	} else {
		node = document.createTextNode(wrongAnswer);
	}
	para.appendChild(node);		
	let element = document.getElementById("output");
	element.appendChild(para);
}

	// adds the users word to the "startingWords" array
function addWord() {
	startingWords[w] = document.getElementById("word").value;
	w++;
}
	// displays all words that have thus far been entered by the user
function wordList() {
	let word;
	for (let i = 0; i < startingWords.length; i++) {
		word = startingWords[i];
		let para = document.createElement("li");
		let node = document.createTextNode(word);
		para.appendChild(node);		
		let element = document.getElementById("output");
		element.appendChild(para);
	}
}
	// the timeout function delays the breaks down of the random word
	//		and passes it to the letterDisplay function
function wordChecker() {
	setTimeout(function () {
		clearOutput();
		letter = lowerCaseRandomWord.charAt(k);
		letterDisplay();
		k++;
		if (k < lowerCaseRandomWord.length) {
			wordChecker();
		} else
			k = 0;
	}, 1000)
}
	// Randomly picks a word from the array
function wordRandomizer() {
	return randomWords[Math.floor(Math.random()*randomWords.length)];
}
	// as the "wordChecker" function breaks down the word, this function 
	//		displays the apropriate letter image.
function letterDisplay() {
		let pic = document.createElement("IMG");
		pic.setAttribute("src", "AtoZ ASL/"+letter+".png");
		let node = document.createTextNode(letter);
		pic.appendChild(node);		
		let element = document.getElementById("output");
		element.appendChild(pic);
}

	// var used as a counter for the addWord function
let w = 0;
	// var used as a count for the wordChecker function
let i = 0;

let k = 0;
	// array used to store words entered by the user and possibly used to store user attempts as a 2d array
let startingWords = [];
	// array to be used to store the remaining words to be randomly selected.
let randomWords = [];

let wordString;
let lowerCaseRandomWord;
let letter;
let userAnswer;
let correctAnswer1 = "You are correct!!  \"";
let correctAnswer2 = "\" is the right answer!! Press the Continue button to move onto the next word.";
let wrongAnswer = "Incorrect! Press the Replay button to have the word handspelled again.";

// only once randomizer


// Get words from user. 
// User starts quiz
// Randomly pick a word and spell out each letter.
// User types in word they think is correct.
// If right user procceds to next word until they are finished with all words.
// If wrong they replay.
// They win, get congratulation, and score based on amount of trys. 
