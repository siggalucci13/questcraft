// components/FlipCard.js
import React, { useState } from 'react';
import styles from '../styles/FlipCard.module.css';

const FlipCard = () => {
  // in character name
  const [isFlipped, setIsFlipped] = useState(false);

  // get character name

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.flipCard} onClick={toggleFlip}>
      <div className={`${styles.flipCardInner} ${isFlipped ? styles.isFlipped : ''}`}>
        <div className={styles.flipCardFront}>
          Front of the card
        </div>
        <div className={styles.flipCardBack}>
          Back of the card
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
