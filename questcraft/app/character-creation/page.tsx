'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from '../styles/CharacterCreation.module.css';

const CharacterCreation: React.FC = () => {
  var [characterDescription, setCharacterDescription] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [characterInfo, setCharacterInfo] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const questions = searchParams!.get('questions');

  useEffect(() => {
    // State initialization logic goes here
  }, []);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const includeInprompt = 'Generate an adorable animated character profile picture suitable for a kids and teens dungeon and dragon type game. The character should be whimsical, vibrant, and evoke a playful and friendly personality. Avoid using any text or words in the image. Focus on creating a charming character design reminiscent of Pixar animations. Here is a description: ';
    characterDescription = includeInprompt + characterDescription;

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ characterDescription }),
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.imageUrl);
        generateCharacterInfo(characterDescription, questions);
      } else {
        console.error('Error generating image:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }

    setIsLoading(false);
  };

  const generateCharacterInfo = async (description: string, questions: string | null) => {
    try {
      const response = await fetch('/api/generate-character-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        const data = await response.json();
        setCharacterInfo(data);
      } else {
        console.error('Error generating character info:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating character info:', error);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/character-display?imageUrl=${encodeURIComponent(imageUrl)}&characterInfo=${encodeURIComponent(JSON.stringify(characterInfo))}&characterName=${encodeURIComponent(characterName)}`);
  };

  return (
    <body className={styles.body}>

    <header>
        <link href='https://fonts.googleapis.com/css?family=Londrina Solid' rel='stylesheet'/>
    </header>
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>Let's Create Your Character!</h1>
        {!imageUrl ? (
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
        ) : (
          <div className={styles.characterNameForm}>
          <img src={imageUrl} alt="Generated Character" className={styles.characterImage} />
          <form onSubmit={handleNameSubmit} className={styles.form}>
            <label htmlFor="characterName" className={styles.label}>
              Give your character a name:
            </label>
            <input
              id="characterName"
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              required
              className={styles.input}
              placeholder="Enter your character's name"
            />
            <button type="submit" className={styles.button}>
              Submit
            </button>
            </form>
          </div>
        )}
      </div>
    </div>
    </body>
  );
};

export default dynamic(() => Promise.resolve(CharacterCreation), { ssr: false });