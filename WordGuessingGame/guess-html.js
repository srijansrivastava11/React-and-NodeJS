const guessHtml = {
  guessPage: function(words,guessLogic,randomID) {
    return (
      `
        <!DOCTYPE html>
        <html>
          <head>
            <link rel="stylesheet" href="guess.css" />
            <title>Guess the word</title>
          </head>
          <body>
            <div class="top-panel">
              <div class="word-list">
                <h2>Valid words:</h2>
                <p class="valid-words">` +
      words.wordsList
        .map(
          word => `
                                <h3 class="valid-word">${word}</h3>`
        )
        .join("") +
      `</p>
              </div>

            </div>

            <div class="guess-panel">
              <div class="input-panel">
                <p>Please enter a word:</p>
                <form class="input-panel" action="/input" method="POST">
                  <input name="word" class="word" />
                  <input type="hidden" name="randomID" value="${randomID}">
                  <button class="fsSubmitButton" type="submit">Enter</button>
                </form>
                <form action="/refresh" method="POST">
                  <button class="fsSubmitButton" type="submit">Refresh</button>
                </form>
              </div>
              <div class="guess-count">
                <h4>Guess Count: ${
                  guessLogic.validGuess[guessLogic.currentIndex]
                }</h4>
              </div>
            </div>

            <div class="history">
              <h3>Previously guessed words:</h3>
              ` +
      guessLogic.guessedWords
        .map(
          guessedWord => `
                                <span class="valid-word">
                                  <h3>${guessedWord.guessedWord}</h3>
                                  <h3>${guessedWord.correctLetters}</h3>
                                </span>`
        )
        .join("") +
      `
            </div>

            <div class="message-panel">
              <p>${guessLogic.message[guessLogic.currentIndex]}</p>
            </div>
          </body>
        </html>
        `
    );
  }
};

module.exports = guessHtml;
