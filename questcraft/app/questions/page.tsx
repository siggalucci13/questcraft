import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormPage from './FormPage';
import AnswerPage from './AnswerPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/answer" component={AnswerPage} />
        <Route path="/" component={FormPage} />
      </Switch>
    </Router>
  );
}

export default App;
