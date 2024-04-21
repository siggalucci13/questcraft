'use client';
import React, { useState } from 'react';
import styles from './question.css';

function Questionnaire() {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    { id: 1, text: "What is your favorite color?" },
    { id: 2, text: "What is your hometown?" },
    { id: 3, text: "What is your favorite hobby?" }
  ];

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setAnswers({
      ...answers,
      [id]: questions[id].text + " Ans:" + value
    });
  };

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Answers:', answers);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>{questions[currentQuestionIndex].text}</label>
        <input
          type="text"
          id={questions[currentQuestionIndex].id.toString()}
          value={answers[questions[currentQuestionIndex].id] || ''}
          onChange={handleInputChange}
        />
      </div>
      <button className={styles.button_p} type="button" disabled={isFirstQuestion} onClick={handlePrevious}>
        Previous
      </button>
      {isLastQuestion ? (
        <button type="submit">Submit</button>
      ) : (
        <button type="button" onClick={handleNext}>
          Next
        </button>
      )}
    </form>
  );
}

export default Questionnaire;
