// components/CancelForm.tsx
import React, { useState } from 'react';
import styles from './CancelForm.module.css'; // Import the module CSS file

const CancelForm: React.FC = () => {
  const [RNR_no, setRNR_no] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ RNR_no }),
      });
      const data = await response.json();
      alert(data.message); // Display server response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className={styles['cancel-form']} onSubmit={handleSubmit}>
      <div className={styles['form-group']}>
        <input
          type="number"
          value={RNR_no}
          onChange={(e) => setRNR_no(Number(e.target.value))}
          placeholder="RNR_no"
          required
        />
      </div>
      <div className={styles['form-group']}>
        <button className={styles['submit-button']} type="submit">Cancel Ticket</button>
      </div>
    </form>
  );
};

export default CancelForm;
