'user client';
import React from 'react';
import './App.css';
import Questionnaire from './question_one';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Questionnaire</h1>
        <Questionnaire />
      </header>
    </div>
  );
}

export default App;
