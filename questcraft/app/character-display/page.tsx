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
    race: string;
    class: string;
    armorClass: number;
    hitPoints: number;
    speed: number;
    strength: number;
    dexterity: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    constitution: number;
    level: number;
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
        ></div>
        <div className={styles.back}>
          {characterInfo && (
            <div className={styles.characterInfo}>
              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <p className={styles.statLabel}>Armor Class</p>
                  <p className={styles.statValue}>{characterInfo.armorClass}</p>
                </div>
                <div className={styles.statItem}>
                  <p className={styles.statLabel}>Hit Points</p>
                  <p className={styles.statValue}>{characterInfo.hitPoints}</p>
                </div>
                <div className={styles.statItem}>
                  <p className={styles.statLabel}>Speed</p>
                  <p className={styles.statValue}>{characterInfo.speed}ft</p>
                </div>
              </div>
              <div className={styles.imageContainer}>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt="Generated Character"
                    layout="fill"
                    objectFit="contain"
                    className={styles.image}
                  />
                )}
                <div className={styles.characterOverlay}>
                  <p className={styles.characterName}>{characterInfo.name}</p>
                  <p className={styles.characterInfo}>
                    {characterInfo.race} {characterInfo.class}
                  </p>
                  <p className={styles.characterLevel}>Level {characterInfo.level}</p>
                </div>
              </div>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <p className={styles.statLabel}>Strength</p>
                  <p className={`${styles.statValue} ${styles.strength}`}>
                    +{characterInfo.strength}
                  </p>
                </div>
                <div className={styles.statItem}>
                  <p className={styles.statLabel}>Dexterity</p>
                  <p className={`${styles.statValue} ${styles.dexterity}`}>
                    +{characterInfo.dexterity}
                  </p>
                </div>
                <div className={styles.statItem}>
                  <p className={styles.statLabel}>Constitution</p>
                  <p className={`${styles.statValue} ${styles.constitution}`}>
                    +{characterInfo.constitution}
                  </p>
                </div>
                <div className={styles.statItem}>
                  <p className={styles.statLabel}>Intelligence</p>
                  <p className={`${styles.statValue} ${styles.intelligence}`}>
                    +{characterInfo.intelligence}
                  </p>
                </div>
                <div className={styles.statItem}>
                  <p className={styles.statLabel}>Wisdom</p>
                  <p className={`${styles.statValue} ${styles.wisdom}`}>
                    +{characterInfo.wisdom}
                  </p>
                </div>
                <div className={styles.statItem}>
                  <p className={styles.statLabel}>Charisma</p>
                  <p className={`${styles.statValue} ${styles.charisma}`}>
                    +{characterInfo.charisma}
                  </p>
                </div>
              </div>
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