// components/BookForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './BookForm.module.css'; // Import the module CSS file

interface FormData {
  RNR_no_tik_pay: number;
  userID: string;
  train_no: number;
  passenger_name: string;
  source: string;
  distination: string;
  seat_no: number;
  transaction_id: number;
  Amount: number;
  bank: string;
  card_no: string;
}

const BookForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    RNR_no_tik_pay: 0,
    userID: '',
    train_no: 0,
    passenger_name: '',
    source: '',
    distination: '',
    seat_no: 0,
    transaction_id: 0,
    Amount: 0,
    bank: '',
    card_no: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message); // Display server response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className={styles['book-form']} onSubmit={handleSubmit}>
      <div className={styles['input-container']}>
        <input
          type="number"
          name="RNR_no_tik_pay"
          value={formData.RNR_no_tik_pay}
          onChange={handleChange}
          placeholder="RNR_no_tik_pay"
        />
        <input
          type="text"
          name="userID"
          value={formData.userID}
          onChange={handleChange}
          placeholder="userID"
        />
        <input
          type="number"
          name="train_no"
          value={formData.train_no}
          onChange={handleChange}
          placeholder="train_no"
        />
      </div>
      <div className={styles['input-container']}>
        <input
          type="text"
          name="passenger_name"
          value={formData.passenger_name}
          onChange={handleChange}
          placeholder="passenger_name"
        />
        <input
          type="text"
          name="source"
          value={formData.source}
          onChange={handleChange}
          placeholder="source"
        />
        <input
          type="text"
          name="distination"
          value={formData.distination}
          onChange={handleChange}
          placeholder="distination"
        />
      </div>
      <div className={styles['input-container']}>
        <input
          type="number"
          name="seat_no"
          value={formData.seat_no}
          onChange={handleChange}
          placeholder="seat_no"
        />
        <input
          type="number"
          name="transaction_id"
          value={formData.transaction_id}
          onChange={handleChange}
          placeholder="transaction_id"
        />
        <input
          type="number"
          name="Amount"
          value={formData.Amount}
          onChange={handleChange}
          placeholder="Amount"
        />
      </div>
      <div className={styles['input-container']}>
        <input
          type="text"
          name="bank"
          value={formData.bank}
          onChange={handleChange}
          placeholder="bank"
        />
        <input
          type="text"
          name="card_no"
          value={formData.card_no}
          onChange={handleChange}
          placeholder="card_no"
        />
      </div>
      <button className={styles['submit-button']} type="submit">Book</button>
    </form>
  );
};

export default BookForm;
