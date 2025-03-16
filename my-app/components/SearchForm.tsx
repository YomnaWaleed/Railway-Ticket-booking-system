// components/SearchForm.tsx
import React, { useState } from 'react';
import styles from './SearchForm.module.css'; // Import the module CSS file

const SearchForm: React.FC = () => {
  const [RNR_no, setRNR_no] = useState<number>(0);
  const [ticketDetails, setTicketDetails] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/search?RNR_no=${RNR_no}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTicketDetails(data);
        setErrorMessage('');
      } else {
        setTicketDetails(null);
        setErrorMessage(data.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles['search-form']}>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={RNR_no}
          onChange={(e) => setRNR_no(Number(e.target.value))}
          placeholder="Enter RNR_no"
        />
      </form>
      <button type="submit" onClick={handleSubmit}>Search</button>
      {ticketDetails && (
        <div className={styles['result-container']}>
          <h2>Ticket Details:</h2>
          <pre>{JSON.stringify(ticketDetails, null, 2)}</pre>
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default SearchForm;
