'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from '../styles/CharacterCreation.module.css';

const CharacterCreation: React.FC = () => {
  const [characterDescription, setCharacterDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // State initialization logic goes here
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-character', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ characterDescription }),
      });

      if (response.ok) {
        router.push('/character-display');
      } else {
        console.error('Error generating character:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating character:', error);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let's Create Your Character!</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="characterDescription" className={styles.label}>
          Describe your character:
        </label>
        <textarea
          id="characterDescription"
          value={characterDescription}
          onChange={(e) => setCharacterDescription(e.target.value)}
          required
          className={styles.textarea}
          placeholder="Enter a description of your character"
        ></textarea>
        <button type="submit" disabled={isLoading} className={styles.button}>
          {isLoading ? 'Generating...' : 'Create Character'}
        </button>
      </form>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CharacterCreation), { ssr: false });