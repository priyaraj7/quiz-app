import React, { useState, useEffect } from "react";
import QuizBox from "./components/QuizBox";

import "./App.css";

function App() {
  //data is api
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState({}); // these are the answers selected by user
  // for getting one question on page
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // the index of question that is currently shown on screen. -1 is undefined means (initial/currentQuestion is empty)
  const [score, setScore] = useState(-1);

  //Effect callbacks are synchronous to prevent race conditions. Put the async function inside:
  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await MyAPI.getData(someId);
  //     // ...
  //   }
  //   fetchData();
  // }, [someId]); // Or [] if effect doesn't need props or state

  useEffect(() => {
    const fn = async () => {
      const request = await fetch("/api");
      const result = await request.json();
      setData(result);
      setAnswers({}); // reset the user answers
      setCurrentQuestionIndex(0); // show the first question by setting index top 0
      setScore(-1); // reset the score
    };
    fn();
  }, []);

  const handleNextQuestionClick = () => {
    if (currentQuestionIndex !== -1 || currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestionClick = () => {
    if (currentQuestionIndex !== -1 || currentQuestionIndex > 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const setAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: answer,
    });
  };

  const verifyAnswers = () => {
    const newScore = data.reduce(
      (score, question, idx) =>
        question.correct === answers[idx] ? score + 1 : score,
      0
    );
    setScore(newScore);
  };

  //for showing submit button
  const allQuestionsAnswered = Object.keys(answers).length === data.length; // when all the questions are answered the number of answer will be equal to number of question

  return (
    <div className="App">
      <div className="header">QUIZ APP</div>
      {currentQuestionIndex > -1 && data.length > 0 ? (
        <>
          <div className="status">
            {Object.keys(answers).length} of {data.length} answered
          </div>
          <QuizBox
            question={data[currentQuestionIndex]}
            setAnswer={setAnswer}
            reviewMode={score !== -1}
            selectedAnswer={answers[currentQuestionIndex]}
          />
          <button
            disabled={currentQuestionIndex === 0 ? true : false}
            onClick={handlePrevQuestionClick}
          >
            Prev
          </button>
          <button
            disabled={currentQuestionIndex === data.length - 1 ? true : false}
            onClick={handleNextQuestionClick}
          >
            Next
          </button>

          {allQuestionsAnswered && score === -1 ? (
            <button onClick={verifyAnswers}>Submit</button>
          ) : null}
          {score !== -1 ? (
            <div className="score">Your score is {score}</div>
          ) : null}
        </>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
}

export default App;
