import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
const navigateTo = useNavigate();
navigateTo('/your-page')

function FormPage() {
    const [input, setInput] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigateTo('/answer', { answer: input }); // Pass data via state
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your answer:
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FormPage;
