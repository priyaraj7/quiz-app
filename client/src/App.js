import React, { useState, useEffect } from "react";
import QuizBox from "./components/QuizBox";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(-1);
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
      setCurrentQuestion(-1);
      const request = await fetch("/api");
      const result = await request.json();
      console.log(result);
      setData(result);
      setAnswers({});
      setCurrentQuestion(0);
      setScore(-1);
    };
    fn();
  }, []);

  // handleOptionClick = () => {};
  const handleNextQuestionClick = () => {
    if (currentQuestion !== -1 || currentQuestion < data.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestionClick = () => {
    if (currentQuestion !== -1 || currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const setAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer,
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

  const allQuestionsAnswered = Object.keys(answers).length === data.length;

  return (
    <div className="App">
      <header className="App-header">
        {/* <p>{!data ? "Loading..." : JSON.stringify(data, null, 4)}</p> */}
      </header>
      {currentQuestion > -1 && data.length > 0 ? (
        <>
          <QuizBox
            question={data[currentQuestion]}
            setAnswer={setAnswer}
            reviewMode={score !== -1}
            selectedAnswer={answers[currentQuestion]}
          />
          <button
            disabled={currentQuestion === 0 ? true : false}
            onClick={handlePrevQuestionClick}
          >
            Prev
          </button>
          <button
            disabled={currentQuestion === data.length - 1 ? true : false}
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
