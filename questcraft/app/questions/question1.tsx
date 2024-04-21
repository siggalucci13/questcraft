import React, { useState } from 'react';
import { useAnswer } from './AnswerContext';
import { useHistory } from 'react-router-dom';

const QuestionPage: React.FC = () => {
  const { setAnswers } = useAnswer();
  const history = useHistory();

  const [formData, setFormData] = useState({
    question1: '',
    question2: '',
    question3: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAnswers(formData);
    history.push('/answer');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Please answer the following questions:</h1>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>{`What is your favorite ${key.split('question')[1]}?`}</label>
          <input
            name={key}
            type="text"
            value={formData[key]}
            onChange={handleInputChange}
            placeholder="Type your answer here..."
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionPage;
