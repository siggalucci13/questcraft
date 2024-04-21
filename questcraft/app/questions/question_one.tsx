'use client';
import React, { useState } from 'react';
import styles from './question.css';
import { useRouter } from 'next/navigation';



const questions = [
    { 
        id: 1, 
        text: "Would you rather live in a friendly village or a secret cave in the forest?",
        options: ["House in a village", "Cave in a forest"]
    }
]
//     { 
//         id: 2, 
//         text: "Would you rather wear fancy clothes or simple everyday clothes?",
//         options: ["Fancy clothes", "Simple clothes"]
//     },
//     { 
//         id: 3, 
//         text: "How would you like to defeat bad guys?",
//         options: ["My cool magic", "My super strength"]
//     },
//     {
//         id: 4, 
//         text: "Would you rather support your friends or lead the way?",
//         options: ["Support", "Lead"]
//     },
//     {
//         id: 5, 
//         text: "Would you rather be known for your bravery and honor or your cleverness and knowledge?",
//         options: ["Bravery and honor", "Cleverness and knowledge"]
//     },
//     {
//         id: 6, 
//         text: "Do you want to work as a lone wolf or as part of a team?",
//         options: ["Lone wolf", "Part of a team"]
//     }
// ]

function createQuery(answerlist: { [x: string]: string; }){
    console.log("abbb")
    console.log(answerlist)
    var output = ""
    for(const key in answerlist){
        const index = key -1
        console.log(questions[index])
        const new_string = "Question: " + questions[index].text + " Ans: " + answerlist[key] + "\n"
        output = output.concat(new_string)
    }
    var prompt = "Based on the given questions and answers, choose from the following list of RPG classes, races, and backgrounds. " +
            "Classes: (Warrior, Rogue, Wizard, Bard), Races: (Human, Elf, Dragonborn, Orc), Backgrounds: (Hero, Royal, Shady, Scholar)." +
            " Respond in the following JSON format: " + "{ 'class': '' 'race': '' 'background': '' }"
    output.concat(prompt)
    
    return output;
}


function Questionnaire() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const router = useRouter();
    
  
    const handleOptionChange = (questionId: number, option: string) => {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [questionId]: option
      }));
    };
  
    const navigateQuestions = (direction: number) => {
      setCurrentQuestionIndex(prevIndex => prevIndex + direction);
    };
  
    const handleSubmit = () => {
      const combine_prompt = createQuery(answers)
      console.log('Submitted Answers:', combine_prompt);
      router.push(`/character-creation?questions=${encodeURIComponent(combine_prompt)}`)
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

export default Questionnaire;
