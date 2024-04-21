// pages/index.js
'use client';
import Head from 'next/head';
import FlipCard from './FlipCard';
import { useState, useEffect } from 'react';
import styles from '../styles/FlipCard.module.css';

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}



export default function Home() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // State to track loading status

    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/characters');
            const jsonData = await response.json();

            // build the 
            
            setData(jsonData);  // This will trigger a rerender
            setIsLoading(false);
        }
        fetchData();
    }, []);


    if (isLoading) return <div>Loading...</div>; // Render loading state
    //if (error) return <div>Error: {error}</div>; // Render error state
    console.log(data[0])
    return (
        <div>
        <Head>
            <title>char_detail</title>
        </Head>
        <main>
            <h1>Welcome to Flip Card Example</h1>
            <div>
            <div className={styles.grid_container}>
                {data.map((item , index)=> (
                    <div key={makeid(20)} >
                        <FlipCard key={item.id + makeid(20)} data={item}/>
                    </div>
                ))}
                </div>
            </div>
        </main>
        </div>
    );

}
