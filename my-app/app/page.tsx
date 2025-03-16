// app/page.tsx
"use client";
import React from 'react';
import BookForm from '../components/BookForm';
import CancelForm from '../components/CancelForm';
import SearchForm from '../components/SearchForm';
import styles from './page.module.css';
function Home() {
  return (
    <main className={styles.container}>

      <div className={styles.header}>
        <h1>RAILWAY TRAIN APPLICATION</h1>
      </div>

      <div className={styles['part-container']}>
        <h1>Book Ticket</h1>
        <BookForm />
      </div>

      <div className={styles['part-container']}>
        <h1>Cancel Ticket</h1>
        <CancelForm />
      </div>

      <div className={styles['part-container']}>
        <h1>Search Ticket</h1>
        <SearchForm />
      </div>
    </main>
  );
}

export default Home;