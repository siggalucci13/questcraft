'use client';
import React, { useState } from 'react';
import styles from './question.css';


const questions = [
    { 
        id: 1, 
        text: "Would you rather live in a friendly village or a secret cave in the forest?",
        options: ["House in a village", "Cave in a forest"]
    },
    { 
        id: 2, 
        text: "Would you rather wear fancy clothes or simple everyday clothes?",
        options: ["Fancy clothes", "Simple clothes"]
    },
    { 
        id: 3, 
        text: "How would you like to defeat bad guys?",
        options: ["My cool magic", "My super strength"]
    },
    {
        id: 4, 
        text: "Would you rather support your friends or lead the way?",
        options: ["Support", "Lead"]
    },
    {
        id: 5, 
        text: "Would you rather be known for your bravery and honor or your cleverness and knowledge?",
        options: ["Bravery and honor", "Cleverness and knowledge"]
    },
    {
        id: 6, 
        text: "Do you want to work as a lone wolf or as part of a team?",
        options: ["Lone wolf", "Part of a team"]
    }
]

function createQuery(answerlist){
    console.log("abbb")
    console.log(answerlist)
    var output = ""
    for(const key in answerlist){
        const index = key -1
        console.log(questions[index])
        const new_string = "Question: " + questions[index].text + " Ans: " + answerlist[key] + "\n"
        output = output.concat(new_string)
    }
    var prompt = "Based on the given questions and answers, choose from the following list of RPG classes, races, and backgrounds: Classes: (Warrior, Rogue, Wizard, Bard), Races: (Human, Elf, Dragonborn, Orc), Backgrounds: (Hero, Royal, Shady, Scholar)."
    output.concat(prompt)
    console.log(output)
}


function Questionnaire() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
  
    
  
    const handleOptionChange = (questionId, option) => {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [questionId]: option
      }));
    };
  
    const navigateQuestions = (direction) => {
      setCurrentQuestionIndex(prevIndex => prevIndex + direction);
    };
  
    const handleSubmit = () => {
      createQuery(answers)
      console.log('Submitted Answers:', answers);
      // Here you might also post this data to a server or transition to a results page
    };
  
    const handleNext = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      };
    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
    return (
      <div>
        <h1>Questionnaire</h1>
        <p>{currentQuestion.text}</p>
        {currentQuestion.options.map(option => (
          <div key={option}>
            <input
              type="radio"
              id={option}
              name={currentQuestion.id}
              value={option}
              checked={answers[currentQuestion.id] === option}
              onChange={() => handleOptionChange(currentQuestion.id, option)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
        <button 
          disabled={currentQuestionIndex === 0}
          onClick={() => navigateQuestions(-1)}
        >
          Previous
        </button>

        {isLastQuestion ? (
            <button type="submit" onClick={handleSubmit}>Submit</button>
        ) : (
            <button type="button" onClick={handleNext}>
            Next
            </button>
        )}
      </div>
    );
  }
  
function Questionnaire2() {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);



  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setAnswers({
      ...answers,
      [id]: value
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

    createQuery(answers)
    console.log('Submitted Answers:', answers);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>{questions[currentQuestionIndex].text}</label>
        {question.options.map(option => (
        <div key={option}>
          <input
            type="radio"
            id={option}
            name={question.id}
            value={option}
            checked={answers[question.id] === option}
            onChange={() => handleOptionChange(question.id, option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
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
