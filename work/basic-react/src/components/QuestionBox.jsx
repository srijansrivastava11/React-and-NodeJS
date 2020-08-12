import React, {useState} from "react";

const QuestionBox = ({question, options, selected,buttonState,correct,nextQuestion, selectedAnswer}) => {
  const [answer, setAnswer] = useState(options);

  return (
    <div className="questionBox">
      <div className="question">{question}</div>
      {answer.map((text, index) => (
        <button
          key={index}
          className={ ((correct === text && buttonState !== null) ? 'correctAnswer disabled' : (selectedAnswer === text && buttonState !== null ? 'wrongAnswer' : 'answerBtn'))}
          disabled={buttonState !== null}
          onClick={() => {
            selected(text);
          }}
        >
          {text}
        </button>
      ))}
      <div className="nextButtonDiv">
        <button className="nextBtn" onClick={nextQuestion}>
          Next Question
        </button>
      </div>
    </div>
  );
};





export default QuestionBox;
