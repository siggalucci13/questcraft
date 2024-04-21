'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from '../styles/CharacterCreation.module.css';

const CharacterCreation: React.FC = () => {
  var [characterDescription, setCharacterDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // State initialization logic goes here
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const includeInprompt = 'Create a new animated character headshot that is used for a dungeon and dragon type game that is geared toward kids and teens. Here is the description of the character: ';
     characterDescription = includeInprompt + characterDescription;
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ characterDescription}),
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.imageUrl;
        router.push(`/character-display?imageUrl=${encodeURIComponent(imageUrl)}&characterDescription=${characterDescription}`);
      } else {
        console.error('Error generating image:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating image:', error);
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