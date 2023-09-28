import React, { useState } from "react";
import { FaStopwatch } from "react-icons/fa";
import { useGetAllQSTQuery } from "../slices/questionsSlice";

const QuestionScreen = () => {

    const {data, isLoading, error } = useGetAllQSTQuery();

    const [hide, setHide] = useState(true);
    const [scoreCount, setScoreCount] = useState(0);
    const [count, setCount] = useState(11);
    const [countDown, setCountDown] = useState("");

    console.log(data);
  const startQuizHandler = () => {
    setHide(false);
  }
  return (
    <div className=" bg-slate-300 questions">
      { !isLoading && (
        <div>
            <div class="start-screen">
        <button id="start-button" onClick={startQuizHandler}>Start</button>
      </div>
      <div id="display-container">
        <div class="header">
          <div class="number-of-count">
            <span class="number-of-question">1 of 3 questions</span>
          </div>
          <div class="timer-div">
            <FaStopwatch />
            <span class="time-left">10s</span>
          </div>
        </div>
        <div id="container">
            { data.map((question, index) => (
              <div>
                <p className=" font-bold">
                { question.questions[0].question}
                </p>
                <div className=" flex items-center shadow-md py-2 px-2 rounded-md">
                  <input type="radio" name={ question.title} id={ question.questions[0].options[0]} />
                  <label htmlFor={ question.questions[0]._id}>{ question.questions[0].options[0]}</label>
                </div>
                <div className=" flex items-center shadow-md py-2 px-2 rounded-md">
                  <input type="radio" name={ question.title} id={ question.questions[0].options[1]} />
                  <label htmlFor={ question.questions[0].options[1]}>{ question.questions[0].options[1]}</label>
                </div>
                <div className=" flex items-center shadow-md py-2 px-2 rounded-md">
                  <input type="radio" name={ question.title} id={ question.questions[0].options[2]} />
                  <label htmlFor={ question.questions[0].options[2]} className=" relative mx-2 py-1">{ question.questions[0].options[2]}</label>
                </div>
                <div className=" flex items-center shadow-md py-2 px-2 rounded-md">
                  <input type="radio" name={ question.title} id={ question.questions[0].options[3]} />
                  <label htmlFor={ question.questions[0].options[3]}>{ question.questions[0].options[3]}</label>
                </div>
              </div>
            ))}
        </div>
        <button id="next-button">Next</button>
      </div>
      <div class="score-container hide">
        <div id="user-score">Demo Score</div>
        <button id="restart">Restart</button>
      </div>
        </div>
      )}
    </div>
  );
};

export default QuestionScreen;
