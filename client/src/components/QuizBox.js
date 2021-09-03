import React from "react";
//import Questions from "./Questions.js.NNN";

const QuizBox = ({ question, setAnswer, selectedAnswer, reviewMode }) => {
  return (
    <div>
      <div className="question">{question.title}</div>
      <div className="choices">
        {question.choices.map((option, idx) => {
          debugger;
          return (
            <label htmlFor={`${question.id}-option-${idx}`}>
              <input
                type="radio"
                // for getting unique id
                id={`${question.id}-option-${idx}`}
                name={question.id}
                value={option}
                onClick={(ev) => setAnswer(ev.target.value)}
                checked={option === selectedAnswer}
                disabled={reviewMode}
              />
              {option}

              {reviewMode && option === question.correct ? (
                <span>&#9989;</span>
              ) : null}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default QuizBox;
