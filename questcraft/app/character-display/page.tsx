'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from '../styles/CharacterDisplay.module.css';

const CharacterDisplay: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const searchParams = useSearchParams();
  const imageUrl = searchParams?.get('imageUrl');
  const characterName = searchParams?.get('characterName');
  const characterInfoString = searchParams?.get('characterInfo');
  const characterInfo = characterInfoString ? JSON.parse(decodeURIComponent(characterInfoString)) : null;

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.container}>

    <header>
        <link href='https://fonts.googleapis.com/css?family=Londrina Solid' rel='stylesheet'/>
    </header>
      <h1 style={{color:'black'}}>Your Generated Character</h1>
      <div
        className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
        onClick={handleCardClick}
      >
        <div className={styles.glow}></div>
      <div className={`${styles.front}`}>
      </div>
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
              </div>
              <div className={styles.characterOverlay}>
                  <p className={styles.characterName}>{characterName}</p>
                  <p className={styles.characterInfo}>
                    {characterInfo.race} {characterInfo.class}
                  </p>
                  <p className={styles.characterLevel}>Level {characterInfo.level}</p>
                </div>
              <div className={styles.statsGrid}>
                <div className={styles.strength}>
                    <p className={styles.statLabel}>Strength</p>
                    <p className={styles.statValue}>+{characterInfo.strength}</p>
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
                <div className={styles.charisma}>
                  <p className={styles.statLabel}>Charisma</p>
                  <p className={`${styles.statValue} `}>
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