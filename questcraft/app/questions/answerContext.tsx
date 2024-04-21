import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface AnswerContextType {
  answers: { [key: string]: string };
  setAnswers: (answers: { [key: string]: string }) => void;
}

// Initialize the context with undefined!
const AnswerContext = createContext<AnswerContextType | undefined>(undefined);

export const useAnswer = () => {
  const context = useContext(AnswerContext);
  if (!context) {
    throw new Error('useAnswer must be used within an AnswerProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const AnswerProvider: React.FC<Props> = ({ children }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  // Function to update the answers
  const handleSetAnswers = (newAnswers: { [key: string]: string }) => {
    setAnswers(newAnswers);
  };

  return (
    <AnswerContext.Provider value={{ answers, setAnswers: handleSetAnswers }}>
      {children}
    </AnswerContext.Provider>
  );
};
