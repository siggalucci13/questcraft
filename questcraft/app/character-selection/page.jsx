// pages/index.js
'use client';
import Head from 'next/head';
import FlipCard from './FlipCard';

export default function Home() {

    // get list of character

    

  return (
    <div>
      <Head>
        <title>Next.js Flip Card Example</title>
      </Head>
      <main>
        <h1>Welcome to Flip Card Example</h1>
        <FlipCard />
      </main>
    </div>
  );
}
