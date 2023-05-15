import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "rc-progress";
import { v4 as uuidv4 } from "uuid";
import Finalokay from "../components/Finalokay/Finalokay";
import NavBar from "../components/NavBar/NavBar";

function Questions() {
  //use sessions storage for level
  const [questions, setQuestions] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [_level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answerSelected, setAnswerSelected] = useState(true);
  const [answerCorrect, setAnswerCorrect] = useState(false);

  const REACT_APP_API_SERVER_URL = process.env.REACT_APP_API_SERVER_URL;

  const getQuestions = () => {
    axios
      .get(`${REACT_APP_API_SERVER_URL}gameQuestions`)
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((err) => console.log(err));
  };

  //get level by seeing if the current questions is divisble by 3
  const getLevel = () => {
    if ((currentQuestion + 1) / 3) {
      setLevel((currentQuestion + 1) / 3);
    }
  };

  //function to hand the answer one clicked
  const handleAnswerOptionClick = (isCorrect, points) => {
    //set answer selected to true
    setAnswerSelected(true);

    //answerSeleted isCorrect within the options
    if (answerSelected === isCorrect) {
      //set answerCorrect to true for color
      setAnswerCorrect(true);
      //add points within that answer to score
      setScore(score + points);
      console.log(isCorrect, answerCorrect, answerSelected, points);

      //else the score stays the same and the answerCorrect state is false
    } else {
      //score stays the same since answer selected is wrong
      setScore(score);
      //setTimeout(() => setAnswerCorrect(false), 300);
      //setAnswerSelected(false);
      console.log(isCorrect, answerCorrect, answerSelected, points);
    }

    //varaible for the nextQuestion
    const nextQuestion = currentQuestion + 1;
    //for if I want to add a timer for each question, which is a future idea
    if (nextQuestion < questions.length) {
      setTimeout(() => setCurrentQuestion(nextQuestion), 300);
      setTimeout(() => setAnswerCorrect(false), 300);
      setTimeout(() => setAnswerSelected(false), 300);
    } else {
      setTimeout(() => setShowScore(true), 300);
    }
  };

  useEffect(() => {
    getQuestions();
    getLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [answerSelected]);

  return (
    <div className="page">
      <NavBar />
      {showScore ? (
        score <= 75 ? (
          <Finalokay
            score={score}
            text={
              "It means that the robots are okay but could use another update. Try the game again."
            }
          />
        ) : score <= 120 ? (
          <Finalokay
            score={score}
            text={"It means the robots still need help. Try the game again."}
          />
        ) : (
          <Finalokay
            score={score}
            text={
              "It means that the robots are well educated and you saved Mother Earth!"
            }
          />
        )
      ) : (
        <div className="page">
          <div className="questions__progressBar">
            <Line
              percent={((currentQuestion + 1) / questions.length) * 100}
              strokeWidth={4}
              strokeColor="#379683"
            />
          </div>
          <div className="questions__div">
            <div className="questions__text">
              {questions && questions[currentQuestion].question}
            </div>
            <div className="questions__answers">
              {questions &&
                questions[currentQuestion].answerOptions.map((answerOption) => (
                  <button
                    key={uuidv4()}
                    onClick={() =>
                      handleAnswerOptionClick(
                        answerOption.isCorrect,
                        answerOption.points
                      )
                    }
                    className={
                      answerOption.isCorrect && answerCorrect && answerSelected
                        ? "questions__btn--correct"
                        : !answerOption.isCorrect &&
                          !answerCorrect &&
                          answerSelected
                        ? "questions__btn--wrong"
                        : "questions__btn"
                    }
                  >
                    {answerOption.answer}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Questions;
