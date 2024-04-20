'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from '../styles/CharacterDisplay.module.css';

const CharacterDisplay: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [characterInfo, setCharacterInfo] = useState<{
    name: string;
    height: string;
    skills: string;
    race: string;
    backgroundImage: string;
  } | null>(null);
  const searchParams = useSearchParams();
  const imageUrl = searchParams?.get('imageUrl');
  const characterDescription = searchParams?.get('characterDescription');

  useEffect(() => {
    const fetchCharacterInfo = async () => {
      if (characterDescription) {
        const response = await fetch('/api/generate-character-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ characterDescription }),
        });

        if (response.ok) {
          const data = await response.json();
          setCharacterInfo(data);
          console.log(characterInfo);
        } else {
          console.error('Error generating character info:', response.statusText);
        }
      }
    };

    fetchCharacterInfo();
  }, [characterDescription]);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.container}>
      <h1>Your Generated Character</h1>
      <div
        className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
        onClick={handleCardClick}
      >
        <div
          className={styles.front}
          style={{
            backgroundImage: `url(${characterInfo?.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {characterInfo ? (
            <div className={styles.characterInfo}>
              <h2 className={styles.name}>{characterInfo.name}</h2>
              <div className={styles.info}>
                <p><strong>Height:</strong> {characterInfo.height}</p>
                <p><strong>Skills:</strong> {characterInfo.skills}</p>
                <p><strong>Race:</strong> {characterInfo.race}</p>
              </div>
            </div>
          ) : (
            <p>Loading character info...</p>
          )}
        </div>
        <div className={styles.back}>
          {imageUrl && (
            <div className={styles.imageContainer}>
              <Image
                src={imageUrl}
                alt="Generated Character"
                width={256}
                height={500}
                className={styles.image}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CharacterDisplay), {
  ssr: false,
});