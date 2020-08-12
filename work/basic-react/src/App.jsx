import React, { useState } from 'react';
import './App.css';
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
import Data from "./data.json";

Data.sort(function() { let randVal=Math.random(); return .1  - randVal});

function App() {
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [counter,setCounter] = useState(0);
  const [number, setNumber] = useState(0);
  const [buttonState, setButtonState] = useState(null);


  const computeAnswer = (answer,correctAnswer) => {
    if(answer === correctAnswer){
      setScore(score+1);
      setButtonState('correctAnswer');
    } else {
      setButtonState('answerBtn');
    }
    setSelectedAnswer(answer);
  };

  const nextQuestion = () => {
     // Move on to the next question
     setButtonState(null);
     const nextQ = number + 1;
     setNumber(nextQ);
     // Increase counter on question multiple of 3 to show/hide the questions div and playAgain functionality
     const count = counter + 1;
    ((nextQ % Data.length)===0) ? setCounter(count) : setCounter(counter);
   };

  const playAgain = () => {
      setScore(0);
      setSelectedAnswer(null);
      //If data length max reached. Sort data again and set number 0
      //Else set question number same to show on next screen
      if(Data.length === number){
        Data.sort(function() { let randVal=Math.random(); return .1  - randVal});
        setNumber(0);
      } else {
        setNumber(number);
      }
      setCounter(0);
  };

  return(

    <div className="container">
      <div className="title">Quiz</div>
      {counter === 0 &&
        Data.slice(number, number + 1).map(({question,answers,correct,questionId}) => {
        return(
          <QuestionBox
                  buttonState={buttonState}
                  correct={correct}
                  question={question}
                  options={answers}
                  key={questionId}
                  nextQuestion={nextQuestion}
                  selectedAnswer={selectedAnswer}
                  selected={(answers) => computeAnswer(answers,correct)}
              />
        )
      })
      }
      { counter !== 0 ?
           (<Result score={score} totalQuestions={Data.length} playAgain={playAgain}/>) : null}
    </div>

  );

}

export default App;
