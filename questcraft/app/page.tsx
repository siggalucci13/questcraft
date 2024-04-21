// pages/page.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../app/styles/Page.module.css';

const Page: React.FC = () => {
  return (
    <div className={styles.container}
    style={
      {
        backgroundImage: 'url("/images/questcraft.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
        
      }
    }>
      <Head>

      
        <title>QuestCraft</title>
        <meta name="description" content="Embark on an exciting adventure game!" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>



      <main className={styles.main}>
        {/* <h1 className={styles.title}>Welcome to QuestCraft!</h1>
        <p className={styles.description}>
          Get ready to embark on an exciting journey filled with adventure and imagination!
        </p> */}
        <header>
        <link href='https://fonts.googleapis.com/css?family=Londrina Solid' rel='stylesheet'/>

        </header>
        <div className={styles.button}>
          <Link href="/questions">
            <button className={styles.next_button}>Start Character Creation</button>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Adventure Game. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;