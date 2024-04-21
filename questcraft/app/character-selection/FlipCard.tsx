// components/FlipCard.js
import React, { useState } from 'react';
import styles from '../styles/FlipCard.module.css';
import { Container } from 'postcss';
import Popup from './Modal'; // Import the Popup component
import Modal from './Modal';

const FlipCard = (data: {
  data: {
    id: ReactNode;
    image: string; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; class: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; 
};
  image: string; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; class: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; 
}) => {
  // in character name
  const [isFlipped, setIsFlipped] = useState(false);
  
  const data_core = data.data
 

  // get character name

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  return (
    <div className={styles.flipCard} onClick={toggleFlip}>
      <div className={`${styles.flipCardInner} ${isFlipped ? styles.isFlipped : ''}`}>

        <div className={styles.flipCardFront}>
          <div className={styles.column}>
            <div className={styles.row }>
              <div className={styles.image_container}>
                <img src={"http://localhost:5000/char_img/"+ data_core.image} alt="char" />
              </div>
            </div>
            <div className={styles.row}>{data_core.name}</div>
            
          </div>
        </div>


        <div className={styles.flipCardBack}>
          <div className={styles.column}>
            <div className={styles.row}><h2>{data_core.name}</h2></div>
            <div className={styles.row}><p>{data_core.class}</p></div>
            <div className={styles.row}><p>{data_core.id}</p></div>
          </div>
        </div>


        
      </div>
    </div>
  );
};

export default FlipCard;
