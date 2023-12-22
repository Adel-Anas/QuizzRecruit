import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { fullStack } from "../Utilities/fullStack";
import FullStackPic from "../Images/full-stack-development-by-weblineindia.jpg";

const FullStack = () => {
  const [questions, setQuestions] = useState(fullStack);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResult, setQuizResult] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [FullscreenPermission, setFullScreenPermission] = useState(true);
  const [launchQuizz, setLaunchQuizz] = useState(false);
  const [timer, setTimer] = useState(500);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const Navigate = useNavigate();

  const handleCheckboxChange = (optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].userAnswer =
      updatedQuestions[currentQuestionIndex].options[optionIndex];
    setQuestions(updatedQuestions);
  };

  const handleNextButtonClick = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.userAnswer === currentQuestion.correctAnswer) {
      setQuizResult(quizResult + 1);
    }

    // Move to the next question or submit the quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizSubmitted(true);
      setQuizCompleted(true);
      exitFullscreen();
    }
  };

  const closeResult = () =>{
    setQuizCompleted(false)
    setQuizResult(false)
    Navigate('/')
  }

  const requestFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    setFullScreenPermission(false);
    setLaunchQuizz(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  useEffect(() => {
    let interval;

    if (launchQuizz && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      setQuizCompleted(true);
      exitFullscreen();
      clearInterval(interval); // Stop the interval
    }

    return () => {
      clearInterval(interval);
    };
  }, [launchQuizz, timer]);

  return (
    <>
      {FullscreenPermission && (
        <div className="quizz-container">
          <div className="Quizz-Title">
            <img src={FullStackPic} alt="" />
            <h1>
              The Full-Stack Quiz is a 10-question test on Full-Stack web
              development. Participants have 10 minutes to answer
              multiple-choice questions covering HTML, CSS, JavaScript, and
              related frameworks. The quiz uses a fullscreen mode for an
              immersive experience. Results are shown upon completion or when
              the timer ends.
            </h1>
            <div>
            <button className="cta" onClick={requestFullScreen}>
                <span>Start Quizz</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      {launchQuizz && (
        <div className="Front-body-container">
          <p className="questions-counter">
            Question {currentQuestionIndex + 1}/{questions.length}
          </p>
          <div className="question-border">
            <p>{questions[currentQuestionIndex].question}</p>
          </div>
          <div className="timer">
            <p>
              <span>Time left :</span>{" "}
              {String(Math.floor(timer / 60)).padStart(2, "0")}:
              {String(timer % 60).padStart(2, "0")}
            </p>
          </div>
          <ul className="ul-responses">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <p key={index}>
                <input
                  type="checkbox"
                  id={`option-${index}`}
                  checked={
                    questions[currentQuestionIndex].userAnswer === option
                  }
                  onChange={() => handleCheckboxChange(index)}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </p>
            ))}
          </ul>
          <button onClick={handleNextButtonClick} className="button" disabled={quizCompleted}>
            <span  className='button-content'>{currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}</span>
          </button>
          {quizCompleted && (
            <div className="result-container">
            <div class="results-summary-container"  onClick={closeResult}>
              <div class="confetti">
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
                <div class="confetti-piece"></div>
              </div>
              <div class="results-summary-container__result">
                <div class="heading-tertiary">Your Result</div>
                <div class="result-box">
                  <div class="heading-primary">{quizResult}</div>
                  <p class="result">of 10</p>
                </div>
                <div class="summary__cta">
                  <button class="btn btn__continue" onClick={closeResult}>Continue</button>
                </div>
              </div>
            </div>
          </div>

          )}
        </div>
      )}
    </>
  );
};

export default FullStack;
