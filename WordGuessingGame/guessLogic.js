const guessedWords = [
  // { guessedWord: "tap", correctLetters: 2 }
];
const word = require("./word.js");
const wordsList=word.wordsList;

const validGuess = [];
const selectedWord = [];

const message = [];
let currentIndex = 0;

const guessLogic = {
  assignRandomWords,
  currentIndex,
  guessedWords,
  addWord,
  validGuess,
  selectedWord,
  message,
  refresh
};

function assignRandomWords() {
  for (let i = 0; i < wordsList.length; i++) {
    wordsList[i] = wordsList[i].toUpperCase();
  }
  validGuess.push(0);
  selectedWord.push(wordsList[Math.floor(Math.random() * wordsList.length)]);
  console.log("Selected Word: " + selectedWord[selectedWord.length - 1]);
  message.push("");
}

function addWord(word, index) {
  const uppWord = word.toUpperCase();

  if (!wordsList.includes(uppWord)) {
    message[index] = "The word is not one of the permitted words";
  } else if (uppWord === selectedWord[0]) {
    validGuess[index]++;
    message[index] = "Congratulations! You have guessed the word in " + validGuess[index] + " attempts! You can start a new game now!";
  } else {
    const correctLetter = getLetters(uppWord, selectedWord[0]);
    guessedWords.push({ guessedWord: word, correctLetters: correctLetter });
    validGuess[0]++;
    message[0] = "You are almost there!";
  }
}

function getLetters(uppWord, selectedWord) {
  let result = 0;
  if (uppWord == undefined || selectedWord == undefined) {
    return result;
  }
  const tempArray = [];
  for (let i = 0; i < selectedWord.length; i++) {
    tempArray.push(selectedWord.charAt(i));
  }
  for (let i = 0; i < uppWord.length; i++) {
    if (tempArray.indexOf(uppWord.charAt(i)) >= 0) {
      tempArray.splice(tempArray.indexOf(uppWord.charAt(i)), 1);
      result++;
    }
  }
  return result;
}

function refresh(index) {
  while (guessedWords.length != 0) {
    guessedWords.pop();
  }
  validGuess[index] = 0;
  message[index] = "";
  selectedWord[index] = wordsList[Math.floor(Math.random() * wordsList.length)];
  console.log("selectedWord: " + selectedWord[index]);
}

module.exports = guessLogic;
