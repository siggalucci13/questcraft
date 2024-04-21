// pages/page.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../app/styles/Page.module.css';

const Page: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>QuestCraft</title>
        <meta name="description" content="Embark on an exciting adventure game!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to QuestCraft!</h1>
        <p className={styles.description}>
          Get ready to embark on an exciting journey filled with adventure and imagination!
        </p>
        <div className={styles.button}>
          <Link href="/questions">
            <button>Start Character Creation</button>
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