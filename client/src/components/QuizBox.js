import React from "react";

const QuizBox = ({ question, setAnswer, selectedAnswer, reviewMode }) => {
  return (
    <div className="quizbox">
      <div className="question">{question.title}</div>
      <div className="choices">
        {question.choices.map((option, idx) => {
          return (
            <label htmlFor={`${question.id}-option-${idx}`} key={idx}>
              <input
                type="radio"
                // for getting unique id
                id={`${question.id}-option-${idx}`}
                name={question.id}
                value={option}
                onClick={(ev) => setAnswer(ev.target.value)}
                checked={option === selectedAnswer}
                readOnly={reviewMode}
              />
              {option}

              {reviewMode && option.trim() === question.correct.trim() ? (
                <span> &#9989;</span> // checkbox emoji symbol
              ) : null}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default QuizBox;
