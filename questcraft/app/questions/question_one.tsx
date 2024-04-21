'use client';
import React, { useState } from 'react';
import styles from '../styles/question.module.css';
import { useRouter } from 'next/navigation';



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
        options: ["Bravery and honor", "Cleverness"]
    },
    {
        id: 6, 
        text: "Do you want to work as a lone wolf or as part of a team?",
        options: ["Lone wolf", "Part of a team"]
    }
]

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
    const [selected, setSelected] = useState("");
    const router = useRouter();
    
  
    const handleOptionChange = (questionId: number, option: string) => {
      setSelected(option);
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
      <div className={styles.card_container}>
        <h1 className={styles.q_title}>Character Builder</h1>
        <p className={styles.q_question}>{currentQuestion.text}</p>
        
        <div className={styles.q_option_left}>
        <label key={currentQuestion.options[0]} className={selected === currentQuestion.options[0] ? styles.card_selected: styles.card}>
                <input
                  type="radio"
                  id={currentQuestion.options[0]}
                  name={currentQuestion.text}
                  value={currentQuestion.options[0]}
                  checked={selected === currentQuestion.options[0]}
                  onChange={() => handleOptionChange(currentQuestion.id, currentQuestion.options[0])}
                  className={styles.card_input_element}
                />
                <div className={styles.card_content}>
                  <h4>{currentQuestion.options[0]}</h4>
                </div>
            </label>
            </div>


        <div className={styles.q_option_right}>
            <label key={currentQuestion.options[1]} className={selected === currentQuestion.options[1] ? styles.card_selected: styles.card}>
              <input
                type="radio"
                id={currentQuestion.options[1]}
                name={currentQuestion.text}
                value={currentQuestion.options[1]}
                checked={selected === currentQuestion.options[1]}
                onChange={() => handleOptionChange(currentQuestion.id, currentQuestion.options[1])}
                className={styles.card_input_element}
              />
              <div className={styles.card_content}>
                <h4>{currentQuestion.options[1]}</h4>
              </div>
            </label>
            </div>

        {/* {currentQuestion.options.map(option => (
            <label key={option} className={selected === option ? styles.card_selected: styles.card}>

                <input
                  type="radio"
                  id={option}
                  name={currentQuestion.text}
                  value={option}
                  checked={selected === option}
                  onChange={() => handleOptionChange(currentQuestion.id, option)}
                  className={styles.card_input_element}
                />
                <div className={styles.card_content}>
                  <h4>{option}</h4>
                </div>
            </label>
        ))} */}

        <button 
          disabled={currentQuestionIndex === 0}
          onClick={() => navigateQuestions(-1)}
          className={styles.q_nav_pre}
        >
          &laquo; Previous
        </button>

        {isLastQuestion ? (
            <button className={styles.q_nav_next} type="submit" onClick={handleSubmit}>Submit</button>
        ) : (
            <button className={styles.q_nav_next} type="button" onClick={handleNext}>
            Next &raquo;
            </button>
        )}
      </div>
    );
  }

export default Questionnaire;
