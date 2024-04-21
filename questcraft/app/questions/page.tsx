'user client';
import React from 'react';
import './App.css';
import Questionnaire from './question_one';
import styles from '../styles/question.module.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <link href='https://fonts.googleapis.com/css?family=Londrina Solid' rel='stylesheet'/>
        <div className={styles.question_card}
        style={{
            backgroundImage: 'url("/images/border_question.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
        >
        <Questionnaire />
        </div>
      </header>
    </div>
  );
}

export default App;
