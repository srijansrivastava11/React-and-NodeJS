const express = require("express");
const app = express();
let gameArray = [];

const PORT = 3000;

let guessLogic = require("./guessLogic");
const words = require("./word");
const guessHtml = require("./guess-html");

app.use(express.static("./public"));

app.post("/refresh", express.urlencoded({ extended: false }), (req, res) => {
  guessLogic.refresh(guessLogic.currentIndex);
  res.redirect("/");
});

app.post("/input", express.urlencoded({ extended: false }), (req, res) => {
  const inputWord = req.body.word;
  guessLogic.addWord(inputWord, guessLogic.currentIndex);
  res.redirect("/?randomID="+req.body.randomID);
});

app.get("/", (req, res) => {
  let randomID = Math.random();
  if(req.query.randomID) {
    randomID = req.query.randomID;
    if(gameArray[randomID]) {
      guessLogic = gameArray[randomID];
    }
    else {
      gameArray[randomID] = Object.assign({}, guessLogic);
    }
    if (guessLogic.selectedWord.length == 0) {
      guessLogic.assignRandomWords();
    }
  }
  else {
    guessLogic.refresh(guessLogic.currentIndex);
  }
  res.send(guessHtml.guessPage(words,guessLogic,randomID));
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
