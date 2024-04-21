import React from 'react';
import { useLocation } from 'react-router-dom';

function AnswerPage() {
    const location = useLocation();
    const { answer } = location.state || {}; // Retrieve state

    return (
        <div>
            <h1>Submitted Answer</h1>
            <p>{answer || "No answer submitted!"}</p>
        </div>
    );
}

export default AnswerPage;
