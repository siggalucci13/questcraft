
'use client';
import React, { useState } from 'react';
import { text } from 'stream/consumers';

function Questionnaire() {
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: 1, text: "What is your favorite color?" },
    { id: 2, text: "What is your hometown?" },
    { id: 3, text: "What is your favorite hobby?" }
  ];

  const handleInputChange = (id, event) => {
    setAnswers({
      ...answers,
      [id]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Answers:', answers);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map(question => (
        <div key={question.id}>
          <label>{question.text}</label>
          <input
            type="text"
            value={answers[question.id] || ''}
            onChange={(e) => handleInputChange(question.id, e)}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Questionnaire;
